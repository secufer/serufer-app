import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import Paragraph from "../components/Paragraph";
import { theme } from "../core/theme";
import GetUser from "../functions/GetUser";
import logout from "../functions/Logout";
import Button from "../components/Button";
export default function UserProfile() {
  const [user, setUser] = useState(false);
  const fillData = async () => {
    var us = await GetUser();
    setUser(us);
    // console.log(user);
  };
  useEffect(() => {
    fillData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://bootdey.com/img/Content/avatar/avatar6.png",
            }}
          />

          <Paragraph style={styles.name}>
            {user["first_name"] + " " + user["last_name"]}
          </Paragraph>
        </View>
      </View>

      <View style={theme.separator} />
      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            flexWrap: "nowrap",
            paddingVertical: 10,
            borderRadius: 6,
          }}
        >
          <Text style={[styles.confirmTitle]}>User Type</Text>
          {user["user_type"]?.map((paragraph) => (
            <Text style={[styles.confirmValue]}>{paragraph}</Text>
          ))}
          <View style={styles.separator} />

          <Text style={[styles.confirmTitle]}>First Name</Text>
          <Text style={[styles.confirmValue]}>{user["first_name"]}</Text>
          <View style={styles.separator} />

          <Text style={[styles.confirmTitle]}>Last Name</Text>
          <Text style={[styles.confirmValue]}>{user["last_name"]}</Text>
          <View style={styles.separator} />

          <Text style={[styles.confirmTitle]}>Phone Number</Text>
          <Text style={[styles.confirmValue]}>{user["phone_number"]}</Text>
          <View style={styles.separator} />

          <Text style={[styles.confirmTitle]}>Email</Text>
          <Text style={[styles.confirmValue]}>{user["email"]}</Text>
          <View style={styles.separator} />
          <View style={{ alignItems: "center" }}>
            <Button mode="contained" onPress={logout} style={{ marginTop: 24 }}>
              Log-Out
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  confirmTitle: {
    fontSize: 24,
    paddingHorizontal: 10,
    fontWeight: "bold",
    lineHeight: 30,
    letterSpacing: 0.15008,
    paddingVertical: 5,
  },
  separator: {
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "98%",
    overflow: "hidden",
    borderBottomColor: "#778899",
    borderBottomWidth: 2,
  },
  confirmValue: {
    fontSize: 18,
    paddingHorizontal: 13,
    paddingVertical: 5,
  },
  header: {
    backgroundColor: "#f2f2f2",
  },
  headerContent: {
    padding: 30,
    alignItems: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: "600",
  },
  userInfo: {
    fontSize: 16,
    color: "#f2f2f2",
    fontWeight: "600",
  },
  body: {
    backgroundColor: "#f2f2f2",
    height: 500,
    marginTop: 30,
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  infoContent: {
    flex: 1,
    alignItems: "center",
    paddingLeft: 5,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "#778899",
    textAlignVertical: "center",
  },
  infoHader: {},
  container: {
    flex: 1,
    width: "100%",
  },
});
