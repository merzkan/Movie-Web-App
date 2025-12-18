import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { Star, Clock, Calendar, Tag, Globe, Heart, BookmarkPlus, CheckCircle } from "lucide-react";
import { useMovieActions } from "../hooks/useMovieActions"; 

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { 
    isFavorite, isWatchlist, isWatched,
    toggleFavorite, toggleWatchlist, toggleWatched 
  } = useMovieActions(movie || {}); 

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await api.get(`/movie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.log("Detay çekilemedi:", error);
      }
    };

    fetchDetail();
  }, [id]);

  if (!movie) return (
    <div className="min-h-screen flex justify-center items-center text-[#778873] font-bold text-xl">
        Yükleniyor...
    </div>
  );

  const imgBase = "https://image.tmdb.org/t/p/original";

  return (
    <div className="min-h-screen bg-[#F1F3E0] py-10">
      
      {/* Arka Plan Görseli */}
      <div 
        className="fixed inset-0 z-0 opacity-10 pointer-events-none"
        style={{
            backgroundImage: `url(${imgBase + movie.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-[#D2DCB6] p-6 md:p-10 flex flex-col md:flex-row gap-10">
            
            {/* SOL: Film Afişi */}
            <div className="w-full md:w-[350px] shrink-0">
                <img 
                    src={movie.poster_path ? imgBase + movie.poster_path : "https://via.placeholder.com/500x750"} 
                    alt={movie.title} 
                    className="w-full rounded-2xl shadow-lg"
                />
            </div>

            {/* SAĞ: Detaylar */}
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
                
                {/* 3. BUTONLAR ALANI*/}
                <div className="mt-auto pt-6 border-t border-[#D2DCB6] flex flex-wrap gap-4 items-center">
                     
                     {/* FAVORİ BUTONU */}
                     <button 
                        onClick={toggleFavorite}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all border-2
                        ${isFavorite 
                            ? "bg-red-500 border-red-500 text-white" 
                            : "bg-transparent border-[#A1BC98] text-[#556650] hover:bg-[#A1BC98] hover:text-white"
                        }`}
                     >
                        <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                        <span>{isFavorite ? "Favorilerde" : "Favorilere Ekle"}</span>
                     </button>

                     {/* LİSTEME EKLE BUTONU */}
                     <button 
                        onClick={toggleWatchlist}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all border-2
                        ${isWatchlist
                            ? "bg-[#778873] border-[#778873] text-white"
                            : "bg-transparent border-[#A1BC98] text-[#556650] hover:bg-[#A1BC98] hover:text-white"
                        }`}
                     >
                        <BookmarkPlus className="w-5 h-5" />
                        <span>{isWatchlist ? "Listemde" : "Listeme Ekle"}</span>
                     </button>

                     {/* İZLENDİ BUTONU */}
                     <button 
                        onClick={toggleWatched}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all border-2
                        ${isWatched
                            ? "bg-[#556650] border-[#556650] text-white"
                            : "bg-transparent border-[#A1BC98] text-[#556650] hover:bg-[#A1BC98] hover:text-white"
                        }`}
                     >
                        <CheckCircle className="w-5 h-5" />
                        <span>{isWatched ? "İzlendi" : "İzlenmedi"}</span>
                     </button>

                     {/* Web Sitesi Linki */}
                     <a href={movie.homepage} target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-2 text-[#778873] hover:text-[#556650] font-bold transition-colors">
                        <Globe className="w-5 h-5" /> Web Sitesi
                     </a>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;