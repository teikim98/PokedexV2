// src/components/pokemon/PokemonCard.tsx
import { Key } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pokemon, NamedAPIResource } from '../../api/types';
import { usePokemonDetail } from '../../hooks/usePokemonDetail';
import { TYPE_COLORS, TYPE_TRANSLATIONS } from '../../utils/constants';

// pokemon prop이 NamedAPIResource 또는 Pokemon & { koreanName?: string }이 될 수 있도록 타입을 수정
interface PokemonCardProps {
    pokemon: NamedAPIResource | (Pokemon & { koreanName?: string });
    isFromList?: boolean;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
    // pokemon이 NamedAPIResource인지 확인
    const isNamedResource = 'url' in pokemon;
    const navigate = useNavigate();

    const id = isNamedResource ? pokemon.url.split('/')[6] : pokemon.id;
    const { data, isLoading } = isNamedResource
        ? usePokemonDetail(id)
        : { data: pokemon, isLoading: false };

    if (isLoading) {
        return (
            <div className="rounded-lg bg-white p-4 shadow-md w-full h-[250px] animate-pulse">
                <div className="h-32 bg-gray-200 rounded-md"></div>
            </div>
        );
    }

    return (
        <div
            className="rounded-lg bg-white p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/pokemon/${id}`)}
        >            <div className="flex flex-col items-center">
                <img
                    src={data?.sprites.front_default || ''}
                    alt={data?.koreanName || data?.name}
                    className="w-32 h-32 object-contain"
                />
                <h3 className="text-lg font-semibold capitalize mt-2">
                    {data?.koreanName || data?.name}
                </h3>
                <div className="flex gap-2 mt-2">
                    {data?.types.map((type: { type: { name: Key | null | undefined; }; }) => (
                        <span
                            key={type.type.name}
                            className={`px-3 py-1 rounded-full text-sm text-white ${TYPE_COLORS[type.type.name as keyof typeof TYPE_COLORS]}`}
                        >
                            {TYPE_TRANSLATIONS[type.type.name as keyof typeof TYPE_TRANSLATIONS]}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PokemonCard;