import { useQuery } from "@tanstack/react-query";
import { pokemonApi } from "../api/pokemonApi";

export const usePokemonDetail = (id: string | number) => {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => pokemonApi.getPokemonDetail(id),
  });
};
