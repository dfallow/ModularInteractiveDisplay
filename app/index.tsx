//import ThesisList from "@/modules/ThesisList";
import ThesisList from "@/modules/ThesisList";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThesisList />
    </View>
  );
}
