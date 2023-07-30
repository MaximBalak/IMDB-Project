import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const handleReadmePage = () => {
    navigation.navigate("Readme");
  };

  const handleToTheProject = () => {
    navigation.navigate("HomePage");
  };

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/originals/ff/da/10/ffda10aa3f4eaf6a09872ab83f54951e.jpg",
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text>Email connected: {auth.currentUser?.email}</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>SIGN OUT</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReadmePage} style={styles.button}>
          <Text style={styles.buttonText}>README PAGE</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToTheProject} style={styles.button}>
          <Text style={styles.buttonText}>TO THE PROJECT</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#158576",
    width: "100%",
    padding: 15,
    alignItems: "center",
    borderRadius: 55,
    marginTop: 5,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#158576",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
