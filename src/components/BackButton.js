import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
export default function BackButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <Ionicons name="arrow-back-circle-sharp" size={45} color="#04ACF3" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: getStatusBarHeight(),
    left: 4,
    zIndex: 10,
  },
});
