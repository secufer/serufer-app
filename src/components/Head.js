import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function Head(props) {
  return <Text style={[styles.header]} {...props} />;
}

const styles = StyleSheet.create({
  container: {},
  header: {
    paddingTop: 35,
    paddingBottom: 10,
    textAlign: "center",
    width: "100%",
    fontSize: 36,
    color: "#778899",
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: 42,
    textShadowColor: "rgba(0, 0, 0, 0.10)",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 6,
  },
});
