import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

export default function ExpensesSummary({
  periodName,
  total,
}: {
  periodName: string;
  total: string | number;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>{total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: Colors.primary50,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 16,
    color: Colors.primary400,
  },
  sum: {
    fontSize: 18,
    color: Colors.primary500,
    fontWeight: "bold",
  },
});
