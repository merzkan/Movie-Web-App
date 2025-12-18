import { FaTrash, FaStar, FaPen, FaHeart, FaCheck } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMovieActions } from "../../hooks/useMovieActions";

function ListMovieCard({ movie = {}, type = "" }) {
    const { 
        isFavorite, isWatched, 
        toggleFavorite, handleDelete, 
        updateMovieRating, updateMovieNote, addMovieToWatched 
    } = useMovieActions(movie);

    const [isClicked, setIsClicked] = useState(false);
    const [noteText, setNoteText] = useState(movie.userNote || "");

    useEffect(() => {
        setNoteText(movie.userNote || "");
    }, [movie.userNote]);

    const handleNoteSave = () => {
        if (noteText !== movie.userNote) {
            updateMovieNote(movie.id, noteText);
        }
    };

    const handleMoveToWatched = () => {
        setIsClicked(true);
        addMovieToWatched(movie); 
    };

    const imgBase = "https://image.tmdb.org/t/p/w500";
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col md:flex-row border border-[#D2DCB6] h-auto md:h-64 relative group mb-6">
         {/* 1. SOL: Film Afişi */}
        <div className="w-full md:w-48 h-64 md:h-full flex-shrink-0 relative">   
            <Link to={`/movie/${movie.id}`}>
                <img 
                    src={movie.poster_path ? imgBase + movie.poster_path : "https://via.placeholder.com/500x750?text=Resim+Yok"} 
                    alt={movie.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
            </Link>         
            {/* IMDB Puanı */}
            <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                IMDB: {movie.vote_average ? movie.vote_average.toFixed(1) : "-"}
            </div>
            
        </div>

        {/* 2. ORTA: Film Bilgileri */}
        <div className="flex-1 p-5 flex flex-col justify-between border-r border-[#F1F3E0]">
            <div>
                <div className="flex items-start justify-between">
                    <h2 className="text-xl font-bold text-[#556650] leading-tight mb-1">
                       {movie.title || "Film Başlığı"}
                    </h2>
                </div>

                {/* Meta Bilgiler */}
                <div className="flex items-center text-xs text-[#778873] space-x-3 mb-3 font-medium">
                    <span className="bg-[#F1F3E0] px-2 py-1 rounded text-[#556650] border border-[#D2DCB6]">
                        {movie.release_date ? movie.release_date.split("-")[0] : "Yıl"}
                    </span>
                </div>

                <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                    {movie.overview || "Film açıklaması bulunamadı..."}
                </p>
            </div>
            
            {/* Alt Bilgi */}
            <div className="mt-4 pt-4 border-t border-[#F1F3E0] flex items-center justify-between">
                <Link to={`/movie/${movie.id}`} className="text-sm font-bold text-[#A1BC98] cursor-pointer hover:underline">
                    Detayları Gör →
                </Link>
            </div>
        </div>

        {/* --- SAĞ: KULLANICI PANELİ --- */}
        <div className="w-full md:w-72 bg-[#F9FAEF] p-5 flex flex-col gap-3 relative border-l border-[#D2DCB6]">
            
            {/* ÜST BUTON GRUBU (Silme ve Favori) */}
            <div className="absolute top-3 right-3 flex items-center gap-1">
                
                {/* 1. Favorilere Ekle Butonu */}
                <button 
                    onClick={toggleFavorite}
                    className={`p-2 rounded-full transition-all duration-200 hover:bg-red-50 ${
                        isFavorite
                        ? "text-red-500" 
                        : "text-[#A1BC98] hover:text-red-500"
                    }`} 
                    title={isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
                >
                    <FaHeart className="text-lg" />
                </button>

                {/* 2. Silme Butonu */}
                <button 
                    onClick={() => handleDelete(type)}
                    className="text-[#A1BC98] hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all duration-200" 
                    title="Listeden Sil"
                >
                    <FaTrash />
                </button>
            </div>

            {/* 1. YILDIZLA PUANLAMA ALANI */}
            {(type === "favorite" || type === "watched") && (
                <div className="mt-6 text-center">
                    <label className="text-xs font-bold text-[#A1BC98] uppercase tracking-wider block mb-2">Verdiğin Puan</label>
                    
                    {/* Yıldız Konteyneri */}
                    <div className="flex items-center justify-center gap-1">
                        {[...Array(10)].map((_, index) => {
                            const ratingValue = index + 1; 
                            
                            return (
                                <label key={index} className="cursor-pointer group relative">
                                    {/* Görünmez Radio Button (Mantık için) */}
                                    <input 
                                        type="radio" 
                                        name="rating" 
                                        value={ratingValue}
                                        className="hidden"
                                        onClick={() => updateMovieRating(movie.id, ratingValue)}
                                    />
                                    
                                    {/* Yıldız İkonu */}
                                    <FaStar 
                                        className={`text-lg transition-all duration-200 ${
                                            ratingValue <= (movie.userRating || 0) 
                                                ? "text-yellow-400 scale-110" 
                                                : "text-gray-300 hover:text-yellow-200"
                                        }`} 
                                    />
                                </label>
                            );
                        })}
                    </div>
                    
                    {/* Sayısal Gösterge */}
                    <div className="mt-2 text-sm font-bold text-[#556650]">
                        {movie.userRating ? `${movie.userRating} / 10` : "Puanla"}
                    </div>
                </div>
            )}

            {/* 2. NOT ALANI */}
            <div className={`flex-1 flex flex-col ${type === "watching" ? "mt-8" : "mt-2"}`}>
                <label className="text-xs font-bold text-[#A1BC98] uppercase tracking-wider block mb-1">Film Notun</label>
                
                <div className="bg-white border border-[#D2DCB6] rounded-lg p-2 shadow-sm h-full relative group/edit focus-within:border-[#778873] transition-colors">
                    
                    {/* Textarea */}
                    <textarea 
                        className="w-full h-full resize-none text-sm text-gray-600 italic bg-transparent focus:outline-none p-1 placeholder:text-gray-300"
                        placeholder="Not eklemek için tıkla..."
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        onBlur={handleNoteSave} 
                        maxLength={200} 
                    />

                    {/* Kalem İkonu */}
                    <div className="absolute bottom-2 right-2 text-[#778873] opacity-50 pointer-events-none">
                        <FaPen size={12} />
                    </div>
                </div>
            </div>

            {/* İZLENECEK BUTONU  */}
            {type === "watching" && (
                <div className="mt-4">
                    <button  
                            onClick={handleMoveToWatched} 
                            className={`w-full group relative flex items-center justify-center gap-2 border font-bold py-3 rounded-xl transition-all shadow-sm hover:shadow-md
                            ${isWatched
                                ? "bg-[#556650] text-white border-[#556650]"  
                                : "bg-white text-[#778873] border-[#778873] hover:bg-[#778873] hover:text-white" 
                            }`}
                    >
                        <FaCheck className="text-lg" />
                        <span>İzledim Olarak İşaretle</span>
                    </button>
                </div>
            )}

        </div>       
    </div>
  );
}

export default ListMovieCard;