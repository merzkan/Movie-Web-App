function Footer() {
  return (
    <footer className="bg-[#A1BC98] text-[#1a2318] pt-10 pb-6 mt-20 border-t border-[#778873]/20">
      <div className="container mx-auto gap">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Sol Taraf: Logo ve Açıklama */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold tracking-tighter mb-2">MOVİE</h2>
            <p className="text-sm text-[#2b3628] max-w-xs opacity-80">
              En güncel film ve dizi verilerine kolayca ulaşın, listenizi oluşturun.
            </p>
          </div>

          {/* Orta: TMDB Logosu ve Yasal Metin*/}
          <div className="flex flex-col items-center gap-2">
            <img 
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" 
              alt="TMDB Logo" 
              className="h-4 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
            <p className="text-[10px] text-[#2b3628] text-center max-w-[250px] font-medium opacity-70">
              This product uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
          </div>
        </div>

        {/* Alt Çizgi ve Telif Hakkı */}
        <div className="border-t border-[#778873]/20 mt-8 pt-6 text-center">
          <p className="text-xs text-[#2b3628] font-semibold opacity-60">
            &copy; {new Date().getFullYear()} MovieApp. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;