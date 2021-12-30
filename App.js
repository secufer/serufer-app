import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { Image } from "react-native";
import { theme } from "./src/core/theme";
import { navigationRef } from "./src/functions/RootNavigation";
import logout from "./src/functions/Logout";
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  Dashboard,
  OnboardingScreen,
} from "./src/screens";
import Logo from "./src/components/Logo";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="OnboardingScreen"
          screenOptions={{
            headerShown: true,
            headerStyle: {
              height: 120,
            },
            headerTitleShown: false,
            headerTintColor: null,
            headerBackground: (props) => <Logo {...props} />,
            headerBackAccessibilityLabel: false,
            headerLeft: () => null,
            headerRight: () => (
              <TouchableOpacity onPress={logout} style={theme.headerContainer}>
                <AntDesign name="logout" size={30} color="#ffca18" />
              </TouchableOpacity>
            ),
          }}
        >
          <Stack.Screen
            options={{ headerShown: false }}
            name="OnboardingScreen"
            component={OnboardingScreen}
          />
          <Stack.Screen
            name="StartScreen"
            options={{ headerShown: true, headerRight: () => null }}
            component={StartScreen}
          />
          <Stack.Screen
            name="LoginScreen"
            options={{ headerShown: true, headerRight: () => null }}
            component={LoginScreen}
          />
          <Stack.Screen
            name="RegisterScreen"
            options={{ headerShown: true, headerRight: () => null }}
            component={RegisterScreen}
          />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
