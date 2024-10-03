import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const params = useLocalSearchParams();
  console.log("Index params:", params);
  const { title, author, year, publisher, handle, img } = params;

  console.log('Title:', title);
  console.log('Author:', author);
  console.log('Year:', year);
  console.log('Publisher:', publisher);
  console.log('Handle:', handle);
  console.log('Img:', img);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is single thesis page</Text>
    </View>
  );
}
