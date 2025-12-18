import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { Calendar, MapPin, User, Film } from "lucide-react";
import MovieCard from "./Card/MovieCard";

function ActorDetail() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchPerson = async () => {
      try {
        const response = await api.get(`/person/${id}`, {
          params: {
            append_to_response: "movie_credits",
          }
        });
        setPerson(response.data);
      } catch (error) {
        console.log("Oyuncu detay hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex justify-center items-center text-[#778873] font-bold text-xl">
        Yükleniyor...
    </div>
  );

  if (!person) return <div className="text-center p-10">Oyuncu bulunamadı.</div>;

  const profileBase = "https://image.tmdb.org/t/p/h632"; // Yüksek kalite portre
  
  // Filmleri popülerliğe göre sıralayalım (En popüler en başta)
  const movies = person.movie_credits?.cast?.sort((a, b) => b.popularity - a.popularity) || [];

  return (
    <div className="min-h-screen bg-[#F1F3E0] py-10">
      <div className="container mx-auto px-6">
        
        {/* --- 1. OYUNCU KARTI --- */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-[#D2DCB6] p-6 md:p-10 flex flex-col md:flex-row gap-10">
            
            {/* SOL: Profil Fotoğrafı */}
            <div className="w-full md:w-[300px] shrink-0">
                <img 
                    src={person.profile_path ? profileBase + person.profile_path : "https://via.placeholder.com/300x450?text=Resim+Yok"} 
                    alt={person.name} 
                    className="w-full rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 object-cover"
                />
            </div>

            {/* SAĞ: Bilgiler */}
            <div className="flex-1 flex flex-col justify-center">
                <h1 className="text-4xl md:text-5xl font-black text-[#556650] mb-4">
                    {person.name}
                </h1>

                {/* İstatistikler */}
                <div className="flex flex-wrap gap-4 mb-8">
                    {person.birthday && (
                        <div className="flex items-center gap-2 bg-[#F1F3E0] px-4 py-2 rounded-xl text-[#556650] font-bold border border-[#D2DCB6]">
                            <Calendar className="w-5 h-5 text-[#778873]" />
                            {person.birthday.split("-").reverse().join(".")}
                        </div>
                    )}
                    {person.place_of_birth && (
                        <div className="flex items-center gap-2 bg-[#F1F3E0] px-4 py-2 rounded-xl text-[#556650] font-bold border border-[#D2DCB6]">
                            <MapPin className="w-5 h-5 text-[#778873]" />
                            {person.place_of_birth}
                        </div>
                    )}
                    <div className="flex items-center gap-2 bg-[#F1F3E0] px-4 py-2 rounded-xl text-[#556650] font-bold border border-[#D2DCB6]">
                        <User className="w-5 h-5 text-[#778873]" />
                        {person.known_for_department === "Acting" ? "Oyuncu" : person.known_for_department}
                    </div>
                </div>

                {/* Biyografi */}
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-[#A1BC98] uppercase tracking-wider mb-2">Biyografi</h3>
                    <p className="text-[#2b3628] leading-relaxed text-lg max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                        {person.biography || "Bu oyuncu için biyografi bilgisi bulunmuyor."}
                    </p>
                </div>
            </div>
        </div>

        {/* --- 2. OYNADIĞI FİLMLER (Filmografisi) --- */}
        {movies.length > 0 && (
            <div className="mt-8">
                <h3 className="text-2xl font-bold text-[#556650] mb-6 flex items-center gap-2 px-2">
                    <Film /> Oynadığı Filmler ({movies.length})
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                        // MovieCard bileşenini burada tekrar kullanıyoruz
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        )}

      </div>
    </div>
  );
}

export default ActorDetail;