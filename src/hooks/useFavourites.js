import { useState, useEffect } from "react";

const FAVOURITES_KEY = "favouritePosts";

export const useFavourites = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const favouritesFromStorage = localStorage.getItem(FAVOURITES_KEY);
    if (favouritesFromStorage) {
      setFavourites(JSON.parse(favouritesFromStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (post) => {
    if (!favourites.some((favourite) => favourite.id === post.id)) {
      setFavourites([...favourites, post]);
    }
  };

  const removeFavourite = (postId) => {
    setFavourites(favourites.filter((post) => post.id !== postId));
  };

  const isFavourite = (postId) => {
    return favourites.some((post) => post.id === postId);
  };

  return { favourites, addFavourite, removeFavourite, isFavourite };
};
