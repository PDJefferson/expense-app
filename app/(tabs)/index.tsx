import { View, StyleSheet } from "react-native";
import React, { useState, useContext, useMemo, useEffect } from "react";
import ExpensesOutput from "../../components/ExpensesOutput";
import { Expense } from "../../types/Expense";
import { ExpenseContext } from "../../context/ExpenseContext";
import { fetchExpenses } from "../../utils/http";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import ErrorOverlay from "../../components/UI/ErrorOverlay";

export default function Recent() {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { expenses, setExpenses } = useContext(ExpenseContext);
  const today = useMemo(() => new Date(), [expenses]);
  const lastWeek = useMemo(
    () => new Date(today.getFullYear(), today.getMonth(), today.getDay() - 7),
    [expenses]
  );
  const filteredExpenses = useMemo(
    () =>
      expenses.filter((expense: Expense) => {
        // get the year, month, and day of the expense
        const [year, month, day] = expense.date.split("-");
        const expenseDate = new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day)
        );
        return expenseDate >= lastWeek && expenseDate < today;
      }),
    [expenses]
  );

  useEffect(() => {
    //fetch data
    async function fetch() {
      try {
        setIsFetching(true);
        const expenses = await fetchExpenses();
        setIsFetching(false);

        setExpenses(expenses);
      } catch (error: any) {
        setError("The server is down!. please try again later");
        setIsFetching(false);
      }
    }

    fetch();

    return () => {};
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  } else if (error) {
    return (
      <ErrorOverlay
        message={error}
        onConfirm={() => {
          setError(null);
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ExpensesOutput
        expenses={filteredExpenses}
        periodName="Last 7 days"
        fallbackText="No Expenses found for the last 7 days"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
});
