import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { View } from "react-native";

export default function Head(props) {
  return <Text style={styles.header} {...props} />;
}

const styles = StyleSheet.create({
  container: {},
  header: {
    paddingTop: 30,
    paddingBottom: 10,
    textAlign: "center",
    width: "100%",
    fontSize: 36,
    color: "#000000",
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: 42,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 6,
  },
});
