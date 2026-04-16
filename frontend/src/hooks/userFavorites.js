import { useEffect, useState } from "react";

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("fav")) || [];
    setFavorites(saved);
  }, []);

  const toggleFavorite = (ad) => {
    let updated;

    if (favorites.find(f => f._id === ad._id)) {
      updated = favorites.filter(f => f._id !== ad._id);
    } else {
      updated = [...favorites, ad];
    }

    setFavorites(updated);
    localStorage.setItem("fav", JSON.stringify(updated));
  };

  const isFavorite = (id) => {
    return favorites.some(f => f._id === id);
  };

  return { favorites, toggleFavorite, isFavorite };
}
