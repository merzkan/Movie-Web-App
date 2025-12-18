import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    const [favorites, setFavorites] = useState(
        localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : []
    );
    const [watchlist, setWatchlist] = useState(
        localStorage.getItem("watchlist") ? JSON.parse(localStorage.getItem("watchlist")) : []
    );
    const [watched, setWatched] = useState(
        localStorage.getItem("watched") ? JSON.parse(localStorage.getItem("watched")) : []
    );

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }, [watchlist]);

    useEffect(() => {
        localStorage.setItem("watched", JSON.stringify(watched));
    }, [watched]);

    const addMovieToFavorites = (movie) => {
        const storedMovie = favorites.find((o) => o.id === movie.id);
        if (!storedMovie) {
            setFavorites([...favorites, movie]);
        }
    };
    const removeMovieFromFavorites = (id) => {
        setFavorites(favorites.filter((movie) => movie.id !== id));
    };
    //izlecekler listesi
    const addMovieToWatchlist = (movie) => {
        const storedMovie = watchlist.find((o) => o.id === movie.id);
        if (!storedMovie) {
            setWatchlist([...watchlist, movie]);
        }
    };
    //İzlendi Listesine Ekleme (ve Watchlist'ten düşme)
    const addMovieToWatched = (movie) => {
        const storedMovie = watched.find((o) => o.id === movie.id);
        if (!storedMovie) {
            setWatched([...watched, movie]);
            setWatchlist(watchlist.filter((o) => o.id !== movie.id));
        }
    };

    // E. Listelerden Silme Fonksiyonları (Diğer sayfalar için)
    const removeMovieFromWatchlist = (id) => setWatchlist(watchlist.filter(movie => movie.id !== id));
    const removeMovieFromWatched = (id) => setWatched(watched.filter(movie => movie.id !== id));

    const updateMovieRating = (id, rating) => {
        const updatedFavorites = favorites.map((movie) => 
            movie.id === id ? { ...movie, userRating: rating } : movie
        );
        setFavorites(updatedFavorites);

        const updatedWatched = watched.map((movie) => 
            movie.id === id ? { ...movie, userRating: rating } : movie
        );
        setWatched(updatedWatched);
    }

    const updateMovieNote = (id, note) => {
        const updatedFavorites = favorites.map((movie) => 
            movie.id === id ? { ...movie, userNote: note } : movie
        );
        setFavorites(updatedFavorites);

        const updatedWatched = watched.map((movie) => 
            movie.id === id ? { ...movie, userNote: note } : movie
        );
        setWatched(updatedWatched);
        
        const updatedWatchlist = watchlist.map((movie) => 
            movie.id === id ? { ...movie, userNote: note } : movie
        );
        setWatchlist(updatedWatchlist);
    };

    const value = {
        favorites,
        watchlist,
        watched,
        addMovieToFavorites,
        removeMovieFromFavorites,
        addMovieToWatchlist,
        removeMovieFromWatchlist,
        addMovieToWatched,
        removeMovieFromWatched,
        updateMovieRating,
        updateMovieNote
    };
  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );

};