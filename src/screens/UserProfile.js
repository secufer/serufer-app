import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import Head from "../components/Head";
import * as SecureStore from "expo-secure-store";
import { theme } from "../core/theme";

export default function UserProfile() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    getUser();
  }, []);
  async function getUser() {
    const user = await SecureStore.getItemAsync("User");
    console.log(JSON.parse(user));
    setUser(JSON.parse(user));
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={theme.container}>
        <Head>User Profile</Head>
        <View style={theme.separator}></View>
        <Text>{user["first_name"]} </Text>
        
      </View>
    </View>
  );
}
