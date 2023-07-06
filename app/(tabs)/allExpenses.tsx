import React, { useContext } from "react";
import { View } from "react-native";
import ExpensesOutput from "../../components/ExpensesOutput";
import { Expense } from "../../types/Expense";
import {
  ExpenseContext
} from "../../context/ExpenseContext";

export default function AllExpenses() {
  const { expenses }: { expenses: Expense[]; } =
    useContext(ExpenseContext);

  return (
    <View>
      <ExpensesOutput expenses={expenses} periodName="Total" fallbackText="No expenses found. Maybe add one?" />
    </View>
  );
}
