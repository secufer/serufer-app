import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  ActivityIndicator,
} from "react-native";
import CheckBox from "expo-checkbox";
import { Text } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Head";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
// import { emailValidator } from "../helpers/emailValidator";
// import { passwordValidator } from "../helpers/passwordValidator";
// import { fNameValidator } from "../helpers/nameValidator";

export default function RegisterScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("Unknown");
  const [fName, setFName] = useState({ value: "", error: "" });
  const [lName, setLName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [phone, setPhone] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  var errorText = null;
  const url = "http://secufer.herokuapp.com/api/auth/register";
  var arr_error;
  var no_error = true;

  const onSignUpPressed = async () => {
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: "Dashboard" }],
    // });
    setLoading(true);
    no_error = true;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone_number: phone.value,
        email: email.value,
        password: password.value,
        user_type: [user],
        first_name: fName.value,
        last_name: lName.value,
      }),
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();

    console.log(data);

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
      no_error = false;
    }
    if (!!data["phone_number"] == true) {
      arr_error = data["phone_number"];
      arr_error.map((ero) => {
        console.log(ero);
        setPhone({ ...phone, error: ero });
      });
      no_error = false;
    }
    if (!!data["email"] == true) {
      arr_error = data["email"];
      arr_error.map((ero) => {
        console.log(ero);
        setEmail({ ...email, error: ero });
      });
      no_error = false;
    }
    if (!!data["password"] == true) {
      arr_error = data["password"];
      arr_error.map((ero) => {
        console.log(ero);
        setPassword({ ...password, error: ero });
      });
      no_error = false;
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
      <Header>Create Account</Header>
      {loading && (
        <ActivityIndicator
          visible={loading}
          size="large"
          color={theme.colors.primary}
        />
      )}
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
        }}
        style={{
          width: "100%",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderWidth: 1,
            paddingVertical: 5,
            width: "100%",
            borderRadius: 15,
          }}
        >
          <Picker
            selectedValue={user}
            onValueChange={(value, index) => setUser(value)}
            mode="dropdown"
            style={styles.picker}
          >
            <Picker.Item label="I am * " value="Unknown" />
            {/* <Picker.Item
              label="Freelancer/Service Provider"
              value="Freelancer/ServiceProvider"
            /> */}
            <Picker.Item label="Client" value="Client" />
            <Picker.Item label="Buyer (For Shopping)" value="Buyer" />
            <Picker.Item label="Seller (For Shopping)" value="Seller" />
          </Picker>
        </View>
        {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
        <TextInput
          label="First Name * "
          returnKeyType="next"
          value={fName.value}
          onChangeText={(text) => setFName({ value: text, error: "" })}
          error={!!fName.error}
          errorText={fName.error}
        />
        <TextInput
          label="Last Name * "
          returnKeyType="next"
          value={lName.value}
          onChangeText={(text) => setLName({ value: text, error: "" })}
          error={!!lName.error}
          errorText={lName.error}
        />
        <TextInput
          label="Email * "
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label="Contact Number * "
          returnKeyType="next"
          value={phone.value}
          onChangeText={(text) => setPhone({ value: text, error: "" })}
          error={!!phone.error}
          errorText={phone.error}
        />
        <TextInput
          label="Password * "
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <TextInput
          label="Confirm Password * "
          returnKeyType="done"
          value={confirmPassword.value}
          onChangeText={(text) =>
            setConfirmPassword({ value: text, error: "" })
          }
          error={!!confirmPassword.error}
          errorText={confirmPassword.error}
          secureTextEntry
        />
        <View style={styles.checkboxContainer}>
          <CheckBox
            style={styles.checkbox}
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
          />
          <Text style={styles.label}>
            I accept the{" "}
            <Text
              onPress={() =>
                Linking.openURL(
                  "https://secufer.in/services/terms_and_conditions"
                )
              }
              style={styles.link}
            >
              terms and conditions.
            </Text>
          </Text>
        </View>
        <Button
          mode="contained"
          disabled={
            !toggleCheckBox ||
            !confirmPassword.value ||
            !password.value ||
            !phone.value ||
            !email.value ||
            !lName.value ||
            !fName.value ||
            user === "Unknown" ||
            loading
          }
          onPress={onSignUpPressed}
          style={{ marginTop: 24 }}
        >
          Sign Up
        </Button>
        <View style={styles.row}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
  picker: {
    marginVertical: 0,
    marginHorizontal: 5,
    width: "97%",
    fontSize: 13,
    color: theme.colors.secondary,
    backgroundColor: theme.colors.surface,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
    marginBottom: 4,
    textAlign: "center",
    paddingBottom: 50,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
