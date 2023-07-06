import { View, StyleSheet } from "react-native";
import React, { useContext } from "react";
import Colors from "../../constants/Colors";
import { ExpenseContext } from "../../context/ExpenseContext";
import ExpenseForm from "../../components/ExpenseForm";
export default function AddExpense() {
  const { addExpense } = useContext(ExpenseContext);

  return (
    <View style={styles.container}>
      <ExpenseForm optionChoice="Add" optionPressHandler={addExpense} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary800,
    padding: 24,
  },
});
