import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, Text, View } from "react-native";
import QRCode from 'react-native-qrcode-svg';

export default function Index() {
  const params = useLocalSearchParams();
  const { title, author, year, publisher, handle, img } = params;

  const baseLink = "https://www.theseus.fi";
  const [qrValue, setQrValue] = useState("");
  const [qrLoading, setQrLoading] = useState(true);

  const [thesisText, setThesisText] = useState("");
  const [keyPointsLoading, setKeyPointsLoading] = useState(true);
  const [downloadLink, setDownloadLink] = useState("");

  console.log("Handle:", handle);
  const test = typeof handle === 'string' ? handle.split("/") : []

  console.log("Test:", test);
  // Used to get the download link for the thesis
  useEffect(() => {
    const fetchDownloadLink = async () => {
      try {
        console.log("FUll link:", handle);
        const response = await fetch(`http://localhost:3000/single-thesis${handle}`, {
          mode: 'cors',
        });
        const data = await response.text();
        console.log("Download Link:", data);
        setDownloadLink(data);
      } catch (error) {
        console.error("Error fetching download link:", error);
      }
    };
    fetchDownloadLink();
  }, []);
  
  // Used to download thesis and generate key points with AI
  useEffect(() => {
    
    const downloadThesis = async (link: string) => {
      try {
        console.log("Downloading thesis...", link);
        const response = await fetch(`http://127.0.0.1:5000/download?key=${link}`, {
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin':'*'
          }
        });
        setThesisText(await response.text());
        setKeyPointsLoading(false);

        //console.log("Thesis Text:", await response.text());
        //setQrLoading(false);
      } catch (error) {
        console.error("Error downloading thesis:", error);
      }
    }

    if (downloadLink != "") {
      console.log("Download Link:", downloadLink);
      downloadThesis(downloadLink);
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
        //console.log("Test:", thesisText);
    } 

  }, [downloadLink]); 
  

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
      {
        keyPointsLoading ? (
          <View style={styles.screenRight}>
            <Text>This is a single thesis page</Text>
          </View>
        ): (
          <View style={styles.screenRight}>
            <Text>{thesisText}</Text>
          </View>
        )
      }
      
      

      
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
