import React, { createContext, useReducer } from "react";
import { Expense } from "../types/Expense";
import {
  storeExpense,
  destroyExpense,
  updateOnlineExpense,
} from "../utils/http";

const initialState: Expense[] = [
  {
    id: "e1",
    title: "Toilet Paper",
    description: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14).toISOString().slice(0, 10),
  } as Expense,
  {
    id: "e2",
    title: "New TV",
    description: "New TV",
    amount: 799.49,
    date: new Date(2021, 2, 12).toISOString().slice(0, 10),
  } as Expense,
  {
    id: "e3",
    title: "Bananas (bunch)",
    description: "Bananas (bunch)",
    amount: 20,
    date: new Date(2021, 2, 12).toISOString().slice(0, 10),
  } as Expense,
  {
    id: "e4",
    title: "Book",
    description: "sdf",
    amount: 10000.2,
    date: new Date(2023, 7, 1).toISOString().slice(0, 10),
  } as Expense,
  {
    id: "e5",
    title: "Book",
    description: "Bananas (bunch)",
    amount: 20,
    date: new Date(2023, 7, 2).toISOString().slice(0, 10),
  } as Expense,
  {
    id: "e9",
    title: "New TV",
    description: "New TV",
    amount: 799.49,
    date: new Date(2021, 2, 12).toISOString().slice(0, 10),
  } as Expense,
  {
    id: "e6",
    title: "Bananas (bunch)",
    description: "Bananas (bunch)",
    amount: 20,
    date: new Date(2021, 2, 12).toISOString().slice(0, 10),
  } as Expense,
  {
    id: "e7",
    title: "Book",
    description: "sdf",
    amount: 10.39,
    date: new Date(2023, 7, 1).toISOString().slice(0, 10),
  } as Expense,
  {
    id: "e8",
    title: "Book",
    description: "Bananas (bunch)",
    amount: 10.5,
    date: new Date(2023, 7, 2).toISOString().slice(0, 10),
  } as Expense,
  {
    id: "e10",
    title: "New TV",
    description: "New TV",
    amount: 799.49,
    date: new Date(2021, 2, 12).toISOString().slice(0, 10),
  } as Expense,
  {
    id: "e11",
    title: "Bananas (bunch)",
    description: "Bananas (bunch)",
    amount: 20,
    date: new Date(2021, 2, 12).toISOString().slice(0, 10),
  } as Expense,
  {
    id: "e12",
    title: "Book",
    description: "sdf",
    amount: 10.39,
    date: new Date(2023, 6, 1).toISOString().slice(0, 10),
  } as Expense,
  {
    id: "e13",
    title: "Book",
    description: "Bananas (bunch)",
    amount: 10.5,
    date: new Date(2023, 6, 5).toISOString().slice(0, 10),
  } as Expense,
  {
    id: "e14",
    title: "Book pocahontas",
    description: "Bananas (bunch)",
    amount: 999.99,
    date: new Date(2023, 6, 2).toISOString().slice(0, 10),
  } as Expense,
];

const expenseActionTypes = {
  ADD_EXPENSE: "ADD_EXPENSE",
  DELETE_EXPENSE: "DELETE_EXPENSE",
  UPDATE_EXPENSE: "UPDATE_EXPENSE",
  SET_EXPENSES: "SET_EXPENSES",
};

// reducer function
export const expenseReducer = (state: Expense[], action: any) => {
  switch (action.type) {
    case expenseActionTypes.ADD_EXPENSE:
      return [...state, action.payload];
    case expenseActionTypes.DELETE_EXPENSE:
      return state.filter((expense: Expense) => expense.id !== action.payload);
    case expenseActionTypes.UPDATE_EXPENSE:
      return state.map((expense: Expense) =>
        expense.id === action.payload.id
          ? { ...expense, ...action.payload.expense }
          : expense
      );
    case expenseActionTypes.SET_EXPENSES:
      return action.payload.reverse();
    default:
      return state;
  }
};

// context provider
export const ExpenseContext = createContext({
  expenses: [] as Expense[],
  addExpense: (expense: Expense) => {},
  deleteExpense: (id: string) => {},
  setExpenses: (expenses: Expense[]) => {},
  updateExpense: ({ id, title, description, amount, date }: Expense) => {},
});

export function ExpenseContextProvider(props: any) {
  const [expenses, dispatch] = useReducer(expenseReducer, initialState);

  async function addExpense(expense: Expense): Promise<void> {
    return storeExpense({ expense })
      .catch((error) => {
        throw new Error(error);
      })
      .then((id: string) => {
        dispatch({
          type: expenseActionTypes.ADD_EXPENSE,
          payload: { ...expense, id },
        });
      });
  }

  async function deleteExpense(id: string): Promise<void> {
    return destroyExpense(id)
      .catch((error) => {
        throw new Error(error);
      })
      .then((res: string) => {
        dispatch({
          type: expenseActionTypes.DELETE_EXPENSE,
          payload: res,
        });
      });
  }

  async function updateExpense({
    id,
    title,
    description,
    amount,
    date,
  }: Expense): Promise<void> {
    return updateOnlineExpense({
      expense: { id, amount, date, description, title },
    })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      })
      .then((res: Expense) =>
        dispatch({
          type: expenseActionTypes.UPDATE_EXPENSE,
          payload: { id, expense: { ...res } },
        })
      );
  }

  function setExpenses(expenses: Expense[]) {
    dispatch({
      type: expenseActionTypes.SET_EXPENSES,
      payload: expenses,
    });
  }

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
        updateExpense,
        setExpenses,
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
}
