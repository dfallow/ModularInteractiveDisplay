import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import QRCode from 'react-native-qrcode-svg';

export default function Index() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { title, author, year, publisher, handle, img } = params;

  const baseLink = "https://www.theseus.fi/";
  const [qrValue, setQrValue] = useState("");
  const [qrLoading, setQrLoading] = useState(true);

  useEffect(() => {
    if (typeof img === 'string') {
      const imgArray = img.split('/');
      imgArray.shift();  // Removes the first element (instead of using delete)

      console.log('Img Array:', imgArray);

      const imgString = imgArray.join('/');
      const newFile = imgString.replace(".jpg", "").replace(/=\d+&/, "=1&");

      console.log('New File Link:', newFile);

      setQrValue(baseLink + newFile);
      setQrLoading(false);
    }
  }, [img]);  // Adding img as a dependency so this runs when img changes
  
  if (qrLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is a single thesis page</Text>

      <QRCode value={qrValue} />
    </View>
  );
}
