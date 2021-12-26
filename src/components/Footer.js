import React from "react";
import { Image, ImageBackground } from "react-native";
import { theme } from "../core/theme";
export default function Footer() {
  return (
    <Image
      style={theme.footer}
      source={require("../assets/images/Footer.png")}
      resizeMode="cover"
    ></Image>
  );
}
