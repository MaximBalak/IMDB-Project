import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState("");

  const navigation = useNavigation();

  const handleResetPassword = () => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setResetSent(true);
        setResetError("");
      })
      .catch((error) => {
        setResetSent(false);
        setResetError(error.message);
      });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/originals/ff/da/10/ffda10aa3f4eaf6a09872ab83f54951e.jpg",
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password</Text>
        {resetSent ? (
          <>
            <Text style={styles.successText}>
              Password reset email sent to {email}
            </Text>
            <TouchableOpacity onPress={handleGoBack} style={styles.button}>
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.errorText}>{resetError}</Text>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={handleResetPassword}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ImageBackground>
  );
};

export default ForgotPasswordScreen;

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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  input: {
    backgroundColor: "yellow",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 55,
    marginTop: 7,
    width: "80%",
  },
  button: {
    backgroundColor: "#158576",
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  successText: {
    color: "white",
    fontSize: 16,
    marginTop: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 20,
  },
});
