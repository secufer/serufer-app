import React from "react";

import Head from "../components/Head";
import Button from "../components/Button";
import { View } from "react-native";
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
