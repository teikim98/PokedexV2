// src/hooks/usePokemonList.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { pokemonApi } from "../api/pokemonApi";
import { Pokemon, PokemonListResponse } from "../api/types";

interface PokemonWithKoreanName extends Pokemon {
  koreanName?: string;
}

interface ExtendedPokemonListResponse
  extends Omit<PokemonListResponse, "results"> {
  results: PokemonWithKoreanName[];
}

export const usePokemonList = () => {
  return useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: async ({
      pageParam = 1,
    }): Promise<ExtendedPokemonListResponse> => {
      const data = await pokemonApi.getPokemons(pageParam);

      const pokemonsWithDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const id = pokemon.url.split("/")[6];
          const [details, koreanName] = await Promise.all([
            pokemonApi.getPokemonDetail(id),
            pokemonApi.getPokemonSpecies(id),
          ]);
          return {
            ...details,
            koreanName,
          };
        })
      );

      return {
        ...data,
        results: pokemonsWithDetails,
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.next) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};
