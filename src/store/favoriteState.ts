// src/store/favoriteStore.ts
import { atom } from "recoil";

interface FavoritePokemon {
  id: number;
  name: string;
  koreanName?: string;
  image: string;
}

export const favoriteState = atom<FavoritePokemon[]>({
  key: "favoriteState",
  default: [],
});
