import React from "react";
import {
  Text,
  Image,
  View,
  ImageBackground,
  StyleSheet,
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Logo from "../components/Logo";
import Head from "../components/Head";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { theme } from "../core/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Dashboard({ navigation }) {
  function HomeScreen() {
    const DATA = [
      {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First Item",
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Second Item",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Third Item",
      },
    ];

    const Item = ({ title, id }) => (
      <View
        style={{
          flex: 1,
          paddingVertical: 6,
          paddingHorizontal: 6,
          flexDirection: "row",
          width: "100%",
          height: 82,
          background: "#FEFFFF",
        }}
      >
        <Text style={styles.title}>{title} + </Text>
        <Text>{id}</Text>
      </View>
    );
    const renderItem = ({ item }) => <Item title={item.title} id={item.id} />;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.container}>
          <Head>My Transaction</Head>
          <View style={styles.separator} />
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    );
  }

  function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.container}>
          <Head>Settings!</Head>
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
      screenOptions={({ route }) => ({
        tabBarStyle: { height: 81 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-list-circle" : "ios-list";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={52} color={color} />;
        },
        tabBarBackground: () => (
          <Image
            style={{ width: "100%" }}
            source={require("../assets/images/Bottom_BG_img.png")}
          />
        ),
        tabBarShowLabel:false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: 2,
  },
});
