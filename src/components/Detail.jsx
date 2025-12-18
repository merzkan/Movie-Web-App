import { useEffect, useState, useRef } from "react"; 
import { useParams, Link } from "react-router-dom"; 
import api from "../services/api";
import { Star, Clock, Calendar, Tag, Globe, Heart, BookmarkPlus, CheckCircle, PlayCircle, Users, Film, ChevronLeft, ChevronRight } from "lucide-react";
import { useMovieActions } from "../hooks/useMovieActions"; 
import MovieCard from "./Card/MovieCard"; 

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  
  const sliderRef = useRef(null);

  const { 
    isFavorite, isWatchlist, isWatched,
    toggleFavorite, toggleWatchlist, toggleWatched 
  } = useMovieActions(movie || {}); 

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchDetail = async () => {
      try {
        const response = await api.get(`/movie/${id}`, {
            params: {
                append_to_response: "videos,credits,similar"
            }
        });
        setMovie(response.data);
      } catch (error) {
        console.log("Detay çekilemedi:", error);
      }
    };

    fetchDetail();
  }, [id]);

  // 4. KAYDIRMA FONKSİYONU
  const slide = (direction) => {
    if(sliderRef.current){
        const { scrollLeft, clientWidth } = sliderRef.current;
        const scrollAmount = clientWidth / 2; 

        const scrollTo = direction === "left" 
            ? scrollLeft - scrollAmount 
            : scrollLeft + scrollAmount;
        
        sliderRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (!movie) return (
    <div className="min-h-screen flex justify-center items-center text-[#778873] font-bold text-xl">
        Yükleniyor...
    </div>
  );

  const imgBase = "https://image.tmdb.org/t/p/original";
  const profileBase = "https://image.tmdb.org/t/p/w185";
  
  const trailer = movie.videos?.results?.find(
    (vid) => vid.site === "YouTube" && vid.type === "Trailer"
  );
  
  const cast = movie.credits?.cast?.slice(0, 30) || [];
  const similarMovies = movie.similar?.results?.slice(0, 20) || [];

  return (
    <div className="min-h-screen bg-[#F1F3E0] py-10">
      
      <div 
        className="fixed inset-0 z-0 opacity-10 pointer-events-none"
        style={{
            backgroundImage: `url(${imgBase + movie.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10 space-y-10">
        
        {/* --- 1. ANA KART --- */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-[#D2DCB6] p-6 md:p-10 flex flex-col md:flex-row gap-10">
            <div className="w-full md:w-[350px] shrink-0">
                <img 
                    src={movie.poster_path ? imgBase + movie.poster_path : "https://via.placeholder.com/500x750"} 
                    alt={movie.title} 
                    className="w-full rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="flex-1 flex flex-col justify-center">
                <h1 className="text-4xl md:text-5xl font-black text-[#556650] mb-2 leading-tight">
                    {movie.title}
                </h1>
                {movie.tagline && (
                    <p className="text-xl text-[#778873] italic mb-6 font-medium">"{movie.tagline}"</p>
                )}

                <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-2 bg-[#F1F3E0] px-4 py-2 rounded-xl text-[#556650] font-bold border border-[#D2DCB6]">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        {movie.vote_average.toFixed(1)} / 10
                    </div>
                    <div className="flex items-center gap-2 bg-[#F1F3E0] px-4 py-2 rounded-xl text-[#556650] font-bold border border-[#D2DCB6]">
                        <Clock className="w-5 h-5 text-[#778873]" />
                        {movie.runtime} dk
                    </div>
                    <div className="flex items-center gap-2 bg-[#F1F3E0] px-4 py-2 rounded-xl text-[#556650] font-bold border border-[#D2DCB6]">
                        <Calendar className="w-5 h-5 text-[#778873]" />
                        {movie.release_date.split("-")[0]}
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-sm font-bold text-[#A1BC98] uppercase tracking-wider mb-2">Türler</h3>
                    <div className="flex flex-wrap gap-2">
                        {movie.genres.map((genre) => (
                            <span key={genre.id} className="flex items-center gap-1 bg-[#556650] text-white px-3 py-1 rounded-full text-sm font-medium">
                                <Tag className="w-3 h-3" /> {genre.name}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-sm font-bold text-[#A1BC98] uppercase tracking-wider mb-2">Özet</h3>
                    <p className="text-[#2b3628] leading-relaxed text-lg">
                        {movie.overview}
                    </p>
                </div>
                
                <div className="mt-auto pt-6 border-t border-[#D2DCB6] flex flex-wrap gap-4 items-center">
                     <button onClick={toggleFavorite} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all border-2 ${isFavorite ? "bg-red-500 border-red-500 text-white" : "bg-transparent border-[#A1BC98] text-[#556650] hover:bg-[#A1BC98] hover:text-white"}`}>
                        <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                        <span>{isFavorite ? "Favorilerde" : "Favorilere Ekle"}</span>
                     </button>

                     <button onClick={toggleWatchlist} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all border-2 ${isWatchlist ? "bg-[#778873] border-[#778873] text-white" : "bg-transparent border-[#A1BC98] text-[#556650] hover:bg-[#A1BC98] hover:text-white"}`}>
                        <BookmarkPlus className="w-5 h-5" />
                        <span>{isWatchlist ? "Listemde" : "Listeme Ekle"}</span>
                     </button>

                     <button onClick={toggleWatched} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all border-2 ${isWatched ? "bg-[#556650] border-[#556650] text-white" : "bg-transparent border-[#A1BC98] text-[#556650] hover:bg-[#A1BC98] hover:text-white"}`}>
                        <CheckCircle className="w-5 h-5" />
                        <span>{isWatched ? "İzlendi" : "İzlenmedi"}</span>
                     </button>
                </div>
            </div>
        </div>

        {/* --- 2. FRAGMAN VE OYUNCULAR --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-[#D2DCB6] p-6">
                <h3 className="text-2xl font-bold text-[#556650] mb-4 flex items-center gap-2">
                    <PlayCircle /> Fragman
                </h3>
                {trailer ? (
                    <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                        <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${trailer.key}`} title="YouTube video player" allowFullScreen></iframe>
                    </div>
                ) : (
                    <div className="h-64 flex items-center justify-center bg-[#F1F3E0] rounded-xl text-[#778873]">Bu film için fragman bulunamadı.</div>
                )}
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-[#D2DCB6] p-6 flex flex-col">
                <h3 className="text-2xl font-bold text-[#556650] mb-4 flex items-center gap-2">
                    <Users /> Oyuncular
                </h3>
                <div className="flex-1 overflow-y-auto max-h-[400px] pr-2 space-y-4 custom-scrollbar">
                    {cast.length > 0 ? cast.map(actor => (
                        <Link to={`/person/${actor.id}`} key={actor.id} className="flex items-center gap-4 p-2 hover:bg-[#F1F3E0] rounded-xl transition-colors cursor-pointer group">
                            <img src={actor.profile_path ? profileBase + actor.profile_path : "https://via.placeholder.com/100"} alt={actor.name} className="w-14 h-14 rounded-full object-cover shadow-md group-hover:scale-110 transition-transform" />
                            <div>
                                <p className="font-bold text-[#556650] text-sm group-hover:text-[#778873] transition-colors">{actor.name}</p>
                                <p className="text-xs text-[#778873]">{actor.character}</p>
                            </div>
                        </Link>
                    )) : (<p className="text-[#778873]">Oyuncu bilgisi yok.</p>)}
                </div>
            </div>
        </div>
      {/* --- 3. BENZER FİLMLER (DÜZELTİLMİŞ & BUTONLAR DIŞARIDA) --- */}
        {similarMovies.length > 0 && (
            <div className="mt-8 pt-8 border-t border-[#D2DCB6]/50 relative group">
                <h3 className="text-2xl font-bold text-[#556650] mb-6 flex items-center gap-2 px-2">
                    <Film /> Benzer Filmler
                </h3>
                
                {/* SOL BUTON: left-0 yerine -left-4 veya -left-12 yaptık */}
                <button 
                    onClick={() => slide("left")}
                    className="absolute -left-4 md:-left-12 top-[60%] -translate-y-1/2 z-30 bg-white text-[#556650] p-3 rounded-full shadow-lg border border-[#D2DCB6] hover:bg-[#556650] hover:text-white transition-all "
                >
                    <ChevronLeft size={24} />
                </button>

                {/* SLIDER ALANI */}
                <div 
                    ref={sliderRef}
                    className="flex gap-5 overflow-x-auto pb-6 px-2 scroll-smooth hide-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {similarMovies.map(similar => (
                        <div 
                            key={similar.id} 
                            className="w-full sm:w-[calc(50%-10px)] md:w-[calc(33.333%-15px)] lg:w-[calc(25%-15px)] flex-shrink-0"
                        >
                            <MovieCard movie={similar} />
                        </div>
                    ))}
                </div>

                {/* SAĞ BUTON: right-0 yerine -right-4 veya -right-12 yaptık */}
                <button 
                    onClick={() => slide("right")}
                    className="absolute -right-4 md:-right-12 top-[60%] -translate-y-1/2 z-30 bg-white text-[#556650] p-3 rounded-full shadow-lg border border-[#D2DCB6] hover:bg-[#556650] hover:text-white transition-all "
                >
                    <ChevronRight size={24} />
                </button>

            </div>
        )}             

      </div>
    </div>
  );
}

export default Detail;