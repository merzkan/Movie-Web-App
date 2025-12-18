import ListMovieCard from "../components/Card/ListMovieCard";
import Search1 from "../components/Search1";
import { useContext,useState } from "react";
import { GlobalContext } from "../context/GlobalState";

function Watched() {
  const { watched } = useContext(GlobalContext);
  const [query, setQuery] = useState("");

  const filteredWatched = watched.filter((movie)=>
    movie.title.toLocaleLowerCase('tr').includes(query.toLocaleLowerCase('tr'))
  );
  
  return (
    <div className="container mx-auto px-4 pb-20">
      
      {/* Üst Kısım: Arama */}
      <Search1 value={query} onChange={setQuery} />


      <div className="max-w-5xl mx-auto">
        
        {/* Başlık ve Butonlar */}
         <div className="flex flex-col md:flex-row items-end md:items-center justify-between mb-8 gap-4">
            <div className="w-full md:w-auto">
                <h1 className="text-3xl font-bold text-[#556650] flex items-center gap-2">
                    İzlediklerim
                    <span className="bg-[#D2DCB6] text-[#556650] text-sm px-3 py-1 rounded-full">{filteredWatched.length}</span>
                </h1>
                <p className="text-[#778873] mt-1 text-sm">
                    İzlediğiniz filmlerin listesi.
                </p>
            </div>
        </div>
        {/* LİSTELEME ALANI */}
        <div className="space-y-6">
            {filteredWatched.length === 0 ? (
                  <div className="text-center py-10 text-[#778873]">
                      {watched.length === 0 
                        ? "Listeniz henüz boş. Ana sayfadan ekleme yapabilirsiniz." 
                        : "Aradığınız kriterlere uygun film bulunamadı."}
                  </div>
              ) : (
                filteredWatched.map((movie) => (
                    <ListMovieCard key={movie.id} movie={movie} type="watched"/>
                ))
              )}
        </div>

      </div>
    </div>
  )
}

export default Watched;