import { koreanDramas } from "./contents/korean-drama";
import { koreanMovies } from "./contents/korean-movie";
import { foreignDramas } from "./contents/foreign-drama";
import { foreignMovies } from "./contents/foreign-movie";

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

export type OTT = "넷플릭스" | "왓챠" | "티빙" | "웨이브" | "쿠팡플레이" | "디즈니+" | "애플TV";

export type ContentType = "영화" | "드라마";

export type Content = {
  id: number;
  title: string;
  year: number;
  type: ContentType;
  genres: ContentGenre[];
  ott: OTT[];
};

export const ALL_GENRES: ContentGenre[] = [
  "액션", "어드벤처", "로맨스", "코미디", "공포", "스릴러", "SF", "판타지",
  "드라마", "애니메이션", "범죄", "미스터리", "역사", "전쟁", "무협", "스포츠",
  "음악", "가족", "재난", "심리", "법정", "의학", "좀비", "첩보", "성장", "힐링", "시대극",
];

export const ALL_OTTS: OTT[] = ["넷플릭스", "왓챠", "티빙", "웨이브", "쿠팡플레이", "디즈니+", "애플TV"];

export const OTT_SEARCH_URL: Record<OTT, (title: string) => string> = {
  넷플릭스: (t) => `https://www.netflix.com/search?q=${encodeURIComponent(t)}`,
  왓챠: (t) => `https://watcha.com/search?query=${encodeURIComponent(t)}`,
  티빙: (t) => `https://www.tving.com/search?keyword=${encodeURIComponent(t)}`,
  웨이브: (t) => `https://www.wavve.com/search?keyword=${encodeURIComponent(t)}`,
  쿠팡플레이: (t) => `https://play.coupang.com/vp/search?searchKeyword=${encodeURIComponent(t)}`,
  "디즈니+": (t) => `https://www.disneyplus.com/ko-kr/search?q=${encodeURIComponent(t)}`,
  "애플TV": (t) => `https://tv.apple.com/search?term=${encodeURIComponent(t)}`,
};

export const OTT_COLOR: Record<OTT, string> = {
  넷플릭스: "bg-red-600 text-white",
  왓챠: "bg-red-400 text-white",
  티빙: "bg-red-500 text-white",
  웨이브: "bg-blue-600 text-white",
  쿠팡플레이: "bg-yellow-400 text-black",
  "디즈니+": "bg-blue-800 text-white",
  "애플TV": "bg-gray-900 text-white",
};

export const contents: Content[] = [
  ...koreanDramas,
  ...koreanMovies,
  ...foreignDramas,
  ...foreignMovies,
];
