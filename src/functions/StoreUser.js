import * as SecureStore from "expo-secure-store";

export default async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}
