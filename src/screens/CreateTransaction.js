import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  ActivityIndicator,
} from "react-native";

import Head from "../components/Head";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { Text } from "react-native-paper";
import { theme } from "../core/theme";

export default function CreateTransaction() {
  const [user, setUser] = useState("Unknown");
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={theme.container}>
        <Head>Create Transaction</Head>
        <View style={theme.separator} />
        <TextInput
          label="I Am"
          returnKeyType="next"
          value={user}
          onChangeText={(text) => setUser(text)}
        />
        {/* <Text>{user}</Text> */}
      </View>
    </View>
  );
}
