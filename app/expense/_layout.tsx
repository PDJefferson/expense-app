import React, { useContext } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { ExpenseContext } from "../../context/ExpenseContext";
import Colors from "../../constants/Colors";
export default function ExpenseLayout() {
  const { expenses } = useContext(ExpenseContext);
  const { id } = useLocalSearchParams();
  const title: string =
    expenses.find((expense) => expense.id === id)?.title ?? "";

  return (
    <Stack
      screenOptions={{
        headerTitle: "Expenses Overview",
        title: "Tab Layout",
        headerStyle: {
          backgroundColor: Colors.primary500,
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          presentation: "modal",
          title: `Edit ${title} expense` as string,
          headerTitle: `Edit ${title} expense` as string,
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          presentation: "modal",
          title: "Add a Expense",
          headerTitle: "Add a Expense",
        }}
      />
    </Stack>
  );
}
