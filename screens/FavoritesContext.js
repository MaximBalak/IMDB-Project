import { createContext, useState } from "react";

// יצירת ההקשר (Context) עם createContext()
const FavoritesContext = createContext();

// יצירת ספק ההקשר (Context Provider)
const FavoritesProvider = ({ children }) => {
  // הגדרת משתנה לקבלת הסרטים המועדפים, ופונקציות להוספה והסרה מהמועדפים
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // פונקציה להוספת סרט לרשימת המועדפים
  const addToFavorites = (movie) => {
    // בודקים אם הסרט כבר קיים ברשימת המועדפים
    if (!favoriteMovies.some((favMovie) => favMovie.imdbID === movie.imdbID)) {
      // אם הסרט לא קיים - מוסיפים אותו לרשימה בעזרת הפונקציה setFavoriteMovies
      setFavoriteMovies((prevFavorites) => [...prevFavorites, movie]);
    }
  };

  // פונקציה להסרת סרט מרשימת המועדפים לפי imdbID
  const removeFromFavorites = (imdbID) => {
    // נעדכן את רשימת המועדפים ונסיר את הסרט על פי ה־imdbID שלו
    setFavoriteMovies((prevFavorites) =>
      prevFavorites.filter((movie) => movie.imdbID !== imdbID)
    );
  };
  const favoritesContextValue = {
    favoriteMovies,
    addToFavorites,
    removeFromFavorites,
  };

  return (
    // יצירת ההקשר באמצעות קונטקסט
    <FavoritesContext.Provider value={favoritesContextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesContext, FavoritesProvider };
