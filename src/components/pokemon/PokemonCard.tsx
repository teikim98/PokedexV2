// src/components/pokemon/PokemonCard.tsx
import { Key } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Pokemon, NamedAPIResource } from '../../api/types';
import { usePokemonDetail } from '../../hooks/usePokemonDetail';
import { searchState } from '../../store/searchStore';
import { TYPE_COLORS, TYPE_TRANSLATIONS } from '../../utils/constants';

// pokemon prop이 NamedAPIResource 또는 Pokemon & { koreanName?: string }이 될 수 있도록 타입을 수정
interface PokemonCardProps {
    pokemon: NamedAPIResource | (Pokemon & { koreanName?: string });
    isFromList?: boolean;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
    const isNamedResource = 'url' in pokemon;
    const navigate = useNavigate();
    const [_, setSearch] = useRecoilState(searchState);


    const id = isNamedResource ? pokemon.url.split('/')[6] : pokemon.id;
    const { data, isLoading } = isNamedResource
        ? usePokemonDetail(id)
        : { data: pokemon, isLoading: false };

    const handleTypeClick = (typeName: string, e: React.MouseEvent) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        setSearch(prev => ({ ...prev, type: typeName }));
    };


    if (isLoading) {
        return (
            <div className="rounded-2xl bg-white p-6 shadow-md w-full h-[280px] animate-pulse">
                <div className="h-40 bg-gray-200 rounded-xl"></div>
            </div>
        );
    }

    return (
        <div
            className="group rounded-2xl bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            onClick={() => navigate(`/pokemon/${id}`)}
        >
            <div className="flex flex-col items-center">
                <div className="relative w-40 h-40 bg-gray-50 rounded-full mb-4 overflow-hidden group-hover:scale-110 transition-transform duration-300">
                    <img
                        src={data?.sprites.front_default || ''}
                        alt={data?.koreanName || data?.name}
                        className="w-full h-full object-contain p-2"
                    />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                    {data?.koreanName || data?.name}
                </h3>
                <div className="flex gap-2 flex-wrap justify-center">
                    {data?.types.map((type: { type: { name: Key | null | undefined; }; }) => (
                        <span
                            key={type.type.name}
                            onClick={(e) => handleTypeClick(type.type.name as string, e)}
                            className={`px-4 py-1.5 rounded-full text-sm text-white font-medium shadow-sm transform transition-transform hover:scale-105 ${TYPE_COLORS[type.type.name as keyof typeof TYPE_COLORS]}`}
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
