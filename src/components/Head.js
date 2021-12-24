import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { View } from "react-native-web";
import { theme } from "../core/theme";

export default function Head(props) {
  return (
    // <View>
      <Text style={styles.header} {...props} />
      // {/* <View style={styles.separator} /> */}
    // </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 36,
    color: "#000000",
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 36,
    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: 42,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 5, height: 4 },
    textShadowRadius: 4,
  },
});
