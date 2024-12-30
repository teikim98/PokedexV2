import { atom } from "recoil";

interface SearchState {
  text: string;
  type: string | null;
}

export const searchState = atom<SearchState>({
  key: "searchState",
  default: {
    text: "",
    type: null,
  },
});
