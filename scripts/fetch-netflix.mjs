import https from "https";
import fs from "fs";

const GENRE_MAP = {
  액션: "액션", 어드벤처: "어드벤처", 로맨스: "로맨스", 코미디: "코미디",
  공포: "공포", 스릴러: "스릴러", SF: "SF", "SF·판타지": "SF", 판타지: "판타지",
  드라마: "드라마", 애니메이션: "애니메이션", 범죄: "범죄", 미스터리: "미스터리",
  역사: "역사", 전쟁: "전쟁", 스포츠: "스포츠", 음악: "음악", 가족: "가족",
  재난: "재난", 심리: "심리", 법정: "법정", 의학: "의학", 좀비: "좀비",
  첩보: "첩보", 성장: "성장", 힐링: "힐링", 시대극: "시대극", 무협: "무협",
  서부: null, 다큐멘터리: null, 뉴스: null, 리얼리티: null, 토크: null,
  스탠드업: null, 스포츠이벤트: null,
};

function gql(query) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query });
    const options = {
      hostname: "apis.justwatch.com",
      path: "/graphql",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    };
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function fetchPage(contentType, after) {
  const afterStr = after ? `, after: "${after}"` : "";
  const typeFilter = contentType === "Movie" ? "MOVIE" : "SHOW";
  const query = `query {
    popularTitles(
      country: "KR"
      first: 100
      ${afterStr}
      filter: { objectTypes: [${typeFilter}] }
    ) {
      pageInfo { hasNextPage endCursor }
      edges {
        node {
          __typename
          content(country: "KR", language: "ko") {
            title
            originalReleaseYear
            genres { translation(language: "ko") }
          }
          offers(country: "KR", platform: WEB) {
            package { shortName }
            standardWebURL
          }
        }
      }
    }
  }`;
  const res = await gql(query);
  return res.data?.popularTitles;
}

async function fetchAll(contentType) {
  const results = [];
  let cursor = null;
  let page = 1;

  while (true) {
    process.stdout.write(`\r${contentType} 페이지 ${page} 수집중...`);
    const data = await fetchPage(contentType, cursor);
    if (!data) break;

    for (const edge of data.edges) {
      const node = edge.node;
      const netflixOffer = node.offers?.find((o) => o.package?.shortName === "nfx");
      if (!netflixOffer) continue;

      const rawGenres = node.content?.genres?.map((g) => g.translation) ?? [];
      const genres = rawGenres
        .map((g) => GENRE_MAP[g] ?? null)
        .filter((g) => g !== null);

      if (genres.length === 0) continue;

      results.push({
        title: node.content?.title,
        year: node.content?.originalReleaseYear,
        type: contentType === "Movie" ? "영화" : "드라마",
        genres,
        url: netflixOffer.standardWebURL,
      });
    }

    if (!data.pageInfo?.hasNextPage) break;
    cursor = data.pageInfo.endCursor;
    page++;
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`\n${contentType} 완료: ${results.length}개`);
  return results;
}

const movies = await fetchAll("Movie");
const shows = await fetchAll("Show");

const allContents = [...movies, ...shows];

let movieId = 9001;
let showId = 8001;

const lines = allContents.map((c) => {
  const id = c.type === "영화" ? movieId++ : showId++;
  const genresStr = c.genres.map((g) => `"${g}"`).join(", ");
  const urlStr = c.url ? `, url: "${c.url}"` : "";
  return `  { id: ${id}, title: "${c.title?.replace(/"/g, '\\"')}", year: ${c.year}, type: "${c.type}", genres: [${genresStr}], ott: ["넷플릭스"]${urlStr} },`;
});

const output = `import type { Content } from "../contents";

export const netflixContents: Content[] = [
${lines.join("\n")}
];
`;

fs.writeFileSync("data/contents/netflix.ts", output, "utf8");
console.log(`\n총 ${allContents.length}개 저장 완료 → data/contents/netflix.ts`);
