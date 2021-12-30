import React from "react";
import { Text, View, FlatList } from "react-native";

import Head from "../components/Head";

import { theme } from "../core/theme";

import { AntDesign } from "@expo/vector-icons";

export default function MyTransaction() {
  const DATA = [
    {
      id: "bd7ac",
      title: "Buy & Sell Transaction",
      price: "22.00",
      info: "Watting for Seller To Join",
    },
    {
      id: "3ac68",
      title: "Buy & Sell Transaction",
      price: "22.00",
      info: "Watting for Seller To Join",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Buy & Sell Transaction",
      price: "22.00",
      info: "Watting for Seller To Join",
    },
    {
      id: "58694a0f-3da1-41f-bd96-145571e29d72",
      title: "Buy & Sell Transaction",
      price: "22.00",
      info: "Watting for Seller To Join",
    },
    {
      id: "5869a0f-3da-471f-bd96-145571e29d72",
      title: "Buy & Sell Transaction",
      price: "22.00",
      info: "Watting for Seller To Join",
    },
    {
      id: "58694a0f-da1-471f-bd96-145571e29d72",
      title: "Buy & Sell Transaction",
      price: "22.00",
      info: "Watting for Seller To Join",
    },
    {
      id: "5869a0f-da1-471f-bd96-145571e29d72",
      title: "Buy & Sell Transaction",
      price: "22.00",
      info: "Watting for Seller To Join",
    },
    {
      id: "58694f-da1-471f-bd96-145571e29d72",
      title: "Buy & Sell Transaction",
      price: "22.00",
      info: "Watting for Seller To Join",
    },
  ];

  const Item = ({ title, id, price, info }) => (
    <View style={theme.titleContainer}>
      <Text style={theme.title}>{title} </Text>

      <View style={theme.titleSubContainer}>
        <Text style={theme.subTitlePrice}>$ {price}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <AntDesign name="exclamationcircle" size={26} color="#04ACF3" />
          <Text style={theme.subTitleInfo}>{info}</Text>
        </View>
      </View>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item title={item.title} id={item.id} price={item.price} info={item.info} />
  );
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={theme.container}>
        <Head>My Transaction</Head>
        <View style={theme.separator} />
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}
