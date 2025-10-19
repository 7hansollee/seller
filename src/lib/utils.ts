import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 닉네임을 마스킹 처리합니다.
 * 첫 글자만 보이고 나머지는 *로 대체됩니다.
 * @param nickname - 마스킹할 닉네임
 * @returns 마스킹된 닉네임
 * @example
 * maskNickname("이한솔") // "이**"
 * maskNickname("홍길동") // "홍**"
 * maskNickname("김") // "김"
 */
export function maskNickname(nickname: string): string {
  if (!nickname || nickname.length === 0) {
    return nickname;
  }
  
  if (nickname.length === 1) {
    return nickname;
  }
  
  const firstChar = nickname[0];
  const maskedChars = '*'.repeat(nickname.length - 1);
  
  return firstChar + maskedChars;
}
