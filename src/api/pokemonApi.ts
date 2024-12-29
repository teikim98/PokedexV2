// src/api/pokemonApi.ts
import axios from "axios";
import { Pokemon, PokemonListResponse } from "./types";

const BASE_URL = "https://pokeapi.co/api/v2";

export const pokemonApi = {
  // 포켓몬 리스트 가져오기
  getPokemons: async (page: number = 1, limit: number = 20) => {
    const offset = (page - 1) * limit;
    const response = await axios.get<PokemonListResponse>(
      `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
    );
    return response.data;
  },

  // 특정 포켓몬 상세정보 가져오기
  getPokemonDetail: async (id: string | number): Promise<Pokemon> => {
    const response = await axios.get<Pokemon>(`${BASE_URL}/pokemon/${id}`);
    return response.data;
  },
};
