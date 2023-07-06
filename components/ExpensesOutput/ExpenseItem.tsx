import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";
import { Expense } from "../../types/Expense";

export default function ExpenseItem({
  title,
  id,
  description,
  date,
  amount,
}: Expense) {
  const navigation = useRouter();
  function expensePressHandler() {
    navigation.push(`/expense/${id}`);
  }
  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.title]}>{title}</Text>
          <Text>{date}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}> {amount}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 8,
    elevation: 4,
    shadowColor: Colors.gray500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
  },
  textBase: {
    color: Colors.primary50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  amountContainer: {
    fontSize: 12,
    width: 75,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  amount: {
    color: Colors.primary500,
    fontSize: 12,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
  },
});
