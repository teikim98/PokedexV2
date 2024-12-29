// src/components/common/Header.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 bg-white shadow-md z-50">
            {/* PC 버전 헤더 */}
            <div className="container mx-auto px-4">
                <div className="hidden md:flex items-center justify-between h-16">
                    <Link to="/" className="text-xl font-bold">
                        포켓몬 도감
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="포켓몬 검색..."
                                className="pl-10 pr-4 py-2 w-[300px] border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* 모바일 버전 헤더 */}
                <div className="md:hidden flex items-center justify-between h-14">
                    <Link to="/" className="text-lg font-bold">
                        포켓몬 도감
                    </Link>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-lg hover:bg-gray-100"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* 모바일 메뉴 */}
            {isOpen && (
                <div className="md:hidden absolute top-14 left-0 right-0 bg-white border-t shadow-lg p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="포켓몬 검색..."
                            className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;