import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Head from "../components/Head";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Head>Creating Trust In Your Transactions</Head>
      {/* <Paragraph>
        Secufer is a system which enables you to safely transact while buying
        and selling online. Join us in our mission
      </Paragraph> */}
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
    </Background>
  );
}
