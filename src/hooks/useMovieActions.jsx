import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const useMovieActions = (movie) => {
  const {
    addMovieToFavorites, removeMovieFromFavorites,
    addMovieToWatchlist, removeMovieFromWatchlist,
    addMovieToWatched, removeMovieFromWatched,
    favorites, watchlist, watched,
    updateMovieRating, updateMovieNote
  } = useContext(GlobalContext);

  // Gelen film objesi bazen boş olabilir, güvenli ID alalım
  const currentId = Number(movie?.id);

  // Listelerde var mı kontrolü
  const isFavorite = !!favorites.find((o) => o.id === currentId);
  const isWatchlist = !!watchlist.find((o) => o.id === currentId);
  const isWatched = !!watched.find((o) => o.id === currentId);

  // --- FONKSİYONLAR ---

  const toggleFavorite = () => {
    if (isFavorite) removeMovieFromFavorites(currentId);
    else addMovieToFavorites(movie);
  };

  const toggleWatchlist = () => {
    if (isWatchlist) {
      removeMovieFromWatchlist(currentId);
    } else {
      addMovieToWatchlist(movie);
      if (isWatched) removeMovieFromWatched(currentId);
    }
  };

  const toggleWatched = () => {
    if (isWatched) {
      removeMovieFromWatched(currentId);
    } else {
      addMovieToWatched(movie);
      if (isWatchlist) removeMovieFromWatchlist(currentId);
    }
  };

  const handleDelete = (type) => {
    if (type === "favorite") removeMovieFromFavorites(currentId);
    if (type === "watching") removeMovieFromWatchlist(currentId);
    if (type === "watched") removeMovieFromWatched(currentId);
  };

  return {
    isFavorite,
    isWatchlist,
    isWatched,
    toggleFavorite,
    toggleWatchlist,
    toggleWatched,
    handleDelete,
    updateMovieRating,
    updateMovieNote,
    addMovieToWatched
  };
};