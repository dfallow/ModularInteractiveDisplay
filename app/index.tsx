//import ThesisList from "@/modules/ThesisList";
import ThesisList from "@/app/modules/ThesisList";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import Menu from "./menu";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Menu />
    </View>
  );
}
