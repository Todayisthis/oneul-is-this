const BAD_WORDS = [
  // 한국어 욕설
  "씨발", "시발", "ㅅㅂ", "씨바", "씨팔", "시팔",
  "개새끼", "개새", "ㄱㅅㄲ", "개쉐이", "개세끼",
  "병신", "ㅂㅅ", "벙신",
  "지랄", "ㅈㄹ",
  "미친", "미쳤", "ㅁㅊ",
  "존나", "졸라", "ㅈㄴ",
  "새끼", "새기", "ㅅㄲ",
  "fuck", "shit", "bitch", "asshole", "bastard",
  // 스팸 패턴
  "http://", "https://", "www.", ".com", ".net", ".org",
  "카카오톡", "텔레그램", "라인아이디", "라인id",
  "010-", "010 ", "전화번호", "연락처",
  "광고", "홍보", "이벤트당첨", "무료쿠폰",
];

const SPAM_PATTERNS = [
  /(.)\1{4,}/,        // 같은 글자 5번 이상 반복 (ㅋㅋㅋㅋㅋ 제외 예외 처리)
  /[a-zA-Z0-9]{20,}/, // 의미없는 긴 영숫자 나열
];

const REPEAT_EXCEPTIONS = ["ㅋ", "ㅎ", "ㅠ", "ㅜ", "ㅡ", "!",  "~", "ㅇ"];

export function filterComment(text: string): { ok: boolean; reason?: string } {
  const lower = text.normalize("NFKC").toLowerCase();

  for (const word of BAD_WORDS) {
    if (lower.includes(word.toLowerCase())) {
      return { ok: false, reason: "부적절한 단어가 포함되어 있어요." };
    }
  }

  for (const pattern of SPAM_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      const repeated = match[1];
      if (repeated && REPEAT_EXCEPTIONS.includes(repeated)) continue;
      return { ok: false, reason: "스팸으로 보이는 내용이에요." };
    }
  }

  return { ok: true };
}
