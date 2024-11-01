import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, Text, View } from "react-native";
import QRCode from 'react-native-qrcode-svg';

export default function Index() {
  const params = useLocalSearchParams();
  const { title, author, year, publisher, handle, img } = params;

  const baseLink = "https://www.theseus.fi/";
  const [qrValue, setQrValue] = useState("");
  const [qrLoading, setQrLoading] = useState(true);

  const [thesisText, setThesisText] = useState("");
  

  useEffect(() => {

    const downloadThesis = async (link: string) => {
      try {
        console.log("Downloading thesis...");
        console.log("QR Value:", qrValue);
        const response = await fetch(`http://127.0.0.1:5000/download?key=${link}`, {
          mode: 'cors'
        });
        setThesisText(await response.text());
      } catch (error) {
        console.error("Error downloading thesis:", error);
      }
    }

    if (typeof img === 'string') {
      const imgArray = img.split('/');
      imgArray.shift();  // Removes the first element (instead of using delete)

      console.log('Img Array:', imgArray);

      const imgString = imgArray.join('/');
      const newFile = imgString.replace(".jpg", "").replace(/=\d+&/, "=1&");

      console.log('New File Link:', newFile);

      
      setQrValue(baseLink + newFile);
      setQrLoading(false);
        console.log("QR Value:", newFile);
        console.log("key sent to python:", newFile);
        
        downloadThesis(newFile);

        console.log("Test:", thesisText);
    }

  }, [img, thesisText]);  // Adding img as a dependency so this runs when img changes
  

  useEffect(() => {
    if (thesisText !== "") {
      console.log("Thesis Text:", thesisText);
    }

  }, [thesisText]);

  if (qrLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>

      <View style={styles.screenLeft}>
        <QRCode 
          value={qrValue}
          size={300}
           />
        <View style={styles.thesisInfoBox}>
          <Text style={styles.thesisTitle}>{title}</Text>
          <View style={styles.thesisAuthDate}>
            <Text>{author}</Text>
            <Text>({year})</Text>
          </View>
          
          <Text>{publisher}</Text>
        </View>

      </View>
      <View style={styles.screenRight}>
        <Text>This is a single thesis page</Text>
      </View>
      

      
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    margin: 5,
    backgroundColor: "#ffffff",
  },
  screenLeft: {
    flex: 0.4,
    height: '100%',
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 1,
  },
  screenRight: {
    flex: 0.6,
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  qrCode: {

  },
  thesisInfoBox: {
      borderWidth: 1,
      padding: 10,
  },
  thesisTitle: {
    padding: 5,
    fontSize: 24,
  },
  thesisAuthDate: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 5,
  },
  thesisInfo: {
      
  },
  generatedTextBox: {

  },
  generatedText: {

  }
})
