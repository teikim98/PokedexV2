import { atom } from "recoil";

export const searchState = atom({
  key: "searchState", // unique한 key 값
  default: "", // 초기값
});
