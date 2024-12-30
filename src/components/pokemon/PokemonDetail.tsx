import { useParams } from 'react-router-dom';
import { usePokemonDetail } from '../../hooks/usePokemonDetail';
import { TYPE_COLORS, TYPE_TRANSLATIONS } from '../../utils/constants';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import LoadingSpinner from '../common/LoadingSpinner';

const PokemonDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { data: pokemon, isLoading } = usePokemonDetail(id!);

    // 로딩 스피너 컴포넌트 재사용
    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!pokemon) return null;

    // 스탯 데이터 가공
    const statsData = pokemon.stats.map(stat => ({
        subject: translateStatName(stat.stat.name),
        value: stat.base_stat,
        fullMark: 255
    }));

    return (
        <div className="container mx-auto p-4 md:p-8 max-w-5xl">
            {/* 기본 정보 카드 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative w-48 h-48 bg-gray-50 rounded-full flex items-center justify-center">
                        <img
                            src={pokemon.sprites.front_default || ''}
                            alt={pokemon.koreanName || pokemon.name}
                            className="w-40 h-40 object-contain transition-transform hover:scale-110"
                        />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex items-baseline gap-3 justify-center md:justify-start">
                            <h1 className="text-4xl font-bold">
                                {pokemon.koreanName || pokemon.name}
                            </h1>
                            <span className="text-gray-500">#{String(pokemon.id).padStart(3, '0')}</span>
                        </div>
                        <div className="flex gap-2 mt-4 flex-wrap justify-center md:justify-start">
                            {pokemon.types.map((type) => (
                                <span
                                    key={type.type.name}
                                    className={`px-6 py-2 rounded-full text-white font-medium shadow-sm ${TYPE_COLORS[type.type.name as keyof typeof TYPE_COLORS]}`}
                                >
                                    {TYPE_TRANSLATIONS[type.type.name as keyof typeof TYPE_TRANSLATIONS]}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* 스탯 차트 */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-6 text-center">능력치</h2>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={statsData}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis
                                    dataKey="subject"
                                    tick={{ fill: '#4a5568', fontSize: 12 }}
                                />
                                <Tooltip
                                    content={({ payload }) => {
                                        if (payload && payload.length > 0) {
                                            return (
                                                <div className="bg-white shadow-md rounded-lg p-2 text-sm">
                                                    {payload[0].value}
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Radar
                                    name="스탯"
                                    dataKey="value"
                                    stroke="#3b82f6"
                                    fill="#3b82f6"
                                    fillOpacity={0.5}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>


                </div>

                {/* 신체 정보와 수치 정보 */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-6 text-center">기본 정보</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                            <div>
                                <p className="text-gray-600 mb-1">키</p>
                                <p className="text-xl font-semibold">{pokemon.height / 10}m</p>
                            </div>
                            <div>
                                <p className="text-gray-600 mb-1">몸무게</p>
                                <p className="text-xl font-semibold">{pokemon.weight / 10}kg</p>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                            {pokemon.stats.map((stat) => (
                                <div key={stat.stat.name} className="mb-2">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">{translateStatName(stat.stat.name)}</span>
                                        <span className="font-semibold">{stat.base_stat}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

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