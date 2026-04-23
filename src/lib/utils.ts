import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const adjectives = [
  "폭주하는",
  "은밀한",
  "초월한",
  "뒤틀린",
  "유령같은",
  "망상하는",
  "번쩍이는",
  "잠복한",
  "불온한",
  "각성한",
  "질주하는",
  "고독한",
  "광기어린",
  "비밀스런",
  "차원넘는",
  "폭풍같은",
  "야생의",
  "예측불가한",
  "집요한",
  "이상한",
];

const nouns = [
  "해커",
  "닌자",
  "연금술사",
  "드래곤",
  "고블린",
  "망령",
  "마법사",
  "우주인",
  "좀비",
  "사이버고양이",
  "기계새",
  "그림자",
  "돌연변이",
  "시간여행자",
  "외계인",
  "유령",
  "사냥꾼",
  "탐험가",
  "환영",
  "코드괴물",
];

export const getRandomNickname = () => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 100);
  return `${adjective}${noun}${number}`;
};
