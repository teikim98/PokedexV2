export interface NamedAPIResource {
  name: string;
  url: string;
}

// 포켓몬 능력치
interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
}

// 포켓몬 타입
interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

// 포켓몬 스탯
interface PokemonStat {
  stat: NamedAPIResource;
  effort: number;
  base_stat: number;
}

// 포켓몬 스프라이트 (이미지)
interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
}

// 메인 포켓몬 인터페이스
export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
  species: NamedAPIResource;
}

// API 응답 리스트 인터페이스
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}
