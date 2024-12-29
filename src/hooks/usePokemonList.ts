import { useInfiniteQuery } from "@tanstack/react-query";
import { pokemonApi } from "../api/pokemonApi";

export const usePokemonList = () => {
  return useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: ({ pageParam = 1 }) => pokemonApi.getPokemons(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.next) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};
