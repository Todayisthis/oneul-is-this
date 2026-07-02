export type Lane = "탑" | "정글" | "미드" | "원딜" | "서폿";

export type Champion = {
  id: string;
  name: string;
  lanes: Lane[];
};

export const champions: Champion[] = [
  // 탑
  { id: "Darius", name: "다리우스", lanes: ["탑"] },
  { id: "Garen", name: "가렌", lanes: ["탑"] },
  { id: "Fiora", name: "피오라", lanes: ["탑"] },
  { id: "Camille", name: "카밀", lanes: ["탑"] },
  { id: "Gwen", name: "그웬", lanes: ["탑"] },
  { id: "Jax", name: "잭스", lanes: ["탑"] },
  { id: "Kennen", name: "케넨", lanes: ["탑"] },
  { id: "Malphite", name: "말파이트", lanes: ["탑"] },
  { id: "Mordekaiser", name: "모데카이저", lanes: ["탑"] },
  { id: "Nasus", name: "나서스", lanes: ["탑"] },
  { id: "Ornn", name: "오른", lanes: ["탑"] },
  { id: "Renekton", name: "레넥톤", lanes: ["탑"] },
  { id: "Sett", name: "세트", lanes: ["탑"] },
  { id: "Shen", name: "쉔", lanes: ["탑"] },
  { id: "Teemo", name: "티모", lanes: ["탑"] },
  { id: "Tryndamere", name: "트린다미어", lanes: ["탑"] },
  { id: "Urgot", name: "우르곳", lanes: ["탑"] },
  { id: "Yone", name: "요네", lanes: ["탑", "미드"] },
  { id: "Irelia", name: "이렐리아", lanes: ["탑", "미드"] },
  { id: "Cho'Gath", name: "초가스", lanes: ["탑"] },
  { id: "Vladimir", name: "블라디미르", lanes: ["탑", "미드"] },
  { id: "Singed", name: "신지드", lanes: ["탑"] },
  { id: "Illaoi", name: "일라오이", lanes: ["탑"] },
  { id: "Aatrox", name: "아트록스", lanes: ["탑"] },
  { id: "Volibear", name: "볼리베어", lanes: ["탑", "정글"] },

  // 정글
  { id: "LeeSin", name: "리신", lanes: ["정글"] },
  { id: "Vi", name: "바이", lanes: ["정글"] },
  { id: "Viego", name: "비에고", lanes: ["정글"] },
  { id: "Hecarim", name: "헤카림", lanes: ["정글"] },
  { id: "Warwick", name: "워윅", lanes: ["정글"] },
  { id: "Amumu", name: "아무무", lanes: ["정글"] },
  { id: "Ekko", name: "에코", lanes: ["정글", "미드"] },
  { id: "Elise", name: "엘리스", lanes: ["정글"] },
  { id: "Evelynn", name: "이블린", lanes: ["정글"] },
  { id: "Graves", name: "그레이브즈", lanes: ["정글"] },
  { id: "Jarvan IV", name: "자르반 4세", lanes: ["정글"] },
  { id: "Kayn", name: "케인", lanes: ["정글"] },
  { id: "Khazix", name: "카직스", lanes: ["정글"] },
  { id: "Kindred", name: "킨드레드", lanes: ["정글"] },
  { id: "MasterYi", name: "마스터 이", lanes: ["정글"] },
  { id: "Nidalee", name: "니달리", lanes: ["정글"] },
  { id: "Nocturne", name: "녹턴", lanes: ["정글"] },
  { id: "Nunu", name: "누누와 윌럼프", lanes: ["정글"] },
  { id: "Rammus", name: "람머스", lanes: ["정글"] },
  { id: "RekSai", name: "렉사이", lanes: ["정글"] },
  { id: "Sejuani", name: "세주아니", lanes: ["정글"] },
  { id: "Shaco", name: "샤코", lanes: ["정글"] },
  { id: "Shyvana", name: "쉬바나", lanes: ["정글"] },
  { id: "Trundle", name: "트런들", lanes: ["정글"] },
  { id: "Udyr", name: "우디르", lanes: ["정글"] },
  { id: "XinZhao", name: "신 짜오", lanes: ["정글"] },
  { id: "Zac", name: "자크", lanes: ["정글"] },

  // 미드
  { id: "Ahri", name: "아리", lanes: ["미드"] },
  { id: "Akali", name: "아칼리", lanes: ["미드"] },
  { id: "Anivia", name: "애니비아", lanes: ["미드"] },
  { id: "Annie", name: "애니", lanes: ["미드"] },
  { id: "Aurelion Sol", name: "아우렐리온 솔", lanes: ["미드"] },
  { id: "Azir", name: "아지르", lanes: ["미드"] },
  { id: "Cassiopeia", name: "카시오페아", lanes: ["미드"] },
  { id: "Diana", name: "다이애나", lanes: ["미드", "정글"] },
  { id: "Fizz", name: "피즈", lanes: ["미드"] },
  { id: "Galio", name: "갈리오", lanes: ["미드"] },
  { id: "Katarina", name: "카타리나", lanes: ["미드"] },
  { id: "LeBlanc", name: "르블랑", lanes: ["미드"] },
  { id: "Lissandra", name: "리산드라", lanes: ["미드"] },
  { id: "Lux", name: "럭스", lanes: ["미드", "서폿"] },
  { id: "Malzahar", name: "말자하르", lanes: ["미드"] },
  { id: "Orianna", name: "오리아나", lanes: ["미드"] },
  { id: "Pantheon", name: "판테온", lanes: ["미드", "서폿"] },
  { id: "Qiyana", name: "키야나", lanes: ["미드"] },
  { id: "Ryze", name: "라이즈", lanes: ["미드"] },
  { id: "Sylas", name: "사일러스", lanes: ["미드"] },
  { id: "Syndra", name: "신드라", lanes: ["미드"] },
  { id: "TwistedFate", name: "트위스티드 페이트", lanes: ["미드"] },
  { id: "Veigar", name: "베이가", lanes: ["미드"] },
  { id: "Viktor", name: "빅토르", lanes: ["미드"] },
  { id: "Xerath", name: "제라스", lanes: ["미드"] },
  { id: "Yasuo", name: "야스오", lanes: ["미드"] },
  { id: "Zed", name: "제드", lanes: ["미드"] },
  { id: "Ziggs", name: "직스", lanes: ["미드"] },
  { id: "Zoe", name: "조이", lanes: ["미드"] },

  // 원딜
  { id: "Ashe", name: "애쉬", lanes: ["원딜"] },
  { id: "Caitlyn", name: "케이틀린", lanes: ["원딜"] },
  { id: "Draven", name: "드레이븐", lanes: ["원딜"] },
  { id: "Ezreal", name: "이즈리얼", lanes: ["원딜"] },
  { id: "Jhin", name: "진", lanes: ["원딜"] },
  { id: "Jinx", name: "징크스", lanes: ["원딜"] },
  { id: "KaiSa", name: "카이사", lanes: ["원딜"] },
  { id: "Kalista", name: "칼리스타", lanes: ["원딜"] },
  { id: "Kogmaw", name: "코그모", lanes: ["원딜"] },
  { id: "Lucian", name: "루시안", lanes: ["원딜"] },
  { id: "MissFortune", name: "미스 포츈", lanes: ["원딜"] },
  { id: "Samira", name: "사미라", lanes: ["원딜"] },
  { id: "Sivir", name: "시비르", lanes: ["원딜"] },
  { id: "Tristana", name: "트리스타나", lanes: ["원딜"] },
  { id: "Twitch", name: "트위치", lanes: ["원딜"] },
  { id: "Vayne", name: "베인", lanes: ["원딜"] },
  { id: "Varus", name: "바루스", lanes: ["원딜"] },
  { id: "Xayah", name: "자야", lanes: ["원딜"] },
  { id: "Zeri", name: "제리", lanes: ["원딜"] },

  // 서폿
  { id: "Alistar", name: "알리스타", lanes: ["서폿"] },
  { id: "Bard", name: "바드", lanes: ["서폿"] },
  { id: "Blitzcrank", name: "블리츠크랭크", lanes: ["서폿"] },
  { id: "Brand", name: "브랜드", lanes: ["서폿"] },
  { id: "Janna", name: "잔나", lanes: ["서폿"] },
  { id: "Karma", name: "카르마", lanes: ["서폿"] },
  { id: "Leona", name: "레오나", lanes: ["서폿"] },
  { id: "Lulu", name: "룰루", lanes: ["서폿"] },
  { id: "Morgana", name: "모르가나", lanes: ["서폿"] },
  { id: "Nami", name: "나미", lanes: ["서폿"] },
  { id: "Nautilus", name: "노틸러스", lanes: ["서폿"] },
  { id: "Pyke", name: "파이크", lanes: ["서폿"] },
  { id: "Rakan", name: "라칸", lanes: ["서폿"] },
  { id: "Renata", name: "레나타 글라스크", lanes: ["서폿"] },
  { id: "Seraphine", name: "세라핀", lanes: ["서폿"] },
  { id: "Sona", name: "소나", lanes: ["서폿"] },
  { id: "Soraka", name: "소라카", lanes: ["서폿"] },
  { id: "Taric", name: "타릭", lanes: ["서폿"] },
  { id: "Thresh", name: "쓰레쉬", lanes: ["서폿"] },
  { id: "Yuumi", name: "유미", lanes: ["서폿"] },
  { id: "Zilean", name: "질리언", lanes: ["서폿"] },
  { id: "Zyra", name: "자이라", lanes: ["서폿"] },
  { id: "Milio", name: "밀리오", lanes: ["서폿"] },
];

export const LANES: Lane[] = ["탑", "정글", "미드", "원딜", "서폿"];

export const LANE_EMOJI: Record<Lane, string> = {
  탑: "🛡️",
  정글: "🌲",
  미드: "⚡",
  원딜: "🏹",
  서폿: "💊",
};

export function getChampionsByLane(lane: Lane): Champion[] {
  return champions.filter((c) => c.lanes.includes(lane));
}

export function getChampionImageUrl(id: string): string {
  const version = "14.24.1";
  const encoded = encodeURIComponent(id);
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${encoded}.png`;
}
