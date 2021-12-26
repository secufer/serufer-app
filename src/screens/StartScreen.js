import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Head from "../components/Head";
import Button from "../components/Button";
import { View, Text, ImageBackground } from "react-native";
import { theme } from "../core/theme";
import Footer from "../components/Footer";

export default function StartScreen({ navigation }) {
  return (
    <View
      style={[
        theme.container,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      {/* <Logo /> */}
      <Head>Creating Trust In Your Transactions</Head>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        Sign Up
      </Button>
      <Footer></Footer>
    </View>
  );
}
