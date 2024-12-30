import { useRef, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { usePokemonList } from '../../hooks/usePokemonList';
import { searchState } from '../../store/searchStore';
import LoadingSpinner from '../common/LoadingSpinner';
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
    const observerRef = useRef<IntersectionObserver>();
    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 옵저버 생성
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage && !search.text && !search.type) {
                    fetchNextPage();
                }
            },
            { threshold: 1.0 }
        );

        observerRef.current = observer;

        // 옵저버 연결
        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        // 클린업
        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [hasNextPage, isFetchingNextPage, search.text, search.type]);

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
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredPokemon?.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>

            {/* 무한 스크롤 로딩 */}
            {!search.text && !search.type && (
                <div ref={loadMoreRef}>
                    {isFetchingNextPage && <LoadingSpinner />}
                </div>
            )}
        </div>
    );
};

export default PokemonList;