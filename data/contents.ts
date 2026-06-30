import { netflixContents } from "./contents/netflix";

export type ContentGenre =
  | "액션"
  | "어드벤처"
  | "로맨스"
  | "코미디"
  | "공포"
  | "스릴러"
  | "SF"
  | "판타지"
  | "드라마"
  | "애니메이션"
  | "범죄"
  | "미스터리"
  | "역사"
  | "전쟁"
  | "무협"
  | "스포츠"
  | "음악"
  | "가족"
  | "재난"
  | "심리"
  | "법정"
  | "의학"
  | "좀비"
  | "첩보"
  | "성장"
  | "힐링"
  | "시대극";

export type OTT = "넷플릭스";

export type ContentType = "영화" | "드라마";

export type Content = {
  id: number;
  title: string;
  year: number;
  type: ContentType;
  genres: ContentGenre[];
  ott: OTT[];
  url?: string;
};

export const ALL_GENRES: ContentGenre[] = [
  "액션", "로맨스", "코미디", "공포", "스릴러", "SF", "판타지",
  "드라마", "애니메이션", "범죄", "역사", "전쟁", "스포츠", "음악", "가족",
];

export const ALL_OTTS: OTT[] = ["넷플릭스"];

export const OTT_SEARCH_URL: Record<OTT, (title: string) => string> = {
  넷플릭스: (t) => `https://www.netflix.com/search?q=${encodeURIComponent(t)}`,
};

export const OTT_COLOR: Record<OTT, string> = {
  넷플릭스: "bg-red-600 text-white",
};

export const contents: Content[] = netflixContents.filter((c) => c.year >= 2000);
