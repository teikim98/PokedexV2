import { atom } from "recoil";

interface FavoritePokemon {
  id: number;
  name: string;
}
export const favoriteState = atom<FavoritePokemon[]>({
  key: "favoriteState",
  default: [],
});
