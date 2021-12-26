import React from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { theme } from "../core/theme";

export default function Button({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === "outlined" && {
          backgroundColor: theme.colors.surface,
          borderColor: "#04ACF3",
          borderWidth: 1,
          borderStyle: "solid",
        },
      ]}
      labelStyle={
        mode === "outlined"
          ? [styles.outlinedText, styles.text]
          : [styles.normalText, styles.text]
      }
      mode={mode}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: 301,
    marginVertical: 10,
    paddingVertical: 5,
    height: 56,
    backgroundColor: "#04ACF3",
    borderRadius: 7,
  },
  text: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0.32,
    paddingHorizontal: 5,
    width: "100%",
    height: 21,
  },
  normalText: { color: "#FFFFFF" },
  outlinedText: { color: "#04ACF3" },
});
