//import ThesisList from "@/modules/ThesisList";
import ThesisList from "@/app/modules/ThesisList";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <Link href="/modules/ThesisList">View Theses</Link>
    </View>
  );
}
