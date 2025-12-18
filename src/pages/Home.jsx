import Search from "../components/Search";
import Hero from "../components/Hero";
import MovieCard from "../components/Card/MovieCard";
import api from "../services/api";
import { useEffect, useState } from "react";

function Home() {
  const [movies, setMovies] = useState([]);

  const PopularMovie = async () => {
    const storedMovies = localStorage.getItem("popularMovies");
    if(storedMovies){
      setMovies(JSON.parse(storedMovies));
    }else{
       try{
        const response = await api.get("/movie/top_rated");
        const data = response.data.results
        setMovies(data);
        localStorage.setItem("popularMovies", JSON.stringify(data))
      }catch(error){
        console.log(error);
      }
    }
     
    }

  useEffect(() => {
    PopularMovie();
  },[]);

  const handleSearch = async (query) => {
    if(!query.trim()){
      PopularMovie();
      return;
    }
    try{
      const response = await api.get("/search/movie",{
        params: {query:query}
      });
      const searchResults = response.data.results;
      searchResults.sort((a, b) => b.popularity - a.popularity);
      setMovies(searchResults)
    }catch(error){
      console.log("Arama hatası",error);
    }  
  };

  return (
    <div>
      <Hero />
      <Search onSearch={handleSearch} />
      <main className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p className="text-center w-full text-gray-500">Film bulunamadı.</p>
          )}
        </div>
      </main>
    </div>

  )
}

export default Home;