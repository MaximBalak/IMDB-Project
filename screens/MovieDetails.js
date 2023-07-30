import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FavoritesContext } from "../App";
import axios from "axios";

const API_KEY = "1657ca8e";

const MovieDetails = ({ route, navigation }) => {
  const { movie } = route.params;
  const { addToFavorites } = useContext(FavoritesContext);

  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      // קריאה לפונקציה 'פאטץ סרטים' שמשהיא עושה היא לוקחת את הקוד שלנו ואת קוד הסרט
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}&plot=full&r=json`
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovieDetails();
  }, [movie.imdbID]);

  const handleAddToFavorites = () => {
    // פונקציה שמטפלת ב שמירת סרטים לתוך עמוד אה 'אהובים' שלנו
    addToFavorites(movie);
  };

  React.useLayoutEffect(() => {
    // פונקציה עם הגדרת הכתפור והפעולה שמוספיה בעצם את הסרט עצמו לעמוד עם השימוש של הפונקציה מעל
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.addToFavoritesButton}
          onPress={handleAddToFavorites}
        >
          <Text style={styles.addToFavoritesButtonText}>Add to Favorites</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, addToFavorites, movie]);

  if (!movieDetails) {
    // אם פרטי הסרט עדיין לא נטענו מהשרת, נציג הודעת של 'המתן' בעמוד
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Movie Details</Text>
      <Text style={styles.movieTitle}>{movieDetails.Title}</Text>
      <Text style={styles.movieYear}>{movieDetails.Year}</Text>
      <Text style={styles.moviePlot}>{movieDetails.Plot}</Text>
      <Text style={styles.movieRating}>
        IMDb Rating: {movieDetails.imdbRating}
      </Text>
      <Text style={styles.movieCast}>Cast: {movieDetails.Actors}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  movieYear: {
    color: "gray",
    marginBottom: 16,
  },
  moviePlot: {
    fontSize: 16,
    marginBottom: 16,
  },
  addToFavoritesButton: {
    backgroundColor: "#158576",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addToFavoritesButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MovieDetails;
