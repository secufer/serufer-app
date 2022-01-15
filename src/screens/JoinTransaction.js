import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import { Button as PaperButton } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import Head from "../components/Head";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

import { Paragraph, Dialog, Portal } from "react-native-paper";
import { Text } from "react-native-paper";
import { theme } from "../core/theme";

import GetUser from "../functions/GetUser";

export default function JoinTransaction({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [notSeller, setNotSeller] = useState(true);
  const [form_pk, setform_pk] = useState({
    value: "",
    error: "",
  });
  const [confirmData, setCofirmData] = useState(null);

  // const url = "https://secufer.herokuapp.com/api/transactions/shopping/";
  const fillUserData = async () => {
    var userObj = await GetUser();
    if (
      userObj["user_type"].includes("Buyer") ||
      userObj["user_type"].includes("Service_provider")
    ) {
      setNotSeller(false);
      return;
    }
    setNotSeller(true);
  };
  useEffect(() => {
    fillUserData();
  }, []);

  async function onJoinTransactionPressed() {
    setLoading(true);
    const token = await SecureStore.getItemAsync("token");
    // console.log(token);
    var form_pkId = form_pk.value.substring(form_pk.value.indexOf("=") + 1);
    var id = encodeURIComponent(form_pkId);
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Token " + token,
      },
    };
    // console.log(form_pk.value);
    setCofirmData(() => {
      fetch(
        `https://secufer.herokuapp.com/api/transactions/shopping/?form_pk=${id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData[0] == "Transaction form not found") {
            Alert.alert("Error", "Transaction form not found", [
              {
                text: "OK",
                onPress: () => {
                  setCofirmData(null);
                  setform_pk({ value: "", error: "" });
                  setLoading(false);
                },
              },
            ]);
          } else {
            setCofirmData(responseData);
            console.log(responseData);
          }
          return responseData;
        })
        .catch((error) => console.warn(error));
    });
    // console.log(confirmData);
    setLoading(!!confirmData == null ? false : true);
  }
  const openWhatsappUrl = () => {
    const url =
      "whatsapp://send?text=Hello Secufer%2C" +
      " I" +
      " have" +
      " done" +
      " all" +
      " the" +
      " procedure" +
      " and" +
      " now" +
      " we" +
      " can" +
      " proceed" +
      " our" +
      " transactions" +
      " .&phone=919004191881";
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Alert", "WhatsApp is not installed");
      }
    });
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={theme.container}>
        <Head>Join Transaction</Head>
        <View style={theme.separator} />
        {confirmData ? (
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
              <Text style={[styles.confirmValue]}>
                {confirmData[0].user_type}
              </Text>
              <View style={theme.separator} />

              <Text style={[styles.confirmTitle]}>
                Product / Service Details
              </Text>
              <Text style={[styles.confirmValue]}>
                {confirmData[0].service_details}
              </Text>
              <View style={theme.separator} />

              <Text style={[styles.confirmTitle]}>Commission</Text>
              <Text style={[styles.confirmValue]}>
                {confirmData[0].commission}
                {"Currently Free"}
              </Text>
              <View style={theme.separator} />

              <Text style={[styles.confirmTitle]}>Final Amount</Text>
              <Text style={[styles.confirmValue]}>{confirmData[0].amount}</Text>
              <View style={theme.separator} />

              <Text style={[styles.confirmTitle]}>
                Registered Seller's number
              </Text>
              <Text style={[styles.confirmValue]}>
                {confirmData[0].cpty_phone}
              </Text>
              <View style={theme.separator} />

              <Text style={[styles.confirmTitle]}>
                Registered Seller's Name
              </Text>
              <Text style={[styles.confirmValue]}>
                {confirmData[0].cpty_company}
              </Text>
              <View style={theme.separator} />

              <Text style={[styles.confirmTitle]}>Rules of Transaction</Text>
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
                  style={[styles.confirmValue, { textAlignVertical: "center" }]}
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
                  style={[styles.confirmValue, { textAlignVertical: "center" }]}
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
                  style={[styles.confirmValue, { textAlignVertical: "center" }]}
                >
                  Make sure that you and the other party initiate any changes to
                  the contract.
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
                  style={[styles.confirmValue, { textAlignVertical: "center" }]}
                >
                  When negotiating the contract terms make sure the conditions
                  of the contract are clearly defined and agreed to by all
                  parties.
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
                    setform_pk({ value: "", error: "" });
                    setNotSeller(false);
                    setCofirmData(null);
                    fillUserData();
                    setLoading(false);
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
                  onPress={openWhatsappUrl}
                >
                  Agree
                </PaperButton>
              </View>
            </View>
          </ScrollView>
        ) : (
          <>
            {notSeller ? (
              <>
                {loading && (
                  <ActivityIndicator
                    visible={loading}
                    size="large"
                    color={theme.colors.primary}
                  />
                )}
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
                  <TextInput
                    label="Enter Transaction Link * "
                    returnKeyType="next"
                    value={form_pk.value}
                    onChangeText={(text) => {
                      setform_pk({ value: text, error: "" });
                    }}
                    error={!!form_pk.error}
                    errorText={form_pk.error}
                  />
                  <Button
                    mode="contained"
                    onPress={onJoinTransactionPressed}
                    style={{ marginTop: 24 }}
                  >
                    Join
                  </Button>
                </View>
              </>
            ) : (
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
                  Buyer / Service_provider can't join Transaction. Click the
                  below button to create Transaction
                </Text>
                <Button
                  mode="contained"
                  style={{ marginTop: 24 }}
                  onPress={() => {
                    navigation.navigate("CreateTransaction");
                  }}
                >
                  create
                </Button>
              </View>
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
