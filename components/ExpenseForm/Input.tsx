import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

export default function Input({
  label,
  style,
  texInputProps,
  invalid,
}: {
  label: string;
  texInputProps: TextInputProps;
  style?: any;
  invalid: boolean;
}) {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          texInputProps.multiline && styles.inputMultiline,
          invalid && styles.invalidInput,
        ]}
        {...texInputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    margingVertical: 10,
    paddingBottom: 10,
    marginHorizontal: 6,
  },
  label: {
    fontSize: 16,
    color: Colors.primary100,
    marginBottom: 8,
  },
  input: {
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
    backgroundColor: Colors.primary100,
    color: Colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: Colors.error500,
  },
  invalidInput: {
    backgroundColor: Colors.error50,
  },
});
