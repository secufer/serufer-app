import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Head from "../components/Head";
import TextInput from "../components/TextInput";
import CheckBox from "expo-checkbox";
import Button from "../components/Button";
import { Text } from "react-native-paper";
import GetUser from "../functions/GetUser";
import { theme } from "../core/theme";

export default function CreateTransaction() {
  const [loading, setLoading] = useState(false);
  const [user_type, setUserType] = useState([]);
  const [user, setUser] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service_details, setService_details] = useState({
    value: "",
    error: "",
  });
  const [amount, setAmount] = useState({
    value: "",
    error: "",
  });
  const [cpty_company, setCpty_company] = useState({
    value: "",
    error: "",
  });
  const [cpty_phone, setCpty_phone] = useState({
    value: "",
    error: "",
  });
  const [firstForm, setFirstForm] = useState(true);
  const url = "https://secufer.herokuapp.com/api/transactions/shopping/";

  const fillUserData = async () => {
    var userObj = await GetUser();
    // const userObj = user["user"];
    // if (userObj["user"]) {
    //   userObj = userObj["user"];
    // }
    setFName(userObj["first_name"]);
    setLName(userObj["last_name"]);
    setEmail(userObj["email"]);
    setPhone(userObj["phone_number"]);
    setUserType(userObj["user_type"]);
  };
  useEffect(() => {
    fillUserData();
  }, []);
  var errorText = null;

  async function onNextTransactionPress() {
    setLoading(true);
    const token = await SecureStore.getItemAsync("token");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
      body: JSON.stringify({
        main_user_fname: fName,
        main_user_lname: lName,
        main_user_phone: phone,
        main_user_email: email,
        user_type: user,
        service_details: service_details.value,
        commission: "Seller",
        amount: amount.value,
        cpty_company: cpty_company.value,
        cpty_phone: cpty_phone.value,
      }),
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    console.log(data);
    setLoading(!!data ? false : true);
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={theme.container}>
        <Head>Create Transaction</Head>
        <View style={theme.separator} />
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
            marginHorizontal: 10,
          }}
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          {firstForm && (
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
              <View
                style={{
                  backgroundColor: "#fff",
                  borderWidth: 1,
                  borderColor: "#04ACF3",
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                  width: "100%",
                  borderRadius: 5,
                }}
              >
                <Picker
                  selectedValue={user}
                  onValueChange={(value) => setUser(value)}
                  mode="dropdown"
                  style={styles.picker}
                >
                  {user_type.map((ele, i) => (
                    <Picker.Item key={i} label={ele} value={ele}></Picker.Item>
                  ))}
                </Picker>
              </View>
              {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
              <TextInput
                label="I am Buying * "
                returnKeyType="next"
                value={service_details.value}
                onChangeText={(text) =>
                  setService_details({ value: text, error: "" })
                }
                error={!!service_details.error}
                errorText={service_details.error}
              />
              <TextInput
                label="₹ Enter Amount * "
                returnKeyType="next"
                value={amount.value}
                onChangeText={(text) => setAmount({ value: text, error: "" })}
                error={!!amount.error}
                errorText={amount.error}
              />
              <TextInput
                label="Registered Seller's Name * "
                returnKeyType="next"
                value={cpty_company.value}
                onChangeText={(text) =>
                  setCpty_company({ value: text, error: "" })
                }
                error={!!cpty_company.error}
                errorText={cpty_company.error}
              />
              <TextInput
                label="Registered Seller's Phone number * "
                returnKeyType="next"
                value={cpty_phone.value}
                onChangeText={(text) =>
                  setCpty_phone({ value: text, error: "" })
                }
                error={!!cpty_phone.error}
                errorText={cpty_phone.error}
              />

              <Text style={styles.error}>
                Note: Before you proceed filling the details, please make sure
                your seller already has a user account with Secufer.
              </Text>
              <Button
                mode="contained"
                onPress={onNextTransactionPress}
                style={{ marginTop: 24 }}
              >
                Next
              </Button>
            </View>
          )}
          {!firstForm && (
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
              
            </View>
          )}
        </ScrollView>
      </View>
    </View>
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
    backgroundColor: "#FFFFFF",
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
