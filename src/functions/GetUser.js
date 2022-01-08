import * as SecureStore from "expo-secure-store";

export default async function GetUser() {
  const user = await SecureStore.getItemAsync("User");
  console.log(JSON.parse(user));
  return JSON.parse(user);
}
