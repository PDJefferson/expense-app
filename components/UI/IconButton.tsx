import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function IconButton({
  icon,
  size,
  color,
  onPress,
}: {
  icon: any;
  size: number;
  color: string | undefined;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 7,
  },
  pressed: {
    opacity: 0.5,
    elevation: 5,
  },
});
