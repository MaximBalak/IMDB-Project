import React, { createContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import RegisterPage from "./screens/RegisterScreen";
import Readme from "./screens/Readme";
import HomePage from "./screens/HomePage";
import MovieDetails from "./screens/MovieDetails";
import FavoritePage from "./screens/FavoritePage";

const Stack = createNativeStackNavigator();

export const FavoritesContext = createContext({
  favoriteMovies: [],
  addToFavorites: (movie) => {},
  removeFromFavorites: (imdbID) => {},
});

export default function App() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const addToFavorites = (movie) => {
    if (!favoriteMovies.some((favMovie) => favMovie.imdbID === movie.imdbID)) {
      setFavoriteMovies((prevFavorites) => [...prevFavorites, movie]);
    }
  };

  const removeFromFavorites = (imdbID) => {
    setFavoriteMovies((prevFavorites) =>
      prevFavorites.filter((movie) => movie.imdbID !== imdbID)
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favoriteMovies, addToFavorites, removeFromFavorites }}
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name="RegisterPage" component={RegisterPage} />
          <Stack.Screen name="Readme" component={Readme} />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="MovieDetails" component={MovieDetails} />
          <Stack.Screen name="FavoritePage" component={FavoritePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesContext.Provider>
  );
}
