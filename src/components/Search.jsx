import { FaSearch } from "react-icons/fa";
import { useState,useEffect,useRef} from "react";

function Search({onSearch}) {
  
    const[query, setQuery] = useState("");
    const isFirstRender = useRef(true);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
    if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
    }

    const timer = setTimeout(() => {
        onSearch(query); 
    }, 500);
    return () => clearTimeout(timer);
}, [query, onSearch]);

  return (
      <div className="relative w-full max-w-4xl mx-auto p-6 z-40">
        
        {/* Form yapısı ekliyoruz ki "Enter" tuşu çalışsın */}
        <form onSubmit={handleSubmit} className="flex items-center bg-[#D2DCB6] rounded-2xl shadow-lg px-6 py-4 transition-all focus-within:ring-4 focus-within:ring-[#D2DCB6]/50 border border-[#D2DCB6]">
            
            {/* Input */}
            <input 
                type="text" 
                placeholder="Film ara..." 
                className="bg-transparent w-full outline-none text-[#556650] placeholder-[#778873]/70 font-medium text-lg"
                value={query}
                onChange={(e) => setQuery(e.target.value)} 
            />

            {/* Arama Butonu */}
            <button type="submit" className="text-[#778873] hover:text-white transition-colors p-2 hover:scale-110 transform duration-200">
                <FaSearch size={22} />
            </button>

        </form>
      </div>
  );
}

export default Search;