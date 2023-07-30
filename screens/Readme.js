import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Readme = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>README</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>Maxim</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Last Name:</Text>
        <Text style={styles.value}>Balak</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Faculty:</Text>
        <Text style={styles.value}>Software Engineer</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Teacher:</Text>
        <Text style={styles.value}>Tom S.</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>Maximbalak@gmail.com</Text>
      </View>
    </View>
  );
};

export default Readme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginRight: 10,
  },
  value: {
    flex: 1,
  },
});
