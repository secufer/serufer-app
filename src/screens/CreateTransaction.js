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
// import CheckBox from "expo-checkbox";
import Button from "../components/Button";
import { Text } from "react-native-paper";
import GetUser from "../functions/GetUser";
import { theme } from "../core/theme";
import * as Clipboard from "expo-clipboard";
import { RadioButton, Paragraph, Dialog, Portal } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CreateTransaction({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [visibleBuyer, setVisibleBuyer] = useState(false);

  const showBuyerDialog = () => setVisibleBuyer(true);

  const hideBuyerDialog = () => {
    Clipboard.setString(
      "https://secufer.herokuapp.com/api/transactions/shopping/?form_pk=" +
        confirmBuyerData.data["form_pk"]
    );
    setUserType([]);
    setUser("");
    setFName("");
    setLName("");
    setEmail("");
    setPhone("");
    setCommission("Buyer");
    setService_details({
      value: "",
      error: "",
    });
    setAmount({
      value: "",
      error: "",
    });
    setCpty_company({
      value: "",
      error: "",
    });
    setCpty_phone({
      value: "",
      error: "",
    });
    setBuyerData({ active: false, data: null });
    arr_error = "";
    fillUserData();
    navigation.navigate("CreateTransaction");
  };
  const [visibleServiceProvider, setVisibleServiceProvider] = useState(false);

  const showServiceProviderDialog = () => setVisibleServiceProvider(true);

  const hidesServiceProviderDialog = () => {
    Clipboard.setString(
      "https://secufer.herokuapp.com/api/transactions/services/?form_pk=" +
        confirmServicesProviderData.data["form_pk"]
    );
    setUserType([]);
    setUser("");
    setFName("");
    setLName("");
    setEmail("");
    setPhone("");
    setCommission("Buyer");
    setCpty_full_name({
      value: "",
      error: "",
    });
    setClientMobile({
      value: "",
      error: "",
    });
    setReferralCode({
      value: "",
      error: "",
    });
    setDeliverables({
      value: "",
      error: "",
    });
    setPayment_mode({
      value: "Full Payment",
      error: "",
    });
    setCancellation_fee({
      value: "",
      error: "",
    });
    setOther_info({
      value: "",
      error: "",
    });
    setServiceAmount({
      value: "",
      error: "",
    });
    setOther_info({
      value: "",
      error: "",
    });

    setServicesProviderData({ active: false, data: null });
    arr_error = "";
    fillUserData();
    navigation.navigate("CreateTransaction");
  };

  const [notBuyer, setNotBuyer] = useState(false);
  const [confirmServicesProviderData, setServicesProviderData] = useState({
    active: false,
    data: null,
  });
  const [confirmBuyerData, setBuyerData] = useState({
    active: false,
    data: null,
  });
  //Buyer
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

  //Service Provider
  const [cpty_full_name, setCpty_full_name] = useState({
    value: "",
    error: "",
  });
  const [clientMobile, setClientMobile] = useState({
    value: "",
    error: "",
  });
  // const [client_commission, setClient_commission] = useState({
  //   value: "",
  //   error: "",
  // });
  const [referralCode, setReferralCode] = useState({
    value: "",
    error: "",
  });

  const [deliverables, setDeliverables] = useState({
    value: "",
    error: "",
  });
  const [payment_mode, setPayment_mode] = useState({
    value: "Full Payment",
    error: "",
  });
  const [cancellation_fee, setCancellation_fee] = useState({
    value: "",
    error: "",
  });
  const [other_info, setOther_info] = useState({
    value: "",
    error: "",
  });
  const [serviceAmount, setServiceAmount] = useState({
    value: "",
    error: "",
  });

  // const [date_of_completion, setDate_of_completion] = useState(new Date());
  // const [mode, setMode] = useState("date");
  // const [show, setShow] = useState(false);

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date_of_completion;
  //   setShow(Platform.OS === "ios");
  //   setDate_of_completion(currentDate);
  // };

  // const showMode = (currentMode) => {
  //   setShow(true);
  //   setMode(currentMode);
  // };

  // const showDatepicker = () => {
  //   showMode("date");
  // };

  // const showTimepicker = () => {
  //   showMode("time");
  // };

  var arr_error;
  const fillUserData = async () => {
    var userObj = await GetUser();
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

  async function onNextTransactionPress() {
    var url = "https://secufer.herokuapp.com/api/transactions/shopping/";
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
    if (data["cpty_phone"] && Array.isArray(data["cpty_phone"])) {
      arr_error = data["cpty_phone"];
      arr_error.map((ero) => {
        console.log(ero);
        setCpty_phone({ ...cpty_phone, error: ero });
      });
    }
    if (data["cpty_company"] && Array.isArray(data["cpty_company"])) {
      arr_error = data["cpty_company"];
      arr_error.map((ero) => {
        console.log(ero);
        setCpty_company({ ...cpty_company, error: ero });
      });
    }
    if (data["amount"] && Array.isArray(data["amount"])) {
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
      const confirmData = await data;
      console.log(confirmData);
      setBuyerData({ active: true, data: confirmData });
    }
  }
  async function onNextTransactionServiceProviderPress() {
    var url = "https://secufer.herokuapp.com/api/transactions/services/";
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
        cpty_full_name: cpty_full_name.value,
        cpty_phone: clientMobile.value,
        commission: user,
        deliverables: deliverables.value,
        payment_mode: payment_mode.value,
        amount: serviceAmount.value,
        other_info: other_info.value,
        coupon_code: referralCode.value,
        cancellation_fee: cancellation_fee.value,
        // date_of_completion: date_of_completion.formatUTC,
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
    if (data["cpty_full_name"] && Array.isArray(data["cpty_full_name"])) {
      arr_error = data["cpty_full_name"];
      arr_error.map((ero) => {
        console.log(ero);
        setCpty_full_name({ ...cpty_full_name, error: ero });
      });
    }
    if (data["cpty_phone"] && Array.isArray(data["cpty_phone"])) {
      arr_error = data["cpty_phone"];
      arr_error.map((ero) => {
        console.log(ero);
        setClientMobile({ ...clientMobile, error: ero });
      });
    }
    if (data["deliverables"] && Array.isArray(data["deliverables"])) {
      arr_error = data["deliverables"];
      arr_error.map((ero) => {
        console.log(ero);
        setDeliverables({ ...deliverables, error: ero });
      });
    }
    if (data["amount"] && Array.isArray(data["amount"])) {
      arr_error = data["amount"];
      arr_error.map((ero) => {
        console.log(ero);
        setServiceAmount({ ...serviceAmount, error: ero });
      });
    }
    if (data["other_info"] && Array.isArray(data["other_info"])) {
      arr_error = data["other_info"];
      arr_error.map((ero) => {
        console.log(ero);
        setOther_info({ ...other_info, error: ero });
      });
    }
    if (data["coupon_code"] && Array.isArray(data["coupon_code"])) {
      arr_error = data["coupon_code"];
      arr_error.map((ero) => {
        console.log(ero);
        setReferralCode({ ...referralCode, error: ero });
      });
    }
    if (data["cancellation_fee"] && Array.isArray(data["cancellation_fee"])) {
      arr_error = data["cancellation_fee"];
      arr_error.map((ero) => {
        console.log(ero);
        setCancellation_fee({ ...cancellation_fee, error: ero });
      });
    }

    if (!!data["form_pk"] == true) {
      const confirmData = await data;
      console.log(confirmData);
      setServicesProviderData({ active: true, data: confirmData });
    }
  }
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
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
            <>
              {user == "Buyer" ? (
                <>
                  {!confirmBuyerData.active ? (
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
                                  commission === "Buyer"
                                    ? "checked"
                                    : "unchecked"
                                }
                                onPress={() => setCommission("Buyer")}
                                disabled
                              />
                              <Text>Buyer</Text>
                              <RadioButton
                                value="Seller"
                                status={
                                  commission === "Seller"
                                    ? "checked"
                                    : "unchecked"
                                }
                                onPress={() => setCommission("Seller")}
                                disabled
                              />
                              <Text>Seller</Text>
                              <RadioButton
                                value="Share"
                                status={
                                  commission === "Share"
                                    ? "checked"
                                    : "unchecked"
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
                            make sure your seller already has a user account
                            with Secufer.
                          </Text>
                          <Button
                            mode="contained"
                            onPress={onNextTransactionPress}
                            style={{ marginTop: 24 }}
                          >
                            Next
                          </Button>
                        </>
                      </View>
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
                        <Text style={[styles.confirmValue]}>
                          {"🧑‍🦱 "}
                          {user}
                        </Text>
                        <View style={theme.separator} />

                        <Text style={[styles.confirmTitle]}>
                          Product / Service Details
                        </Text>
                        <Text style={[styles.confirmValue]}>
                          {"📄  "}
                          {confirmBuyerData.data["service_details"]}
                        </Text>
                        <View style={theme.separator} />

                        <Text style={[styles.confirmTitle]}>Commission</Text>
                        <Text style={[styles.confirmValue]}>
                          {"💰 "}
                          {confirmBuyerData.data["commission"]}
                          {" --: Currently Free"}
                        </Text>
                        <View style={theme.separator} />

                        <Text style={[styles.confirmTitle]}>Final Amount</Text>
                        <Text style={[styles.confirmValue]}>
                          {"💸 "}
                          {confirmBuyerData.data["amount"]}
                          {" ₹ "}
                        </Text>
                        <View style={theme.separator} />

                        <Text style={[styles.confirmTitle]}>
                          Registered Seller's number
                        </Text>
                        <Text style={[styles.confirmValue]}>
                          {"📞 "}
                          {confirmBuyerData.data["cpty_phone"]}
                        </Text>
                        <View style={theme.separator} />

                        <Text style={[styles.confirmTitle]}>
                          Registered Seller's Name
                        </Text>
                        <Text style={[styles.confirmValue]}>
                          {"👨‍💼 "}
                          {confirmBuyerData.data["cpty_company"]}
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
                            Ensure that it reflects the terms and conditions
                            that were negotiated.
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
                            conditions of the contract are clearly defined and
                            agreed to by all parties.
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
                              setBuyerData({
                                ...confirmBuyerData,
                                active: false,
                              });
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
                            onPress={showBuyerDialog}
                          >
                            Agree
                          </PaperButton>
                          <Portal>
                            <Dialog
                              visible={visibleBuyer}
                              onDismiss={hideBuyerDialog}
                            >
                              <Dialog.Title>Transaction Code</Dialog.Title>
                              <Dialog.Content>
                                <Paragraph>
                                  Share this link with the Seller. After the
                                  Seller confirms the transaction, you will be
                                  added to a Whatsapp Group.
                                </Paragraph>
                                <Paragraph>
                                  Transaction Link :{" "}
                                  <Text
                                    style={{
                                      color: "blue",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    https://secufer.in/api/transactions/shopping/?form_pk=
                                    {confirmBuyerData.data["form_pk"]}
                                  </Text>
                                </Paragraph>
                              </Dialog.Content>
                              <Dialog.Actions>
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
                                    letterSpacing: 0.32,
                                    paddingHorizontal: 5,
                                    color: "white",
                                    height: 21,
                                  }}
                                  mode="outlined"
                                  onPress={hideBuyerDialog}
                                >
                                  Copy
                                </PaperButton>
                              </Dialog.Actions>
                            </Dialog>
                          </Portal>
                        </View>
                      </View>
                    </ScrollView>
                  )}
                </>
              ) : (
                <>
                  {!confirmServicesProviderData.active ? (
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
                        <>
                          <TextInput
                            label="Client's Full Name *"
                            returnKeyType="next"
                            value={cpty_full_name.value}
                            onChangeText={(text) =>
                              setCpty_full_name({ value: text, error: "" })
                            }
                            error={!!cpty_full_name.error}
                            errorText={cpty_full_name.error}
                          />
                          <TextInput
                            label="Client's Mobile Number *"
                            returnKeyType="next"
                            value={clientMobile.value}
                            onChangeText={(text) =>
                              setClientMobile({ value: text, error: "" })
                            }
                            error={!!clientMobile.error}
                            errorText={clientMobile.error}
                          />
                          <Text
                            style={{
                              width: 301,
                              textAlign: "left",
                              fontSize: 17,
                              marginVertical: 12,
                            }}
                          >
                            <Text
                              style={{ color: "black", fontWeight: "bold" }}
                            >
                              Transaction Charges:
                            </Text>{" "}
                            5% of the total amount
                          </Text>

                          <TextInput
                            label="Deliverables * "
                            returnKeyType="next"
                            value={deliverables.value}
                            onChangeText={(text) =>
                              setDeliverables({ value: text, error: "" })
                            }
                            error={!!deliverables.error}
                            errorText={deliverables.error}
                          />
                          <Text
                            style={{
                              width: 301,
                              textAlign: "left",
                              fontSize: 15,
                              marginBottom: 12,
                              paddingHorizontal: 2,
                            }}
                          >
                            Mention exactly what services will be included by
                            you and what is not included. Be as specific as
                            possible.
                          </Text>
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
                              Payment Mode *
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
                                value="Full Payment"
                                status={
                                  payment_mode.value === "Full Payment"
                                    ? "checked"
                                    : "unchecked"
                                }
                                onPress={() =>
                                  setPayment_mode({
                                    value: "Full Payment",
                                    error: "",
                                  })
                                }
                                disabled
                              />
                              <Text>Full Payment</Text>
                              <RadioButton
                                value="Milestone Payment"
                                status={
                                  payment_mode.value === "Milestone Payment"
                                    ? "checked"
                                    : "unchecked"
                                }
                                onPress={() =>
                                  setPayment_mode({
                                    value: "Milestone Payment",
                                    error: "",
                                  })
                                }
                                disabled
                              />
                              <Text>Milestone Payment (Soon)</Text>
                            </View>
                          </View>
                          <TextInput
                            label="Transaction Amount * "
                            returnKeyType="next"
                            value={serviceAmount.value}
                            onChangeText={(text) =>
                              setServiceAmount({ value: text, error: "" })
                            }
                            error={!!serviceAmount.error}
                            errorText={serviceAmount.error}
                          />
                          {/* <Text
                            style={{
                              width: 301,
                              textAlign: "left",
                              fontSize: 15,
                              marginBottom: 12,
                              paddingHorizontal: 2,
                            }}
                          >
                            <Text
                              style={{ color: "black", fontWeight: "bold" }}
                            >
                              You will receive:{" "}
                            </Text>
                            Rs. {serviceAmount.value}
                            <Text
                              style={{ color: "black", fontWeight: "bold" }}
                            >
                              {"\n"}Transaction Charges:{" "}
                            </Text>
                            3%
                            <Text
                              style={{ color: "black", fontWeight: "bold" }}
                            >
                              {`\n`}Coupon Applied:{" "}
                            </Text>
                            1
                          </Text> */}
                          {/* <View
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
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  paddingHorizontal: 5,
                                  fontSize: 14,
                                  fontWeight: "bold",
                                }}
                              >
                                {date_of_completion.getFullYear() +
                                  "-" +
                                  (date_of_completion.getMonth() + 1) +
                                  "-" +
                                  date_of_completion.getDate() +
                                  " " +
                                  formatAMPM(date_of_completion)}
                              </Text>
                              <PaperButton
                                style={{
                                  paddingVertical: 5,
                                  marginRight: 2,
                                  height: 40,
                                  backgroundColor: "#04ACF3",
                                  borderRadius: 7,
                                  width: "28%",
                                }}
                                labelStyle={{
                                  fontWeight: 500,
                                  fontWeight: "bold",
                                  fontSize: 10,
                                  lineHeight: 15,

                                  color: "white",
                                  height: 21,
                                }}
                                mode="outlined"
                                onPress={async () => {
                                  showDatepicker();
                                }}
                              >
                                Set Date
                              </PaperButton>
                              <PaperButton
                                style={{
                                  paddingVertical: 5,
                                  height: 40,
                                  backgroundColor: "#04ACF3",
                                  borderRadius: 7,
                                  width: "28%",
                                }}
                                labelStyle={{
                                  fontWeight: 500,
                                  fontWeight: "bold",
                                  fontSize: 10,
                                  lineHeight: 15,

                                  color: "white",
                                  height: 21,
                                }}
                                mode="outlined"
                                onPress={async () => {
                                  showTimepicker();
                                }}
                              >
                                Set Time
                              </PaperButton>
                            </View>
                            {show && (
                              <DateTimePicker
                                testID="dateTimePicker"
                                value={date_of_completion}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                              />
                            )}
                          </View>
                          <Text
                            style={{
                              width: 301,
                              textAlign: "left",
                              fontSize: 15,
                              marginBottom: 12,
                              paddingHorizontal: 2,
                            }}
                          >
                            Date of Submission of the project
                          </Text> */}

                          <TextInput
                            label="Other Info * "
                            returnKeyType="next"
                            value={other_info.value}
                            onChangeText={(text) =>
                              setOther_info({ value: text, error: "" })
                            }
                            error={!!other_info.error}
                            errorText={other_info.error}
                          />
                          <Text
                            style={{
                              width: 301,
                              textAlign: "left",
                              fontSize: 15,
                              marginBottom: 12,
                              paddingHorizontal: 2,
                            }}
                          >
                            Mention the number of edits/revision you'll provide,
                            ownership/copyright details and additionally any
                            terms from your side.
                          </Text>
                          <TextInput
                            label="Project Cancellation Fee (From Client) * "
                            returnKeyType="next"
                            value={cancellation_fee.value}
                            onChangeText={(text) =>
                              setCancellation_fee({ value: text, error: "" })
                            }
                            error={!!cancellation_fee.error}
                            errorText={cancellation_fee.error}
                          />
                          <Text
                            style={{
                              width: 301,
                              textAlign: "left",
                              fontSize: 15,
                              marginBottom: 12,
                              paddingHorizontal: 2,
                            }}
                          >
                            If client cancels the project in between, they will
                            be charged this percentage of the amount. Confirm
                            this charge with your client.
                          </Text>
                          <TextInput
                            label="Referral code? (optional)"
                            returnKeyType="next"
                            value={referralCode.value}
                            onChangeText={(text) =>
                              setReferralCode({ value: text, error: "" })
                            }
                            error={!!referralCode.error}
                            errorText={referralCode.error}
                          />
                          <Button
                            mode="contained"
                            onPress={onNextTransactionServiceProviderPress}
                            style={{ marginTop: 24 }}
                          >
                            Next
                          </Button>
                        </>
                      </View>
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
                        <Text style={[styles.confirmValue]}>
                          {"🧑‍🦱 "}
                          {user}
                        </Text>
                        <View style={theme.separator} />

                        <Text style={[styles.confirmTitle]}>
                          Client Full Name
                        </Text>
                        <Text style={[styles.confirmValue]}>
                          {"👨‍💼 "}
                          {confirmServicesProviderData.data["cpty_full_name"]}
                        </Text>
                        <View style={theme.separator} />

                        <Text style={[styles.confirmTitle]}>
                          Client Phone Number
                        </Text>
                        <Text style={[styles.confirmValue]}>
                          {"📞 "}
                          {confirmServicesProviderData.data["cpty_phone"]}
                        </Text>
                        <View style={theme.separator} />

                        <Text style={[styles.confirmTitle]}>Deliverables</Text>
                        <Text style={[styles.confirmValue]}>
                          {"💰 "}
                          {confirmServicesProviderData.data["deliverables"]}
                        </Text>
                        <View style={theme.separator} />
                        <Text style={[styles.confirmTitle]}>Payment Mode</Text>
                        <Text style={[styles.confirmValue]}>
                          {"💸 "}
                          {confirmServicesProviderData.data["payment_mode"]}
                        </Text>
                        <View style={theme.separator} />
                        <Text style={[styles.confirmTitle]}>Other Info</Text>
                        <Text style={[styles.confirmValue,{zIndex:0}]}>
                          {"📄 "}
                          {confirmServicesProviderData.data["other_info"]}
                        </Text>
                        <View style={theme.separator} />
                        <Text style={[styles.confirmTitle]}>
                          Project Cancellation Fee
                        </Text>
                        <Text style={[styles.confirmValue]}>
                          {"⚡ "}
                          {confirmServicesProviderData.data["cancellation_fee"]}
                          {/* {" ₹ "} */}
                        </Text>
                        <View style={theme.separator} />
                        <Text style={[styles.confirmTitle]}>
                          Transaction Amount
                        </Text>
                        <Text style={[styles.confirmValue]}>
                          {"💸 "}
                          {" ₹"}
                          {confirmServicesProviderData.data["amount"]}
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
                            Ensure that it reflects the terms and conditions
                            that were negotiated.
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
                            conditions of the contract are clearly defined and
                            agreed to by all parties.
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
                              setServicesProviderData({
                                ...confirmServicesProviderData,
                                active: false,
                              });
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
                            onPress={showServiceProviderDialog}
                          >
                            Agree
                          </PaperButton>
                          <Portal>
                            <Dialog
                              visible={visibleServiceProvider}
                              onDismiss={hidesServiceProviderDialog}
                            >
                              <Dialog.Title>Transaction Code</Dialog.Title>
                              <Dialog.Content>
                                <Paragraph>
                                  Share this link with the Seller. After the
                                  Seller confirms the transaction, you will be
                                  added to a Whatsapp Group.
                                </Paragraph>
                                <Paragraph>
                                  Transaction Link:{" "}
                                  <Text
                                    style={{
                                      color: "blue",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    https://secufer.in/api/transactions/services/?form_pk=
                                    {confirmServicesProviderData.data["form_pk"]}
                                  </Text>
                                </Paragraph>
                              </Dialog.Content>
                              <Dialog.Actions>
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
                                    letterSpacing: 0.32,
                                    paddingHorizontal: 5,
                                    color: "white",
                                    height: 21,
                                  }}
                                  mode="outlined"
                                  onPress={hidesServiceProviderDialog}
                                >
                                  Copy
                                </PaperButton>
                              </Dialog.Actions>
                            </Dialog>
                          </Portal>
                        </View>
                      </View>
                    </ScrollView>
                  )}
                </>
              )}
            </>
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
