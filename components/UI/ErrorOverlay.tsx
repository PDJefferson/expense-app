import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";
import React from "react";
import Colors from "../../constants/Colors";

export default function ErrorOverlay({
  message,
  onConfirm,
}: {
  message: string;
  onConfirm: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>An error occurred!</Text>
      <Text style={styles.message}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maringtop: 0,
    marginBottom: 0,
    paddingBottom: 0,
    paddingTop: 0,
    backgroundColor: Colors.primary800,
    alignContent: "center",
    justifyContent: "center",
    gap: 40,
    paddingHorizontal: 24,
  },
  title: {
    fontWeight: "bold",
    alignContent: "center",
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
  message: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
});
