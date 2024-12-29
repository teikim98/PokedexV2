// src/components/pokemon/PokemonList.tsx
import { usePokemonList } from '../../hooks/usePokemonList';
import PokemonCard from './PokemonCard';

const PokemonList = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = usePokemonList();

    if (isLoading) {
        return <div>로딩중...</div>;
    }

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data?.pages.map((group, i) => (
                    <div key={i}>
                        {group.results.map((pokemon) => (
                            <PokemonCard
                                key={pokemon.name}
                                pokemon={pokemon}
                            />
                        ))}
                    </div>
                ))}
            </div>
            {hasNextPage && (
                <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {isFetchingNextPage ? '로딩중...' : '더 보기'}
                </button>
            )}
        </div>
    );
};

export default PokemonList;