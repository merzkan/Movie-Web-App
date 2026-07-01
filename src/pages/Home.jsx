import Search from "../components/Search";
import Hero from "../components/Hero";
import MovieCard from "../components/Card/MovieCard";
import api from "../services/api";
import { useEffect, useState, useRef } from "react";

function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef(null);

  // Veri çekme fonksiyonu (Hem popüler hem arama için)
  const fetchMovies = async (searchQuery, pageNum, isNewSearch = false) => {
    setLoading(true);
    try {
      const endpoint = searchQuery ? "/search/movie" : "/movie/top_rated";
      const response = await api.get(endpoint, {
        params: { query: searchQuery, page: pageNum },
      });

      const results = response.data.results;
      
      // Eğer yeni arama ise listeyi sıfırla, değilse üzerine ekle
      setMovies((prev) => (isNewSearch ? results : [...prev, ...results]));
    } catch (error) {
      console.log("Veri çekme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  // 1. Sayfa veya Arama değiştiğinde veriyi güncelle
  useEffect(() => {
    if (page > 1) {
      fetchMovies(query, page);
    }
  }, [page]);

  // 2. Arama fonksiyonu
  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    setPage(1); // Yeni aramada sayfayı sıfırla
    if (!searchQuery.trim()) {
      setMovies([]);
      fetchMovies("", 1, true);
      return;
    }
    fetchMovies(searchQuery, 1, true);
  };

  // 3. Intersection Observer (Sonsuz kaydırma için)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [loading]);

  return (
    <div>
      <Hero />
      <Search onSearch={handleSearch} />
      <main className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={`${movie.id}-${movie.page}`} movie={movie} />
          ))}
        </div>
        
        {/* Sonsuz kaydırma tetikleyici div */}
        <div ref={observerTarget} className="h-10 w-full mt-4">
          {loading && <p className="text-center">Yükleniyor...</p>}
        </div>
      </main>
    </div>
  );
}

export default Home;