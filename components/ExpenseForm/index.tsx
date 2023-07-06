import { View, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import React, { useState, useLayoutEffect } from "react";
import Input from "./Input";
import { Expense } from "../../types/Expense";
import { useReducer } from "react";
import ExpenseOptions from "../ExpenseOptions";
import Colors from "../../constants/Colors";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

interface ExpenseForm {
  id: string;
  title: { value: string; isValid: boolean };
  amount: { value: number; isValid: boolean };
  description: { value: string; isValid: boolean };
  date: { value: string; isValid: boolean };
}

const initialState: ExpenseForm = {
  id: Math.random().toString(),
  title: { value: "", isValid: true },
  amount: { value: 0, isValid: true },
  description: { value: "", isValid: true },
  date: { value: "", isValid: true },
};

const actionTypes = {
  TITLE_CHANGE: "TITLE_CHANGE",
  AMOUNT_CHANGE: "AMOUNT_CHANGE",
  DESCRIPTION_CHANGE: "DESCRIPTION_CHANGE",
  DATE_CHANGE: "DATE_CHANGE",
  UPDATE_EXPENSE: "UPDATE_EXPENSE",
  UPDATE_VALIDITY: "UPDATE_VALIDITY",
};

const reducerForm = (state: ExpenseForm, action: any) => {
  switch (action.type) {
    case actionTypes.TITLE_CHANGE:
      const title = { ...state.title };
      return { ...state, title: { ...title, value: action.payload } };
    case actionTypes.AMOUNT_CHANGE:
      const oldAmount = { ...state.amount };
      if (action.payload === "") {
        return { ...state, amount: { ...oldAmount, value: 0 } };
      }
      const amount = parseFloat(action.payload);
      return { ...state, amount: { ...oldAmount, value: amount } };
    case actionTypes.DESCRIPTION_CHANGE:
      const description = { ...state.description };
      return {
        ...state,
        description: { ...description, value: action.payload },
      };
    case actionTypes.DATE_CHANGE:
      const date = { ...state.date };
      return { ...state, date: { ...date, value: action.payload } };
    case actionTypes.UPDATE_EXPENSE:
      return { ...state, ...action.payload.expense };
    case actionTypes.UPDATE_VALIDITY:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default function ExpenseForm({
  expense,
  optionChoice,
  optionPressHandler,
}: {
  expense?: Expense;
  optionChoice: string;
  optionPressHandler: (expense: Expense) => void;
}) {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null | undefined>(undefined);
  const router = useRouter();
  const [expenseToUpdate, dispatch] = useReducer(
    reducerForm,
    (expense &&
      ({
        id: expense?.id,
        title: { value: expense?.title, isValid: true },
        amount: { value: expense?.amount, isValid: true },
        description: { value: expense?.description, isValid: true },
        date: { value: expense?.date, isValid: true },
      } as ExpenseForm)) ||
      initialState
  );

  useLayoutEffect(() => {
    if (expense && expense.id) {
      dispatch({
        type: actionTypes.UPDATE_EXPENSE,
        payload: {
          expense: {
            id: expense.id,
            title: { value: expense.title, isValid: true },
            amount: { value: expense.amount, isValid: true },
            description: { value: expense.description, isValid: true },
            date: { value: expense.date, isValid: true },
          } as ExpenseForm,
        },
      });
    }
  }, [expense]);

  function cancelPressHandler() {
    router.back();
  }

  async function formPressHandler() {
    const { title, amount, description, date, id } = expenseToUpdate;
    const newDate = new Date(date.value);
    const regex = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
    const dateIsValid: boolean =
      newDate.toString() !== "Invalid Date" && regex.test(date.value);
    const amountIsValid = amount.value > 0 && !isNaN(amount.value);
    const titleIsValid = title.value?.trim().length > 0;
    const descriptionIsValid = description.value?.trim().length > 0;

    if (
      !dateIsValid ||
      !amountIsValid ||
      !titleIsValid ||
      !descriptionIsValid
    ) {
      dispatch({
        type: actionTypes.UPDATE_VALIDITY,
        payload: {
          date: { value: date.value, isValid: dateIsValid },
          amount: { value: amount.value, isValid: amountIsValid },
          title: { value: title.value, isValid: titleIsValid },
          description: {
            value: description.value,
            isValid: descriptionIsValid,
          },
        },
      });
      return;
    }

    try {
      setIsFetching(true);
      await optionPressHandler({
        title: title.value,
        amount: amount.value,
        description: description.value,
        date: newDate.toISOString().slice(0, 10),
        id: expense?.id || Math.random().toString(),
      });
      router.back();
    } catch (error: any) {
      setIsFetching(false);
      setError(error?.message);
    } finally {
      setIsFetching(false);
    }
  }

  const isFormValid =
    expenseToUpdate.title.isValid &&
    expenseToUpdate.amount.isValid &&
    expenseToUpdate.description.isValid &&
    expenseToUpdate.date.isValid;

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
    <>
      <View style={styles.form}>
        <Text style={styles.title}> Your Expense </Text>
        <View style={styles.rowContainer}>
          <Input
            style={styles.rowInput}
            label="Title"
            invalid={!expenseToUpdate.title.isValid}
            texInputProps={{
              keyboardType: "default",
              placeholder: "Title",
              value: expenseToUpdate.title.value,
              onChangeText: (text) => {
                dispatch({ type: actionTypes.TITLE_CHANGE, payload: text });
              },
            }}
          />
          <Input
            label="Amount"
            invalid={!expenseToUpdate.amount.isValid}
            style={styles.rowInput}
            texInputProps={{
              keyboardType: "number-pad",
              value: expenseToUpdate.amount.value?.toString(),
              onChangeText: (text) => {
                dispatch({ type: actionTypes.AMOUNT_CHANGE, payload: text });
              },
            }}
          />
        </View>
        <Input
          label="Description"
          invalid={!expenseToUpdate.description.isValid}
          texInputProps={{
            multiline: true,
            autoCapitalize: "sentences",
            autoCorrect: true,
            keyboardType: "default",
            value: expenseToUpdate.description.value,
            onChangeText: (text) => {
              dispatch({ type: actionTypes.DESCRIPTION_CHANGE, payload: text });
            },
          }}
        />
        <Input
          label="Date"
          invalid={!expenseToUpdate.date.isValid}
          texInputProps={{
            autoComplete: "birthdate-full",
            keyboardType: "default",
            keyboardAppearance: "light",
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            value: expenseToUpdate.date.value,
            onChangeText: (text) => {
              dispatch({ type: actionTypes.DATE_CHANGE, payload: text });
            },
          }}
        />
        {!isFormValid && (
          <Text style={styles.errorText}> Please fix you errors </Text>
        )}
        <ExpenseOptions
          cancelPressHandler={cancelPressHandler}
          option={optionChoice}
          optionPressHandler={formPressHandler}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
  },
  title: {
    marginVertical: 8,
    textAlign: "center",
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    textAlign: "center",
    color: Colors.error500,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowInput: {
    flex: 1,
  },
});
