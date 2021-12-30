import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { AntDesign } from "@expo/vector-icons";
export default function LogoutButton({ logout }) {
  return (
    <TouchableOpacity onPress={logout()} style={styles.container}>
      <AntDesign name="logout" size={30} color="#ffca18" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: getStatusBarHeight(),
    right: 10,
    zIndex: 10,
  },
});
