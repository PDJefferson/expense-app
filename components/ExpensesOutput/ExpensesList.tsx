import { FlatList } from "react-native";
import React from "react";
import { Expense } from "../../types/Expense";
import ExpenseItem from "./ExpenseItem";

export default function ExpensesList({ expenses }: { expenses: Expense[] }) {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => <ExpenseItem {...item} />}
      keyExtractor={(expense) => expense.id}
    />
  );
}