import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Text } from "react-native-paper";
import Head from "../components/Head";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { TextInput as input } from "react-native-paper";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import Footer from "../components/Footer";
import save from "../functions/StoreUser";
export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const url = "https://secufer.herokuapp.com/api/auth/login";
  var arr_error;
  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        setLoading(true);
        const userRequest = {
          method: "GET",
          headers: { Authorization: "Token " + token },
        };
        const user = await fetch(
          "http://secufer.herokuapp.com/api/auth/user",
          userRequest
        );
        const userData = await user.json();
        if (!!userData["detail"] == true) {
          setLoading(false);
        } else {
          setLoading(false);
          save("User", JSON.stringify(userData));
          // StoreUser(userData);
          navigation.reset({
            index: 0,
            routes: [{ name: "Dashboard" }],
          });
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
      setLoading(false);
    }
  };

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
    setLoading(!!data ? false : true);
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
      save("token", data["token"]);
      save("User", JSON.stringify(data));
      navigation.reset({
        index: 0,
        routes: [{ name: "Dashboard" }],
      });
    } else {
      return;
    }
  };

  return (
    <View
      style={[
        theme.container,
        {
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        },
      ]}
    >
      <BackButton goBack={navigation.goBack} />
      <Head>Welcome Back!!</Head>
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
        secureTextEntry={secureTextEntry}
        right={
          <input.Icon
            name={secureTextEntry ? "eye-off-outline" : "eye"}
            color={"#04ACF3"}
            onPress={() => {
              setSecureTextEntry(!secureTextEntry);
              return false;
            }}
          />
        }
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
      {/* <Footer></Footer> */}
    </View>
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
