import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FavoritesContext } from "../App";

const FavoritePage = ({ navigation }) => {
  const { favoriteMovies, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext); // השימוש בהוקס-קונטקסט FavoritesContext

  const handleMoviePress = (item) => {
    // מעבר למסך הסרט בלחיצה על סרט מועדף
    navigation.navigate("MovieDetails", {
      movie: item,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Favorite Movies</Text>
      {favoriteMovies.length === 0 ? (
        <Text style={styles.emptyText}>No favorite movies yet.</Text>
      ) : (
        <FlatList
          data={favoriteMovies}
          renderItem={({ item }) => (
            <View style={styles.favoriteItem}>
              <View style={styles.movieDetailsContainer}>
                <Text style={styles.movieTitle}>{item.Title}</Text>
                <Text style={styles.movieYear}>{item.Year}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeFromFavorites(item.imdbID)}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={() => handleMoviePress(item)}
                  >
                    <Text style={styles.detailsButtonText}>Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.imdbID}
        />
      )}
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
  emptyText: {
    fontSize: 18,
    color: "gray",
  },
  favoriteItem: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 16,
  },
  movieDetailsContainer: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  movieYear: {
    color: "gray",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  removeButton: {
    backgroundColor: "#e74c3c",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    margin: 4,
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  detailsButton: {
    backgroundColor: "#158576",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    margin: 4,
  },
  detailsButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default FavoritePage;
