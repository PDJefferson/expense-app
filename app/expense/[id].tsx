import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import React, { useContext, useState, useEffect } from "react";
import { useSearchParams } from "expo-router";
import { ExpenseContext } from "../../context/ExpenseContext";
import IconButton from "../../components/UI/IconButton";
import Colors from "../../constants/Colors";

import ExpenseForm from "../../components/ExpenseForm";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
export default function manageExpense() {
  const { id } = useSearchParams();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { expenses, deleteExpense, updateExpense } = useContext(ExpenseContext);
  const expense = expenses.find((expense) => expense.id === id);
  const route = useRouter();

  async function deletePressHandler() {
    try {
      setIsFetching(true);
      await deleteExpense(expense?.id as string);
      route.back();
    } catch (error: any) {
      setIsFetching(false);
      setError(error.message || "Something went wrong");
    } finally {
      setIsFetching(false);
    }
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  if (error) {
    return (
      <ErrorOverlay
        message={error}
        onConfirm={() => {
          setError(null);
          route.back();
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        expense={expense}
        optionChoice="Update"
        optionPressHandler={updateExpense}
      />
      <View style={styles.deleteContainer}>
        <IconButton
          icon="trash"
          color={Colors.error500}
          size={36}
          onPress={deletePressHandler}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary800,
    padding: 24,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: Colors.primary200,
    alignItems: "center",
  },
});
