  import { Link, NavLink } from "react-router-dom";
  import { FaHome, FaHeart, FaEye, FaCheckCircle } from "react-icons/fa"; 

  function Navbar() {
    // Aktif link stili (Hem mobil hem masaüstü için)
    const activeClass = "text-[#F1F3E0] bg-[#778873]"; // Aktifken koyu yeşil zemin, açık yazı
    const passiveClass = "text-[#778873] hover:text-[#556650]"; // Pasifken koyu yeşil yazı

    return (
      <>
        {/* --- 1. ÜST NAVBAR (Masaüstü ve Logo İçin) --- */}
        <nav className="bg-[#A1BC98] fixed w-full top-0 z-50 flex justify-between items-center h-16 px-6 shadow-md">
          
          {/* LOGO (Her zaman görünür) */}
          <Link to="/" className="text-[#778873] font-black text-2xl tracking-widest">
            MOVIE
          </Link>

          {/* MASAÜSTÜ MENÜ*/}
          <div className="hidden md:flex gap-6 font-bold text-base">
            <NavLink to="/" className={({isActive}) => isActive ? "text-white" : "text-[#778873] hover:text-white transition-colors"}>Anasayfa</NavLink>
            <NavLink to="/favorites" className={({isActive}) => isActive ? "text-white" : "text-[#778873] hover:text-white transition-colors"}>Favoriler</NavLink>
            <NavLink to="/watching" className={({isActive}) => isActive ? "text-white" : "text-[#778873] hover:text-white transition-colors"}>İzlenecek</NavLink>
            <NavLink to="/watched" className={({isActive}) => isActive ? "text-white" : "text-[#778873] hover:text-white transition-colors"}>İzlendi</NavLink>
          </div>

        </nav>

        {/* --- 2. ALT NAVBAR (Sadece Mobilde Görünür) --- */}
        <nav className="md:hidden fixed bottom-0 w-full bg-[#A1BC98] z-50 flex justify-around items-center h-16 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-[#8FA886]">
          
          <NavLink to="/" className={({isActive}) => `flex flex-col items-center p-2 rounded-lg transition-all ${isActive ? activeClass : passiveClass}`}>
              <FaHome size={20} />
              <span className="text-[10px] font-bold mt-1">Anasayfa</span>
          </NavLink>

          <NavLink to="/favorites" className={({isActive}) => `flex flex-col items-center p-2 rounded-lg transition-all ${isActive ? activeClass : passiveClass}`}>
              <FaHeart size={20} />
              <span className="text-[10px] font-bold mt-1">Favoriler</span>
          </NavLink>

          <NavLink to="/watching" className={({isActive}) => `flex flex-col items-center p-2 rounded-lg transition-all ${isActive ? activeClass : passiveClass}`}>
              <FaEye size={20} />
              <span className="text-[10px] font-bold mt-1">Listem</span>
          </NavLink>

          <NavLink to="/watched" className={({isActive}) => `flex flex-col items-center p-2 rounded-lg transition-all ${isActive ? activeClass : passiveClass}`}>
              <FaCheckCircle size={20} />
              <span className="text-[10px] font-bold mt-1">İzlendi</span>
          </NavLink>

        </nav>
      </>
    )
  }
  export default Navbar;