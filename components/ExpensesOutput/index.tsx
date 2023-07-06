import { View, StyleSheet, Text } from "react-native";
import { useMemo } from "react";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import React from "react";
import { Expense } from "../../types/Expense";
import Colors from "../../constants/Colors";

export default function ExpensesOutput({
  expenses,
  periodName,
  fallbackText,
}: {
  expenses: Expense[];
  periodName: string;
  fallbackText: string;
}) {
  // to calculate the total amount of every update of the expenses array
  const total: number = useMemo(() => {
    return expenses.reduce((acc, curr) => acc + curr.amount, 0);
  }, [expenses]);

  let content = (
    <Text style={styles.infoText}>{fallbackText}</Text>
  );

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={periodName} total={total.toFixed(2)} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.primary700,
    height: "100%",
  },
  infoText: {
    paddingVertical: 20,
    color: "white",
    fontSize: 22,
    textAlign: "center",
  },
});
