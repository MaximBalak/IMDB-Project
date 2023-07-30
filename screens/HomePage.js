import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const API_KEY = "1657ca8e";

const HomePage = () => {
   // הגדרת משתנים באמצעות useState
  const [searchQuery, setSearchQuery] = useState("");//חיפוש עצמו
  const [searchResults, setSearchResults] = useState([]);// הצגת החיפוש
  const [topMovies, setTopMovies] = useState([]);//הצגת הסרטים הטובים ביותר
  const [topDramaMovies, setTopDramaMovies] = useState([]);//הצגת סרטי הדרמה הטובים ביותר
  const [topFantasyMovies, setTopFantasyMovies] = useState([]);//  הצגת סרטי הפנטזיה הטובים ביותר 
  const [isSearchMode, setIsSearchMode] = useState(false);//  סטטוס של מצב חיפוש על 'בוליאן' על מנת שלא היה באגים,ולאחר לחיצה ,היה אופציה לחפש
  const [favoriteMovies, setFavoriteMovies] = useState([]);// הצגת הסרטים אהובים אליך
  const navigation = useNavigation();//נאביגציה עצמה

  useEffect(() => {
    fetchTopMovies();
    fetchTopDramaMovies();
    fetchTopFantasyMovies();
  }, []);


  const fetchTopMovies = async () => {//   // . פונקציה לשליפת רשימת הסרטים הפופולריים ביותר
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=movie&type=movie&r=json&page=1`
      );
      console.log("Top Movies Response:", response.data);
      setTopMovies(response.data.Search);
    } catch (error) {
      console.log(error);
    }
  };

  
  const fetchTopDramaMovies = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=drama&type=movie&r=json&page=1`
      );
      console.log("Top Drama Movies Response:", response.data);
      setTopDramaMovies(response.data.Search);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTopFantasyMovies = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=fantasy&type=movie&r=json&page=1`
      );
      console.log("Top Fantasy Movies Response:", response.data);
      setTopFantasyMovies(response.data.Search);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {// פונקציה לחיפוש סרטים לפי שם

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}&type=movie&r=json&page=1`
      );
      console.log("Search Response:", response.data);
      setSearchResults(response.data.Search);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMoviePress = (item) => {// פונקציה להצגת דף הסרט

    navigation.navigate("MovieDetails", {
      movie: item,
    });
  };

  const toggleSearchMode = () => {// פונקציה להחלפת מצב חיפוש/הצגת סרטים פופולריים

    setIsSearchMode((prevMode) => !prevMode);
  };

  const addToFavorites = (movie) => { // פונקציה להוספת סרט לרשימת המועדפים
    if (!favoriteMovies.some((favMovie) => favMovie.imdbID === movie.imdbID)) {
      setFavoriteMovies((prevFavorites) => [...prevFavorites, movie]);
    }
  };

  const handleFavoritePagePress = () => {// פונקציה למעבר לדף המועדפים
    navigation.navigate("FavoritePage", {
      addToFavorites: addToFavorites,
    });
  };

  const renderMovieItem = ({ item }) => ( // פונקצית עזר להצגת כל פריט ברשימת הסרטים
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => handleMoviePress(item)}
    >
      <Image source={{ uri: item.Poster }} style={styles.moviePoster} />
      <View style={styles.movieDetails}>
        <Text style={styles.movieTitle}>{item.Title}</Text>
        <Text style={styles.movieYear}>{item.Year}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>IMDB-MAX</Text>
        <View style={styles.searchContainer}>
          {!isSearchMode ? (
            <TouchableOpacity
              style={styles.searchButton}
              onPress={toggleSearchMode}
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TextInput
                style={styles.searchInput}
                placeholder="Search for a movie..."
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />
              <TouchableOpacity
                style={styles.searchButton}
                onPress={handleSearch}
              >
                <Text style={styles.searchButtonText}>Go</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {isSearchMode && (
          <>
            <Text style={styles.heading}>Search Results</Text>
            <FlatList
              horizontal
              data={searchResults}
              renderItem={renderMovieItem}
              keyExtractor={(item) => item.imdbID}
              contentContainerStyle={styles.movieListContainer}
            />
          </>
        )}

        <Text style={styles.heading}>Top Movies</Text>
        <FlatList
          horizontal
          data={topMovies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.imdbID}
          contentContainerStyle={styles.movieListContainer}
        />

        <Text style={styles.heading}>Top Drama Movies</Text>
        <FlatList
          horizontal
          data={topDramaMovies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.imdbID}
          contentContainerStyle={styles.movieListContainer}
        />

        <Text style={styles.heading}>Dimension World And Fantasy Movies</Text>
        <FlatList
          horizontal
          data={topFantasyMovies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.imdbID}
          contentContainerStyle={styles.movieListContainer}
        />

        <TouchableOpacity
          style={styles.favoritePageButton}
          onPress={handleFavoritePagePress}
        >
          <Text style={styles.favoritePageButtonText}>Favorites</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  scrollContainer: {
    alignItems: "center",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: "#158576",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  searchButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  movieListContainer: {
    paddingBottom: 8,
  },
  movieItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginRight: 8,
  },
  moviePoster: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  movieDetails: {
    marginTop: 8,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  movieYear: {
    color: "gray",
  },
  favoritePageButton: {
    backgroundColor: "#158576",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  favoritePageButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HomePage;
