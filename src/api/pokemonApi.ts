// src/api/pokemonApi.ts
import axios from "axios";
import { Pokemon, PokemonListResponse, PokemonSpecies } from "./types";

const BASE_URL = "https://pokeapi.co/api/v2";

export const pokemonApi = {
  getPokemons: async (page: number = 1, limit: number = 52) => {
    const offset = (page - 1) * limit;
    const response = await axios.get<PokemonListResponse>(
      `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
    );
    return response.data;
  },

  getPokemonDetail: async (id: string | number): Promise<Pokemon> => {
    const response = await axios.get<Pokemon>(`${BASE_URL}/pokemon/${id}`);
    return response.data;
  },

  getPokemonSpecies: async (
    id: string | number
  ): Promise<string | undefined> => {
    const response = await axios.get<PokemonSpecies>(
      `${BASE_URL}/pokemon-species/${id}`
    );
    return response.data.names.find((name) => name.language.name === "ko")
      ?.name;
  },
};
