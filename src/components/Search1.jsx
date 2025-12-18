import { FaSearch } from "react-icons/fa";

function Search1({ value, onChange }) {
  return (
      <div className="w-full max-w-xl mx-auto px-4 m-6">
        
        <div className="flex items-center bg-[#D2DCB6] rounded-full shadow-md px-5 py-3 transition-all duration-300 focus-within:shadow-xl focus-within:ring-2 focus-within:ring-[#778873] focus-within:scale-105 border border-[#D2DCB6]">
            
            {/* Input Alanı */}
            <input 
                type="text" 
                placeholder="Listelerinde ara..." 
                className="bg-transparent w-full outline-none text-[#556650] placeholder-[#778873]/60 font-medium text-base ml-2"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />

            {/* Arama İkonu */}
            <button className="text-[#778873] hover:text-white bg-white/20 hover:bg-[#778873] rounded-full p-2 transition-all duration-200">
                <FaSearch size={16} />
            </button>

        </div>

      </div>
  );
}

export default Search1;