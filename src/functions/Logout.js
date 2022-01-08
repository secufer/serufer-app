import { Alert } from "react-native";
import * as RootNavigation from "./RootNavigation";
import * as SecureStore from "expo-secure-store";
export default function logout() {
  Alert.alert("Logout", "Do you want to logout", [
    {
      text: "Cancel",
      onPress: () => {
        return;
      },
      style: "cancel",
    },
    {
      text: "OK",
      onPress: async () => {
        try {
          await SecureStore.deleteItemAsync("token");
          await SecureStore.deleteItemAsync("User");
          RootNavigation.navigate("StartScreen");
        } catch (err) {
          console.log("OK Pressed" + " " + err);
        }
      },
    },
  ]);
}
