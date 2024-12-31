import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, X, Heart } from 'lucide-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { searchState } from '../../store/searchStore';
import { favoriteState } from '../../store/favoriteState';

const Header = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isFavoriteOpen, setIsFavoriteOpen] = useState(false);
    const [search, setSearch] = useRecoilState(searchState);
    const favorites = useRecoilValue(favoriteState);
    const [tempSearch, setTempSearch] = useState(search.text);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearch(prev => ({
            ...prev,
            text: tempSearch
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setTempSearch(e.target.value);
    };

    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(prev => !prev);
    };

    const resetSearch = () => {
        setSearch({ text: '', type: null });
        setTempSearch('');
    };


    return (
        <header className="sticky top-0 bg-white shadow-lg z-50 transition-all duration-300">
            <div className="container mx-auto px-4">
                {/* PC 버전 헤더 */}
                <div className="hidden md:flex items-center justify-between h-16">
                    <Link
                        to="/"
                        className="text-xl font-bold hover:text-blue-600 transition-colors duration-300 flex items-center gap-2"
                        onClick={resetSearch}
                    >
                        <img
                            src="./pokeball.png"
                            alt="포켓볼"
                            className="w-8 h-8 animate-spin-slow"
                        />
                        <span className="text-2xl">포켓몬 도감</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <form onSubmit={handleSubmit} className="relative group">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" size={20} />
                            <input
                                type="text"
                                value={tempSearch}
                                onChange={handleInputChange}
                                placeholder="포켓몬 검색..."
                                className="pl-10 pr-4 py-2 w-[300px] border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 
                               transition-all duration-300 bg-gray-50 hover:bg-white hover:shadow-md"
                            />
                        </form>
                        <button
                            onClick={() => setIsFavoriteOpen(prev => !prev)}
                            className="p-2 rounded-full hover:bg-gray-100 relative transition-colors duration-300"
                        >
                            <Heart size={24} className="text-gray-600" />
                            {favorites.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {favorites.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* 모바일 버전 헤더 */}
                <div className="md:hidden flex items-center justify-between h-14">
                    <Link
                        to="/"
                        className="text-lg font-bold flex items-center gap-2"
                        onClick={resetSearch}
                    >
                        <img
                            src="./pokeball.png"
                            alt="포켓볼"
                            className="w-6 h-6"
                        />
                        <span>포켓몬 도감</span>
                    </Link>
                    <button
                        onClick={toggleMenu}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* 즐겨찾기 메뉴 */}
            {isFavoriteOpen && (
                <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg w-80 max-h-96 overflow-y-auto z-50 animate-slideDown">
                    {favorites.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                            즐겨찾기한 포켓몬이 없습니다
                        </div>
                    ) : (
                        <div className="p-2">
                            {favorites.map(pokemon => (
                                <div
                                    key={pokemon.id}
                                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-300"
                                    onClick={() => {
                                        navigate(`/pokemon/${pokemon.id}`);
                                        setIsFavoriteOpen(false);
                                    }}
                                >
                                    <img
                                        src={pokemon.image}
                                        alt={pokemon.koreanName}
                                        className="w-10 h-10"
                                    />
                                    <span>{pokemon.koreanName || pokemon.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* 모바일 메뉴 */}
            {isOpen && (
                <div className="md:hidden absolute top-14 left-0 right-0 bg-white border-t shadow-lg p-4 animate-slideDown">
                    <form onSubmit={handleSubmit} className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={tempSearch}
                            onChange={handleInputChange}
                            placeholder="포켓몬 검색..."
                            className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500
                           bg-gray-50 hover:bg-white transition-all duration-300"
                        />
                    </form>
                </div>
            )}
        </header>
    );
};

export default Header;