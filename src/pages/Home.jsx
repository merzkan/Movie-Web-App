import { useEffect, useState } from "react";
import Search from "../components/Search";
import Hero from "../components/Hero";
import MovieCard from "../components/Card/MovieCard";
import api from "../services/api";

function Home() {
  const [movies, setMovies] = useState([]);
  const [params, setParams] = useState({ query: "", page: 1 }); 
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (searchQuery, page) => {
    setLoading(true);
    try {
      const endpoint = searchQuery ? "/search/movie" : "/movie/top_rated";
      const response = await api.get(endpoint, {
        params: { query: searchQuery, page: page },
      });

      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(params.query, params.page);
  }, [params]);

  const handleSearch = (newQuery) => {
    if (params.query !== newQuery) {
        setParams({ query: newQuery, page: 1 });
    }
  };

  const changePage = (newPage) => {
    setParams(prev => ({ ...prev, page: newPage }));
  };

  useEffect(() => {
    const targetScroll = params.page === 1 ? 0 : 500;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }, [params.page]);

  return (
    <div>
      <Hero />
      <Search onSearch={handleSearch} />
      
      <main className="container mx-auto">
        {loading ? (
          <p className="text-center py-10">Yükleniyor...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        <div className="flex justify-center items-center gap-6 py-10">
          <button
            disabled={params.page === 1}
            onClick={() => changePage(params.page - 1)}
            className="px-6 py-2 bg-[#556650] text-[#D2DCB6] rounded-xl font-semibold transition-all duration-300 hover:bg-[#3d4a3a] disabled:bg-[#a8b3a5] disabled:cursor-not-allowed shadow-md"
          >
            Önceki
          </button>
          
          <span className="font-bold text-[#556650] bg-[#D2DCB6]/50 px-4 py-2 rounded-lg">
            {params.page} / {totalPages > 500 ? 500 : totalPages}
          </span>

          <button
            disabled={params.page >= totalPages || params.page >= 500}
            onClick={() => changePage(params.page + 1)}
            className="px-6 py-2 bg-[#556650] text-[#D2DCB6] rounded-xl font-semibold transition-all duration-300 hover:bg-[#3d4a3a] disabled:bg-[#a8b3a5] disabled:cursor-not-allowed shadow-md"
          >
            Sonraki
          </button>
        </div>
      </main>
    </div>
  );
}

export default Home;