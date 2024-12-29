// src/pages/Detail.tsx
import { useParams } from 'react-router-dom';
import { usePokemonDetail } from '../../hooks/usePokemonDetail';
import { TYPE_COLORS, TYPE_TRANSLATIONS } from '../../utils/constants';

const PokemonDetail = () => {

    const { id } = useParams<{ id: string }>();
    const { data: pokemon, isLoading } = usePokemonDetail(id!);

    if (isLoading) {
        return (
            <div className="container mx-auto p-8">
                <div className="animate-pulse">
                    <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                </div>
            </div>
        );
    }

    if (!pokemon) return null;

    return (
        <div className="container mx-auto p-8">
            {/* 기본 정보 섹션 */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="flex-shrink-0">
                        <img
                            src={pokemon.sprites.front_default || ''}
                            alt={pokemon.koreanName || pokemon.name}
                            className="w-48 h-48 object-contain"
                        />
                    </div>
                    <div className="md:ml-8 text-center md:text-left">
                        <h1 className="text-3xl font-bold mb-2">
                            {pokemon.koreanName || pokemon.name}
                        </h1>
                        <div className="flex gap-2 justify-center md:justify-start">
                            {pokemon.types.map((type) => (
                                <span
                                    key={type.type.name}
                                    className={`px-4 py-1 rounded-full text-white ${TYPE_COLORS[type.type.name as keyof typeof TYPE_COLORS]}`}
                                >
                                    {TYPE_TRANSLATIONS[type.type.name as keyof typeof TYPE_TRANSLATIONS]}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 스탯 섹션 */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">능력치</h2>
                <div className="space-y-4">
                    {pokemon.stats.map((stat) => (
                        <div key={stat.stat.name}>
                            <div className="flex justify-between mb-1">
                                <span className="font-medium">
                                    {translateStatName(stat.stat.name)}
                                </span>
                                <span>{stat.base_stat}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 신체 정보 섹션 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">신체 정보</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <span className="font-medium">키:</span> {pokemon.height / 10}m
                    </div>
                    <div>
                        <span className="font-medium">몸무게:</span> {pokemon.weight / 10}kg
                    </div>
                </div>
            </div>
        </div>
    );
};

// 스탯 이름 번역 함수
const translateStatName = (name: string) => {
    const translations: { [key: string]: string } = {
        hp: "HP",
        attack: "공격",
        defense: "방어",
        "special-attack": "특수공격",
        "special-defense": "특수방어",
        speed: "스피드"
    };
    return translations[name] || name;
};

export default PokemonDetail;