import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
export default function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary800,
    alignContent: "center",
    justifyContent: "center",
    padding: 24,
  },
});
