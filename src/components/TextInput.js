import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme } from "../core/theme";

export default function TextInput({ errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="#04ACF3"
        mode="outlined"
        outlineColor="#04ACF3"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 301,
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "flex-start",
    alignContent: "center",
  },
  input: {
    backgroundColor: theme.colors.surface,
    width: 301,
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    textAlign: "left",
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
    textAlign: "left",
    paddingHorizontal: 5,
  },
});
