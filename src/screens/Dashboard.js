import React from "react";
import { Image } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import MyTransaction from "./MyTransaction";
import CreateTransaction from "./CreateTransaction";
import JoinTransaction from "./JoinTransaction";
import UserProfile from "./UserProfile";

export default function Dashboard({ navigation }) {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="MyTransaction"
      screenOptions={({ route }) => ({
        tabBarStyle: { height: 81 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "CreateTransaction") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "JoinTransaction") {
            iconName = focused ? "person-add" : "person-add-outline";
            return <Ionicons name={iconName} size={43} color={color} />;
          } else if (route.name === "MyTransaction") {
            iconName = focused ? "home" : "home-outline";
            return <Ionicons name={iconName} size={43} color={color} />;
          } else if (route.name === "UserProfile") {
            iconName = focused ? "user-circle-o" : "user-circle";
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
        tabBarActiveTintColor: "#ffca18",
        tabBarInactiveTintColor: "white",
      })}
    >
      <Tab.Screen
        name="CreateTransaction"
        component={CreateTransaction}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="JoinTransaction"
        component={JoinTransaction}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="MyTransaction"
        component={MyTransaction}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
