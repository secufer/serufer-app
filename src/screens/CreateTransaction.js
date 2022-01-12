import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import Head from "../components/Head";
import TextInput from "../components/TextInput";
import CheckBox from "expo-checkbox";
import Button from "../components/Button";
import { Text } from "react-native-paper";
import GetUser from "../functions/GetUser";
import { theme } from "../core/theme";
import { RadioButton } from "react-native-paper";

export default function CreateTransaction({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [user_type, setUserType] = useState([]);
  const [user, setUser] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [commission, setCommission] = useState("Buyer");
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
  const [notBuyer, setNotBuyer] = useState(true);
  const [firstForm, setFirstForm] = useState(false);
  const [confirmForm, setConfirmForm] = useState(false);
  const [confirmData, setCofirmData] = useState(null);

  const url = "https://secufer.herokuapp.com/api/transactions/shopping/";
  var arr_error;
  const fillUserData = async () => {
    var userObj = await GetUser();
    // const userObj = user["user"];
    // if (userObj["user"]) {
    //   userObj = userObj["user"];
    // }
    if (
      userObj["user_type"].includes("Client") ||
      userObj["user_type"].includes("Seller")
    ) {
      setNotBuyer(true);
      return;
    }
    setNotBuyer(false);
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
        commission: commission,
        amount: amount.value,
        cpty_company: cpty_company.value,
        cpty_phone: cpty_phone.value,
      }),
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    console.log(data);
    setLoading(!!data ? false : true);
    if (!!data["detail"] == true) {
      arr_error = data["detail"];
      console.log(arr_error);
      Alert.alert("Error", arr_error, [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
    if (data == "Counterparty not found") {
      arr_error =
        "Counterparty not found check the Registered Seller's phone number";

      console.log(arr_error);
      Alert.alert("Error", arr_error, [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
    if (!!data["cpty_phone"] === Array) {
      arr_error = data["cpty_phone"];
      arr_error.map((ero) => {
        console.log(ero);
        setCpty_phone({ ...cpty_phone, error: ero });
      });
    }
    if (!!data["cpty_company"] === Array) {
      arr_error = data["cpty_company"];
      arr_error.map((ero) => {
        console.log(ero);
        setCpty_company({ ...cpty_company, error: ero });
      });
    }
    if (!!data["amount"] === Array) {
      arr_error = data["amount"];
      arr_error.map((ero) => {
        console.log(ero);
        setAmount({ ...amount, error: ero });
      });
    }
    if (service_details.value == "") {
      setService_details({
        ...service_details,
        error: "This field may not be blank.",
      });
    }
    if (!!data["form_pk"] == true) {
      // setLoading(true);
      const confirmData = await data;
      console.log(confirmData);
      setCofirmData(confirmData);
      // setLoading(false);
      setConfirmForm(true);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={theme.container}>
        <Head>Create Transaction</Head>
        <View style={theme.separator} />
        {notBuyer ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              flexDirection: "column",
              height: "90%",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                color: "#414757",
                marginVertical: 10,
                marginHorizontal: 10,
                paddingHorizontal: 10,
              }}
            >
              Client / Seller can't create Transaction. Click the below button
              to join Transaction
            </Text>
            <Button
              mode="contained"
              onPress={onNextTransactionPress}
              style={{ marginTop: 24 }}
              onPress={() => {
                navigation.navigate("JoinTransaction");
              }}
            >
              Join
            </Button>
          </View>
        ) : (
          <>
            {loading && (
              <ActivityIndicator
                visible={loading}
                size="large"
                color={theme.colors.primary}
              />
            )}
            {!confirmForm ? (
              <ScrollView
                contentContainerStyle={{
                  alignItems: "center",
                  marginHorizontal: 10,
                }}
                style={{ width: "100%" }}
                showsVerticalScrollIndicator={false}
              >
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
                      onValueChange={(value) => {
                        setFirstForm(!firstForm);
                        setUser(value);
                      }}
                      mode="dropdown"
                      style={styles.picker}
                    >
                      {user_type.map((ele, i) => (
                        <Picker.Item
                          key={i}
                          label={ele}
                          value={ele}
                        ></Picker.Item>
                      ))}
                    </Picker>
                  </View>
                  {firstForm && (
                    <>
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
                      <View
                        style={[
                          theme.container,
                          {
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            alignContent: "center",
                            width: 301,
                            marginVertical: 12,
                            paddingVertical: 8,
                            backgroundColor: "#fff",
                            borderWidth: 1,
                            borderColor: "#04ACF3",
                            borderRadius: 5,
                          },
                        ]}
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            color: "#414757",
                            paddingHorizontal: 10,
                          }}
                        >
                          Commission (1% to 2%) - Free for now *
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                          }}
                        >
                          <RadioButton
                            value="Buyer"
                            status={
                              commission === "Buyer" ? "checked" : "unchecked"
                            }
                            onPress={() => setCommission("Buyer")}
                            disabled
                          />
                          <Text>Buyer</Text>
                          <RadioButton
                            value="Seller"
                            status={
                              commission === "Seller" ? "checked" : "unchecked"
                            }
                            onPress={() => setCommission("Seller")}
                            disabled
                          />
                          <Text>Seller</Text>
                          <RadioButton
                            value="Share"
                            status={
                              commission === "Share" ? "checked" : "unchecked"
                            }
                            onPress={() => setCommission("Share")}
                            disabled
                          />
                          <Text>Share</Text>
                        </View>
                      </View>
                      <TextInput
                        label="₹ Enter Amount * "
                        returnKeyType="next"
                        value={amount.value}
                        onChangeText={(text) =>
                          setAmount({ value: text, error: "" })
                        }
                        error={!!amount.error}
                        errorText={amount.error}
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
                      <Text style={styles.error}>
                        Note: Before you proceed filling the details, please
                        make sure your seller already has a user account with
                        Secufer.
                      </Text>
                      <Button
                        mode="contained"
                        onPress={onNextTransactionPress}
                        style={{ marginTop: 24 }}
                      >
                        Next
                      </Button>
                    </>
                  )}
                </View>
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
                    <Text style={styles.error}>
                      Note: Before you proceed filling the details, please make
                      sure your seller already has a user account with Secufer.
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
              </ScrollView>
            ) : (
              <ScrollView
                style={{
                  borderWidth: 2,
                  borderColor: "black",
                  margin: 5,
                  marginHorizontal: 10,
                  backgroundColor: "white",
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    flexWrap: "nowrap",
                    paddingVertical: 10,
                  }}
                >
                  <Text style={[styles.confirmTitle]}>User Type</Text>
                  <Text style={[styles.confirmValue]}>{user}</Text>
                  <View style={theme.separator} />

                  <Text style={[styles.confirmTitle]}>
                    Product / Service Details
                  </Text>
                  <Text style={[styles.confirmValue]}>
                    {/* {confirmData["service_details"]} */}
                  </Text>
                  <View style={theme.separator} />

                  <Text style={[styles.confirmTitle]}>Commission</Text>
                  <Text style={[styles.confirmValue]}>
                    {/* {confirmData["commission"]} */}
                    {/* {"Currently Free"} */}
                  </Text>
                  <View style={theme.separator} />

                  <Text style={[styles.confirmTitle]}>Final Amount</Text>
                  <Text style={[styles.confirmValue]}>
                    {/* {confirmData["amount"]} */}
                  </Text>
                  <View style={theme.separator} />

                  <Text style={[styles.confirmTitle]}>
                    Registered Seller's number
                  </Text>
                  <Text style={[styles.confirmValue]}>
                    {/* {confirmData["cpty_phone"]} */}
                  </Text>
                  <View style={theme.separator} />

                  <Text style={[styles.confirmTitle]}>
                    Registered Seller's Name
                  </Text>
                  <Text style={[styles.confirmValue]}>
                    {/* {confirmData["cpty_company"]} */}
                  </Text>
                  <View style={theme.separator} />

                  <Text style={[styles.confirmTitle]}>
                    Rules of Transaction
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 50,
                        color: "red",
                      }}
                    >
                      {"\u2022"}
                    </Text>
                    <Text
                      style={[
                        styles.confirmValue,
                        { textAlignVertical: "center" },
                      ]}
                    >
                      Read every word, including the fine print.
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 50,
                        color: "red",
                      }}
                    >
                      {"\u2022"}
                    </Text>
                    <Text
                      style={[
                        styles.confirmValue,
                        { textAlignVertical: "center" },
                      ]}
                    >
                      Ensure that it reflects the terms and conditions that were
                      negotiated.
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 50,
                        color: "red",
                      }}
                    >
                      {"\u2022"}
                    </Text>
                    <Text
                      style={[
                        styles.confirmValue,
                        { textAlignVertical: "center" },
                      ]}
                    >
                      Make sure that you and the other party initiate any
                      changes to the contract.
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 50,
                        color: "red",
                      }}
                    >
                      {"\u2022"}
                    </Text>
                    <Text
                      style={[
                        styles.confirmValue,
                        { textAlignVertical: "center" },
                      ]}
                    >
                      When negotiating the contract terms make sure the
                      conditions of the contract are clearly defined and agreed
                      to by all parties.
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginHorizontal: 5,
                      justifyContent: "space-around",
                    }}
                  >
                    <PaperButton
                      style={{
                        marginVertical: 10,
                        paddingVertical: 5,
                        height: 40,
                        borderRadius: 7,
                        backgroundColor: theme.colors.surface,
                        borderColor: "#04ACF3",
                        borderWidth: 1,
                        borderStyle: "solid",
                      }}
                      labelStyle={{
                        fontFamily: "Roboto",
                        fontStyle: "normal",
                        fontWeight: 500,
                        fontWeight: "bold",
                        fontSize: 16,
                        lineHeight: 15,
                        // width: "100%",
                        letterSpacing: 0.32,
                        paddingHorizontal: 5,
                        color: "#04ACF3",
                        height: "100%",
                        textAlignVertical: "center",
                      }}
                      mode="outlined"
                      onPress={() => {
                        setConfirmForm(false);
                      }}
                    >
                      Cancel
                    </PaperButton>
                    <PaperButton
                      style={{
                        marginVertical: 10,
                        paddingVertical: 5,
                        height: 40,
                        backgroundColor: "#04ACF3",
                        borderRadius: 7,
                      }}
                      labelStyle={{
                        fontFamily: "Roboto",
                        fontStyle: "normal",
                        fontWeight: 500,
                        fontWeight: "bold",
                        fontSize: 16,
                        lineHeight: 15,
                        // width: "100%",
                        letterSpacing: 0.32,
                        paddingHorizontal: 5,
                        color: "white",
                        height: 21,
                      }}
                      mode="outlined"
                      onPress={() => {
                        Alert.alert("Error", arr_error, [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                          },
                          { text: "OK", onPress: () => console.log("OK Pressed") },
                        ]);
                      }}
                    >
                      Agree
                    </PaperButton>
                  </View>
                </View>
              </ScrollView>
            )}
          </>
        )}
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
  confirmTitle: {
    fontSize: 26,
    paddingHorizontal: 10,
    fontWeight: "bold",
    lineHeight: 30,
    letterSpacing: 0.15008,
    paddingVertical: 5,
  },
  confirmValue: {
    fontSize: 18,
    paddingHorizontal: 13,
    paddingVertical: 5,
  },
});
