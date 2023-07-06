import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

export default function Button({
  children,
  onPress,
  mode,
  style,
}: {
  children: React.ReactNode;
  onPress: () => void;
  mode?: string;
  style?: any;
}) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode == "flat" && styles.flat]}>
          <Text style={[styles.text, mode == "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary500,
    padding: 10,
    borderRadius: 5,
  },
  flat: {
    backgroundColor: "transparent",
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  flatText: {
    color: Colors.primary200,
  },
  pressed: {
    opacity: 0.5,
    backgroundColor: Colors.primary100,
    borderRadius: 5,
  },
});
