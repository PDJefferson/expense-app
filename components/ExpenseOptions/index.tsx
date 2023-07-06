import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Button from "../UI/Button";

export default function ExpenseOptions({
  option,
  cancelPressHandler,
  optionPressHandler,
}: {
  option: string;
  cancelPressHandler: () => void;
  optionPressHandler: () => void;
}) {
  return (
    <View style={styles.buttonContainer}>
      <Button mode="flat" onPress={cancelPressHandler} style={styles.button}>
        Cancel
      </Button>
      <Button onPress={optionPressHandler} style={styles.button}>
        {option}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 120,
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
