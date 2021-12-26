import React from "react";
import {
  Text,
  Image,
  View,
  ImageBackground,
  StyleSheet,
  FlatList,
} from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Logo from "../components/Logo";
import Head from "../components/Head";
// import HeaderTitle from "../components/HeaderTitle";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { theme } from "../core/theme";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
import MyTransaction from "./MyTransaction";

export default function Dashboard({ navigation }) {
  function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={theme.container}>
          <Head>Sy</Head>
          <Paragraph>
            Your amazing app starts here. Open you favorite code editor and
            start editing this project.
          </Paragraph>
          <Button
            mode="outlined"
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "StartScreen" }],
              })
            }
          >
            Logout
          </Button>
        </View>
      </View>
    );
  }
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarStyle: { height: 81 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Setting") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "person-add" : "person-add-outline";
            return <Ionicons name={iconName} size={43} color={color} />;
          } else if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            return <Ionicons name={iconName} size={43} color={color} />;
          } else if (route.name === "ome") {
            iconName = focused ? "user-circle" : "user-circle-o";
            return <FontAwesome name={iconName} size={43} color={color} />;
          }
          return <Ionicons name={iconName} size={52} color={color} />;
        },
        tabBarBackground: () => (
          <Image
            style={{ width: "100%" }}
            source={require("../assets/images/Bottom_BG_img.png")}
          />
        ),
        tabBarShowLabel: false,
        tabBarActiveTintColor: "rgba(109, 102, 102, 100)",
        tabBarInactiveTintColor: "white",
      })}
    >
      <Tab.Screen
        name="Setting"
        component={MyTransaction}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Home"
        component={MyTransaction}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="ome"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
