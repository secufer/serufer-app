import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import save from "../functions/StoreUser";
import Onboarding from "react-native-onboarding-swiper";

const Dots = ({ selected }) => {
  let backgroundColor;

  backgroundColor = selected ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)";

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Skip = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}>Next</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}>Done</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({ navigation }) => {
  useEffect(() => {
    checkFirstTimeUser();
  }, []);
  const checkFirstTimeUser = async () => {
    const count = await SecureStore.getItemAsync("Count");
    if (count == "true") {
      console.log("true");
      // navigation.navigate("StartScreen");
    } else {
      console.log("false");
      save("Count", "true");
    }
  };
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() =>
        navigation.reset({
          index: 0,
          routes: [{ name: "StartScreen" }],
        })
      }
      onDone={() =>
        navigation.reset({
          index: 0,
          routes: [{ name: "StartScreen" }],
        })
      }
      pages={[
        {
          backgroundColor: "#1eb096",
          image: <Image source={require("../assets/secufer_img/Logo.png")} />,
          title: "What is Secufer?",
          subtitle:
            "Creating Trust In Your Transactions\n\nWhether it's buying or selling online products/services Secufer protects you from getting into frauds.",
        },
        {
          backgroundColor: "#1ABC6E",
          image: <Image source={require("../assets/secufer_img/Logo.png")} />,
          title: "How Secufer Works",
          subtitle: "Transaction is completed in 4 easy steps",
        },
        {
          backgroundColor: "#28e188",
          image: <Image source={require("../assets/onboarding-img1.png")} />,
          title: "1. Connect to Secufer",
          subtitle:
            "The process begins with the Freelancer, who visits our website and signs up to fill out the contract, after which a unique link is generated which they must send to their fellow client.",
        },
        {
          backgroundColor: "#04ACF3",
          image: <Image source={require("../assets/onboarding-img2.png")} />,
          title: "2. Share Link to the Cilent",
          subtitle:
            "Upon receiving the link from the Freelancer, the client will visit our website and sign up, after which they get an option to paste the URL obtained from the Freelancer to preview the contract. The client should then agree to the contract terms in order to proceed.",
        },
        {
          backgroundColor: "#48c6fc",
          image: <Image source={require("../assets/onboarding-img3.png")} />,
          title: "3. Client can Join Transaction",
          subtitle:
            "Once the Client agrees over the contract both the parties are joined to a group where the payment link is provided through which the Client sends money to Secufer's hold account. The freelancer can now start working over the Client's Project.",
        },
        {
          backgroundColor: "#04da43",
          image: <Image source={require("../assets/onboarding-img4.png")} />,
          title: "4. Secufer will Authenticate",
          subtitle:
            "Both parties will discuss their project and keep a communication record in the allotted group, and money will be released to the Freelancer once the Client confirms work completion.",
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});