import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import { theme } from "./src/core/theme";
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  Dashboard,
  OnboardingScreen,
} from "./src/screens";
import Logo from "./src/components/Logo";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
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
          }}
        >
          <Stack.Screen
            options={{ headerShown: false }}
            name="OnboardingScreen"
            component={OnboardingScreen}
          />
          <Stack.Screen
            name="StartScreen"
            options={{ headerShown: true }}
            component={StartScreen}
          />
          <Stack.Screen
            name="LoginScreen"
            options={{ headerShown: true }}
            component={LoginScreen}
          />
          <Stack.Screen
            name="RegisterScreen"
            options={{ headerShown: true }}
            component={RegisterScreen}
          />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
