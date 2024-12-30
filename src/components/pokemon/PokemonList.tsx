import { useRecoilValue } from 'recoil';
import { usePokemonList } from '../../hooks/usePokemonList';
import { searchState } from '../../store/searchStore';
import PokemonCard from './PokemonCard';

const PokemonList = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = usePokemonList();

    const search = useRecoilValue(searchState);


    const filteredPokemon = data?.pages.flatMap(page =>
        page.results.filter(pokemon => {
            const nameMatch = (pokemon.name.toLowerCase().includes(search.text.toLowerCase()) ||
                pokemon.koreanName?.toLowerCase().includes(search.text.toLowerCase()));
            const typeMatch = !search.type ||
                pokemon.types.some(t => t.type.name === search.type);
            return nameMatch && typeMatch;
        })
    );


    if (isLoading) {
        return <div>로딩중...</div>;
    }

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredPokemon?.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
            {!search && hasNextPage && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
                    >
                        {isFetchingNextPage ? '로딩중...' : '더 보기'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default PokemonList;
