import axios from "axios";
import { Expense } from "../types/Expense";

const BASE_URL = "https://expense-app-3a5df-default-rtdb.firebaseio.com";
export async function storeExpense({
  expense: { title, amount, date, description },
}: {
  expense: Expense;
}): Promise<string> {
  const response = await axios.post(`${BASE_URL}/expenses.json`, {
    title,
    amount,
    date,
    description,
  });
  if (response.status !== 200) throw new Error("Something went wrong");
  const id = response.data.name;
  return id;
}

export async function fetchExpenses(): Promise<any> {
  const response = await axios.get(`${BASE_URL}/expenses.json`).catch((err) => {
    throw new Error(err.message);
  });

  if (response.status !== 200) throw new Error("Something went wrong");
  const expenses: Expense[] = [];
  for (const key in response.data) {
    const expense: Expense = {
      id: key,
      title: response.data[key].title,
      amount: response.data[key].amount,
      date: response.data[key].date,
      description: response.data[key].description,
    };
    expenses.push(expense);
  }
  return expenses;
}

export async function destroyExpense(id: string): Promise<string> {
  const response = await axios.delete(`${BASE_URL}/expenses/${id}.json`);
  if (response.status !== 200) throw new Error("Something went wrong");
  return id;
}

export async function updateOnlineExpense({
  expense: { id, title, amount, date, description },
}: {
  expense: Expense;
}): Promise<Expense> {
  const response = await axios
    .put(`${BASE_URL}/expenses/${id}.json`, {
      title,
      amount,
      date,
      description,
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  if (response.status !== 200) throw new Error("Something went wrong");
  const savedData: Expense = {
    id,
    title: response.data?.title,
    amount: response.data?.amount,
    date: response.data?.date,
    description: response.data?.description,
  };
  return savedData;
}
