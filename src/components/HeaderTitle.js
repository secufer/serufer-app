import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function HeaderTitle(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{props}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    marginVertical: 30,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    overflow: "hidden",
    borderBottomWidth: 4,
    borderBottomColor: "rgba(109, 102, 102, 100)",
  },
  header: {
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
