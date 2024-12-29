// src/components/pokemon/PokemonCard.tsx
import { NamedAPIResource } from '../../api/types';
import { usePokemonDetail } from '../../hooks/usePokemonDetail';

interface PokemonCardProps {
    pokemon: NamedAPIResource;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
    // URL에서 ID 추출
    const id = pokemon.url.split('/')[6];
    const { data, isLoading } = usePokemonDetail(id);

    if (isLoading) {
        return (
            <div className="rounded-lg bg-white p-4 shadow-md w-full h-[250px] animate-pulse">
                <div className="h-32 bg-gray-200 rounded-md"></div>
            </div>
        );
    }

    return (
        <div className="rounded-lg bg-white p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex flex-col items-center">
                <img
                    src={data?.sprites.front_default || ''}
                    alt={data?.name}
                    className="w-32 h-32 object-contain"
                />
                <h3 className="text-lg font-semibold capitalize mt-2">
                    {data?.name}
                </h3>
                <div className="flex gap-2 mt-2">
                    {data?.types.map((type) => (
                        <span
                            key={type.type.name}
                            className="px-2 py-1 rounded-full text-sm text-white bg-blue-500"
                        >
                            {type.type.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PokemonCard;