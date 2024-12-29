import { useQuery } from "@tanstack/react-query";
import { pokemonApi } from "../api/pokemonApi";

export const usePokemonDetail = (id: string | number) => {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: async () => {
      const [pokemon, koreanName] = await Promise.all([
        pokemonApi.getPokemonDetail(id),
        pokemonApi.getPokemonSpecies(id),
      ]);
      return { ...pokemon, koreanName };
    },
  });
};
