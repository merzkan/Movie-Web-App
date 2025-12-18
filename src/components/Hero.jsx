function Hero() {
  return (
    <div className="relative h-[400px] md:h-[500px] w-full mb-6">
      
      <div className="absolute inset-0">
        <img 
            src="https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg" 
            alt="Hero Movie" 
            className="w-full h-full object-cover"
        />
      </div>

      {/* 2. GRADYAN PERDE  */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#F1F3E0] via-black/20 to-transparent"></div>

      {/* 3. İÇERİK (Slogan) */}
      <div className="absolute inset-0 flex flex-col justify-end items-center pb-12 px-6 text-center">
        
        <p className="text-white text-2xl md:text-4xl font-bold drop-shadow-xl max-w-4xl leading-relaxed">
            Sinemanın büyülü dünyasını keşfet. <br />
            <span className="text-[#778873] font-medium text-lg md:text-2xl mt-2 block">
                Aradığın tüm filmler, diziler ve oyuncular tek bir yerde.
            </span>
        </p>

      </div>

    </div>
  )
}

export default Hero;