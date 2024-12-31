// src/components/pokemon/PokemonCard.tsx
import { Key } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Heart } from 'lucide-react';
import { Pokemon, NamedAPIResource } from '../../api/types';
import { usePokemonDetail } from '../../hooks/usePokemonDetail';
import { searchState } from '../../store/searchStore';
import { TYPE_COLORS, TYPE_TRANSLATIONS } from '../../utils/constants';
import { favoriteState } from '../../store/favoriteState';

// pokemon prop이 NamedAPIResource 또는 Pokemon & { koreanName?: string }이 될 수 있도록 타입을 수정
interface PokemonCardProps {
    pokemon: NamedAPIResource | (Pokemon & { koreanName?: string });
    isFromList?: boolean;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
    const isNamedResource = 'url' in pokemon;
    const navigate = useNavigate();
    const [_, setSearch] = useRecoilState(searchState);
    const [favorites, setFavorites] = useRecoilState(favoriteState);
    const id = isNamedResource ? pokemon.url.split('/')[6] : pokemon.id;

    const isFavorite = favorites.some(fav => fav.id === Number(id));
    const { data, isLoading } = isNamedResource
        ? usePokemonDetail(id)
        : { data: pokemon, isLoading: false };

    const handleTypeClick = (typeName: string, e: React.MouseEvent) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        setSearch(prev => ({ ...prev, type: typeName }));
    };

    const handleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();  // 기본 이벤트 방지
        e.stopPropagation(); // 이벤트 전파 중지

        if (data) {
            if (isFavorite) {
                setFavorites(prev => prev.filter(fav => fav.id !== Number(id)));
            } else {
                setFavorites(prev => [...prev, {
                    id: Number(id),
                    name: data.name,
                    koreanName: data.koreanName,
                    image: data.sprites.front_default || ''
                }]);
            }
        }
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
            <button
                onClick={handleFavorite}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
                <Heart
                    size={24}
                    className={`${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                />
            </button>
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
