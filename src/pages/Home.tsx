// src/pages/Home.tsx
import PokemonList from '../components/pokemon/PokemonList';

const Home = () => {
    return (
        <div className="py-8">
            <h1 className="text-3xl font-bold text-center mb-8">포켓몬 도감</h1>
            <PokemonList />
        </div>
    );
};

export default Home;