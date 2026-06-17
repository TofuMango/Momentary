export function formatTimeAgo(time: Date | string | number) {
  const start = new Date(time);
  const end = new Date();

  const secondDiff = Math.floor((end.getTime() - start.getTime()) / 1000);

  // 60초 미만일 때
  if (secondDiff < 60) return "방금 전";

  // 초 단위 차이를 분 단위로 변환
  const minuteDiff = Math.floor(secondDiff / 60);

  // 60분 미만일 때
  if (minuteDiff < 60) return `${minuteDiff}분 전`;

  // 분 단위 차이를 시간 단위로 변환
  const hourDiff = Math.floor(minuteDiff / 60);

  // 하루가 넘어가지 않았을 때
  if (hourDiff < 24) return `${hourDiff}시간 전`;

  // 일 단위로 변환
  const daydiff = Math.floor(hourDiff / 24);
  return `${daydiff}일 전`;
}
