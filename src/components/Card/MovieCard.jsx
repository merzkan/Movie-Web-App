import { Link } from "react-router-dom";
import { Star, Heart, BookmarkPlus, CheckCircle } from "lucide-react";
import { useMovieActions } from "../../hooks/useMovieActions";

function MovieCard({ movie }) {
  const { 
    isFavorite, isWatchlist, isWatched,
    toggleFavorite, toggleWatchlist, toggleWatched 
  } = useMovieActions(movie);

  const imgBase = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="group bg-[#D2DCB6] w-full h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-[#778873]/30 transition-all duration-300 border border-[#A1BC98] flex flex-col">
      <Link to={`/movie/${movie.id}`}>
        <div className="relative h-[450px] overflow-hidden">
          <img
            src={movie.poster_path ? imgBase + movie.poster_path : "https://via.placeholder.com/500x750?text=Resim+Yok"}
            alt={movie.original_title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#D2DCB6] via-transparent to-transparent opacity-100"></div>
          <div className="absolute top-3 left-3 bg-[#F1F3E0]/90 backdrop-blur-md text-[#5c6b58] px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm font-bold border border-[#778873]/20">
            <Star className="w-4 h-4 fill-[#FFD700] text-[#778873]" />
            <span className="text-sm">{movie.vote_average ? movie.vote_average.toFixed(1) : "-"}</span>
          </div>
        </div>
      </Link>
      
      <div className="relative px-5 pb-5 pt-2 flex flex-col flex-grow -mt-20">
        <div className="flex items-center gap-3 text-xs text-[#4a5747] font-bold mb-2 opacity-90">
          <span className="bg-[#A1BC98]/40 px-2 py-0.5 rounded border border-[#778873]/20 text-[#2b3628]">
            {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
          </span>
        </div>

        <h2 className="text-xl font-bold text-[#1a2318] mb-2 leading-tight group-hover:text-[#778873] transition-colors line-clamp-1">
          {movie.title}
        </h2>

        <p className="text-[#2b3628] text-sm line-clamp-3 mb-4 flex-grow opacity-90 leading-relaxed font-medium">
          {movie.overview || "Özet bilgisi bulunamadı."}
        </p>
    
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[#A1BC98]">
          
          {/* FAVORİ BUTONU */}
          <button 
            onClick={toggleFavorite} 
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95 border border-[#A1BC98] group/btn
              ${isFavorite 
                ? "bg-red-500 text-white cursor-default" 
                : "bg-[#F1F3E0]/40 hover:bg-[#F1F3E0] hover:text-red-500 text-[#2b3628]"
              }`}
            title={isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
          >
            <Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : "group-hover/btn:fill-current"}`} />
          </button>

          <div className="flex-1 flex gap-2">
            {/* LİSTEME EKLE BUTONU */}
            <button 
              onClick={toggleWatchlist} 
              className={`flex-1 border-2 py-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all active:scale-95 h-12 box-border
                ${isWatchlist 
                  ? "bg-[#778873] text-white border-[#778873]" 
                  : "bg-transparent border-[#778873] hover:bg-[#778873] hover:text-[#F1F3E0] text-[#2b3628]"
                }`}
            >
              <BookmarkPlus className="w-4 h-4" />
              <span>{isWatchlist ? "Listemde" : "Listeme Ekle"}</span>
            </button>
            {/* İZLENDİ BUTONU */}
            <button 
              onClick={toggleWatched} 
              className={`flex-1 border-2 py-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all active:scale-95 h-12 box-border
                ${isWatched 
                  ? "bg-[#556650] text-white border-[#556650]" 
                  : "bg-transparent border-[#778873] hover:bg-[#778873] hover:text-[#F1F3E0] text-[#2b3628]"
                }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isWatched ? "İzlendi" : "İzlenmedi"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;