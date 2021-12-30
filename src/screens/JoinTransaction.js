import React from "react";
import { View } from "react-native";

import Head from "../components/Head";

import { theme } from "../core/theme";

export default function JoinTransaction() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={theme.container}>
        <Head>Join Transaction</Head>
        <View style={theme.separator} />
      </View>
    </View>
  );
}
