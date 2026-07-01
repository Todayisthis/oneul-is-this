#!/usr/bin/env python3
"""
JustWatch에서 넷플릭스 한국 콘텐츠 (IMDB 7+) 수집 스크립트
프로젝트 루트에서 실행: python scripts/fetch_netflix.py
"""

import requests
import json
import time
import os

API_URL = "https://apis.justwatch.com/graphql"

GENRE_MAP = {
    "act": "액션",
    "adv": "어드벤처",
    "rom": "로맨스",
    "com": "코미디",
    "hor": "공포",
    "thr": "스릴러",
    "scf": "SF",
    "fan": "판타지",
    "drm": "드라마",
    "ani": "애니메이션",
    "crm": "범죄",
    "mys": "미스터리",
    "his": "역사",
    "war": "전쟁",
    "spo": "스포츠",
    "mus": "음악",
    "fam": "가족",
    "bio": "역사",
    "doc": None,
    "eur": None,
    "rly": None,
    "sho": None,
}

QUERY = """
query PopularTitles(
  $country: Country!
  $language: Language!
  $first: Int!
  $after: String
  $filter: TitleFilter
) {
  popularTitles(
    country: $country
    first: $first
    after: $after
    filter: $filter
    sortBy: POPULAR
    sortRandomSeed: 0
  ) {
    edges {
      node {
        __typename
        ... on Movie {
          objectId
          content(country: $country, language: $language) {
            title
            originalReleaseYear
            scoring { imdbScore }
            genres { shortName }
            productionCountries
          }
          offers(country: $country, platform: WEB) {
            standardWebURL
            package { packageId clearName }
          }
        }
        ... on Show {
          objectId
          content(country: $country, language: $language) {
            title
            originalReleaseYear
            scoring { imdbScore }
            genres { shortName }
            productionCountries
          }
          offers(country: $country, platform: WEB) {
            standardWebURL
            package { packageId clearName }
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    totalCount
  }
}
"""

def fetch_page(after=None):
    variables = {
        "country": "KR",
        "language": "ko",
        "first": 100,
        "filter": { "packages": ["nfx"] }
    }
    if after:
        variables["after"] = after

    resp = requests.post(
        API_URL,
        json={"query": QUERY, "variables": variables},
        headers={"Content-Type": "application/json", "User-Agent": "Mozilla/5.0"},
        timeout=30
    )
    resp.raise_for_status()
    return resp.json()

def debug_first_item(data):
    """첫 번째 아이템 구조 출력"""
    edges = data.get("data", {}).get("popularTitles", {}).get("edges", [])
    if not edges:
        print("  [디버그] edges 없음!")
        return
    node = edges[0].get("node", {})
    print(f"\n[디버그] 첫 번째 아이템:")
    print(f"  typename: {node.get('__typename')}")
    content = node.get("content", {})
    print(f"  title: {content.get('title')}")
    print(f"  scoring: {content.get('scoring')}")
    offers = node.get("offers", [])
    print(f"  offers 수: {len(offers)}")
    if offers:
        print(f"  첫 offer: {offers[0]}")
    print()

def map_genres(short_names):
    result = []
    for g in short_names:
        mapped = GENRE_MAP.get(g)
        if mapped and mapped not in result:
            result.append(mapped)
    return result if result else ["드라마"]

def get_netflix_url(offers):
    for offer in offers:
        pkg_id = offer.get("package", {}).get("packageId", "")
        url = offer.get("standardWebURL", "")
        if "netflix.com" in url or pkg_id in ("nfx", "8"):
            if url:
                return url
    return None

def main():
    all_contents = []
    after = None
    page = 1

    print("JustWatch에서 넷플릭스 한국 콘텐츠 수집 중...\n")

    while True:
        print(f"  페이지 {page} 로딩...", end=" ", flush=True)

        try:
            data = fetch_page(after)
        except Exception as e:
            print(f"오류: {e}")
            break

        if "errors" in data:
            print(f"API 오류: {data['errors']}")
            break

        # 첫 페이지에서 디버그 정보 출력
        if page == 1:
            debug_first_item(data)

        titles_data = data.get("data", {}).get("popularTitles", {})
        edges = titles_data.get("edges", [])
        page_info = titles_data.get("pageInfo", {})

        if page == 1:
            total = titles_data.get("totalCount", "?")
            print(f"전체 {total}개")

        collected_this_page = 0
        for edge in edges:
            node = edge.get("node", {})
            typename = node.get("__typename")
            if typename not in ("Movie", "Show"):
                continue

            content = node.get("content", {})
            if not content:
                continue

            imdb = content.get("scoring", {}).get("imdbScore")
            if not imdb or imdb < 7.0:
                continue

            netflix_url = get_netflix_url(node.get("offers", []))
            if not netflix_url:
                continue

            title = content.get("title", "").replace('"', '\\"')
            if not title:
                continue

            year = content.get("originalReleaseYear") or 2024
            genres = map_genres([g.get("shortName", "") for g in content.get("genres", [])])
            countries = content.get("productionCountries", [])
            country = countries[0] if countries else "US"
            content_type = "영화" if typename == "Movie" else "드라마"

            all_contents.append({
                "title": title,
                "year": year,
                "type": content_type,
                "genres": genres,
                "url": netflix_url,
                "imdbScore": round(imdb, 1),
                "country": country,
            })
            collected_this_page += 1

        print(f"{len(edges)}개 중 {collected_this_page}개 수집")

        if not page_info.get("hasNextPage"):
            break

        after = page_info.get("endCursor")
        page += 1
        time.sleep(0.5)


    # URL 기준 중복 제거
    seen_urls = set()
    unique = []
    for c in all_contents:
        if c["url"] not in seen_urls:
            seen_urls.add(c["url"])
            unique.append(c)

    print(f"\n수집된 항목: {len(unique)}개")

    if len(unique) == 0:
        print("\n[디버그] 0개 수집됨 - 위의 디버그 출력을 확인해주세요")
        return

    # TypeScript 파일 생성
    lines = ['import type { Content } from "../contents";\n\n']
    lines.append('export const netflixContents: Content[] = [\n')

    for i, c in enumerate(unique):
        id_num = 9001 + i
        genres_str = ", ".join(f'"{g}"' for g in c["genres"])
        line = (
            f'  {{ id: {id_num}, title: "{c["title"]}", year: {c["year"]}, '
            f'type: "{c["type"]}", genres: [{genres_str}], ott: ["넷플릭스"], '
            f'url: "{c["url"]}", imdbScore: {c["imdbScore"]}, country: "{c["country"]}" }},\n'
        )
        lines.append(line)

    lines.append('];\n')

    output_path = os.path.join("data", "contents", "netflix.ts")
    with open(output_path, "w", encoding="utf-8") as f:
        f.writelines(lines)

    print(f"✅ {output_path} 파일 저장 완료!")

if __name__ == "__main__":
    main()
