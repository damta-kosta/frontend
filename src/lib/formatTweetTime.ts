import dayjs from "dayjs";

/**
 * 트위터 스타일로 시간을 포맷합니다.
 * @param date 시간 문자열 또는 Date 객체
 * @returns 예: "방금 전", "5분 전", "3시간 전", "2일 전", "03월 15일", "2023년 12월 25일"
 */
export function formatTweetTime(date: string | Date): string {
  const now = dayjs();
  const d = dayjs(date);
  const diffInMinutes = now.diff(date, "minute");
  const diffInHour = now.diff(date, "hour");
  const diffInDays = now.diff(date, "day");
  const diffInYears = now.diff(date, "year");

  if (diffInMinutes < 1) return "방금 전";
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
  if (diffInHour < 24) return `${diffInHour}시간 전`;
  if (diffInDays < 7) return `${diffInDays}일 전`;
  if (diffInYears >= 1) return d.format("YYYY년 MM월 DD일");

  return d.format("M월 DD일");
}
