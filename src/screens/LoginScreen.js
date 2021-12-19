import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const url = "https://secufer.herokuapp.com/api/auth/login";
  var arr_error;

  const onLoginPressed = async () => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone_number: phone.value,
        password: password.value,
      }),
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    console.log(data);

    setLoading(!!data ? false : true);
    // var commanError = !!data["non_field_errors"] ? true : false;
    if (!!data["non_field_errors"] == true) {
      arr_error = data["non_field_errors"];
      arr_error.map((ero) => {
        console.log(ero);
        Alert.alert("Error", ero, [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      });
    }
    if (!!data["phone_number"] == true) {
      arr_error = data["phone_number"];
      arr_error.map((ero) => {
        console.log(ero);
        setPhone({ ...phone, error: ero });
      });
    }
    if (!!data["password"] == true) {
      arr_error = data["password"];
      arr_error.map((ero) => {
        console.log(ero);
        setPassword({ ...password, error: ero });
      });
    }
    if (!!data["token"] == true) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Dashboard" }],
      });
    } else {
      return;
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
      {loading && (
        <ActivityIndicator
          visible={loading}
          size="large"
          color={theme.colors.primary}
        />
      )}
      <TextInput
        disabled={loading}
        label="Username"
        returnKeyType="next"
        value={phone.value}
        onChangeText={(text) => setPhone({ value: text, error: "" })}
        error={!!phone.error}
        errorText={phone.error}
        autoCapitalize="none"
        keyboardType="default"
      />
      <TextInput
        disabled={loading}
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      {/* <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View> */}
      <Button disabled={loading} mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
