import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import Head from "../components/Head";
import { theme } from "../core/theme";
import getUser from "../functions/GetUser";

export default function UserProfile() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    setUser(getUser());
  }, []);

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
