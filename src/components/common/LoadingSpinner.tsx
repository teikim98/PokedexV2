const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center gap-4 py-8">
            <div className="relative w-12 h-12">
                <div className="absolute top-0 w-12 h-12 rounded-full border-4 border-t-red-500 border-r-white border-b-white border-l-red-500 animate-spin"></div>
                <div className="absolute top-[14px] left-[14px] w-4 h-4 bg-white rounded-full"></div>
                <div className="absolute top-4 left-4 w-4 h-4 bg-gray-800 rounded-full"></div>
            </div>
            <p className="text-gray-600 animate-pulse">포켓몬 로딩중...</p>
        </div>
    );
};

export default LoadingSpinner;