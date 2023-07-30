import React, { useState } from "react";
import {
  ImageBackground,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import moment from "moment";
import { auth } from "../firebase";

{
  /* הגדרת דף ההרשמה כפונקציית ריאקט ויש
 בו משתנים מקומיים שמשמשים לשמירת הערכים
  של האימייל, הסיסמה, אימות הסיסמה,
 תאריך הלידה והשגיאה ברישום.*/
}
const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [error, setError] = useState("");

  {
    /* 
הפונקציה ,-חאנדל ריגיסטר-,  בודקת את נכונות התשומות שהזין המשתמש ומבצעת את הפעולות הדרושות אם הקלט נכון.
 נכשל, הוא זורק את השגיאה המתאימה ומבצע החזרה 
כדי לבטל את הפעולה. אם כל ההתאמות עוברות בהצלחה, הוא קורא לפעולות 
שמבצעות את,-חאנדל סיגן אפ- הרישום, ואז הוא מאפס את שדות הקלט ומכניס את השגיאה למחרוזת המתאימה להצלחת הרישום.*/
  }

  const handleRegister = () => {
    setError(""); // ניקוי שגיעה אחרונה

    // בדיקת איימל
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    // בדיקת סיסמה
    if (password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return;
    }

    // בדיקה עם הסימה תואמת לראשונה
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // בדיקת תאריך לידה
    const birthdateMoment = moment(birthdate, "DD/MM/YYYY", true);
    if (!birthdateMoment.isValid()) {
      setError("Please enter a valid birthdate in the format dd/mm/yyyy.");
      return;
    }

    const currentDate = moment();
    const minAgeDate = moment().subtract(18, "years");

    if (birthdateMoment.isAfter(currentDate)) {
      setError("Please enter a birthdate in the past.");
      return;
    }

    if (birthdateMoment.isAfter(minAgeDate)) {
      setError("You must be 18 years or older to register.");
      return;
    }

    handleSignUp(); // לאחר שהכול הסתיים קורא לפונצקיה שיוצרת משתמש ב-פיירבייס

    // איפוס הטקסטים בתוך המבנה
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setBirthdate("");
    setError("Registration successful!");
  };

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered email:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <ImageBackground
      source={{
        uri: "https://64.media.tumblr.com/f02d4919cb14712b3f5af38bcd1e69be/b10fccddda3e591f-ba/s1280x1920/f4a163a9e0fab46ebf638cefbb257943f915b935.png",
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Registration</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <View style={styles.birthdateContainer}>
          <Text style={styles.birthdateLabel}>Birthdate</Text>
          <TextInput
            style={styles.birthdateInput}
            placeholder="dd/mm/yyyy"
            value={birthdate}
            onChangeText={(text) => setBirthdate(text)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    backgroundColor: "yellow",
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  birthdateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  birthdateLabel: {
    marginRight: 10,
  },
  birthdateInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    backgroundColor: "yellow",
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#158576",
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default RegisterPage;
