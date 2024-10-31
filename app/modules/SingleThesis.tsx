import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, Text, View } from "react-native";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import QRCode from 'react-native-qrcode-svg';
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true
});

//import pdfjs from "pdfjs-dist/es5/build/pdf";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

//const PDFExtract = require('pdf.js-extract').PDFExtract;

const url = "https://www.theseus.fi/bitstream/handle/10024/506961/Vainola_Lassi.pdf?sequence=2&isAllowed=y";
export default function Index() {
  const router = useRouter();
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
       //const response = await fetch(`http://localhost:3000/download?handle=${link}`);
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

      /* fetch(`http://localhost:5000/download`)  // This is the link to the backend server
        .then(response => response.json())
        .then(data => {
          console.log('Data:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        }); */
        console.log("QR Value:", newFile);
        console.log("key sent to python:", newFile);
        
        const test = downloadThesis(newFile);

        console.log("Test:", thesisText);
    }

    
    

    //var link = document.createElement('a');
    //link.href = url;
    //link.download = 'file.pdf';
    //link.dispatchEvent(new MouseEvent('click'));
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
