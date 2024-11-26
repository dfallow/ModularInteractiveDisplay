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

      } catch (error) {
        console.error("Error downloading thesis:", error);
      }
    }

    if (downloadLink != "") {
      console.log("Download Link:", downloadLink);
      const QrLink = baseLink + downloadLink.slice(1, -1);
      setQrValue(QrLink);
      setQrLoading(false);
      downloadThesis(downloadLink);
    }  

  }, [downloadLink]); 
  

 

  return (
    <View style={styles.screen}>

      <View style={styles.screenLeft}>

        { qrLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ): (
          <View style={styles.qrElement}>
            <View style={styles.qrCodeOutline}>
              <View style={styles.qrCode}>
                <QRCode 
                value={qrValue}
                size={300}
                />
              
              </View>
            </View>
            <View style={styles.qrCodeOutlinePoint}>
              <View style={styles.qrCodeOutlingPointHide} />
            </View>
            <View style={styles.qrCodeTextBox}>
              <Text style={styles.qrCodeText}>Scan to download</Text>
            </View>
          </View>
          
        )}

        <View style={styles.thesis}>
          
          <Text style={styles.thesisTitle}>{title}</Text>
          <View style={styles.thesisRow}>  
            <View style={styles.thesisGroup}>
              <Text style={styles.thesisLabel}>Author:</Text>
              <Text style={styles.thesisInfo}>{author}</Text>
            </View>
            <View style={styles.thesisGroup}>
              <Text style={styles.thesisLabel}>Published:</Text>
              <Text style={styles.thesisInfo}>{year}</Text>
            </View>
          </View>
          <View style={styles.thesisPublisher}>
            <Text style={styles.thesisLabel}>Publisher:</Text>
            <Text style={styles.thesisInfo}>{publisher}</Text>
          </View>
          
        </View>

      </View>
      {
        keyPointsLoading ? (
          <View style={styles.screenRight}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Generating key points</Text>
          </View>
        ): (
          <View style={styles.screenRight}>
            <Text>{thesisText}</Text>
            <Text>(This text is AI generated)</Text>
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
  qrElement: {
    borderWidth: 0,
  },
  qrCodeOutline: {
    borderWidth: 5,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  qrCodeOutlinePoint: {
    position: "absolute",
    bottom: -20,
    left: "40%",
    borderWidth: 5,
    width: 40,
    height: 40,
    transform: [{ rotate: "45deg" }],
    backgroundColor: "white",
    borderTopStartRadius: 50,
  },
  qrCodeOutlingPointHide: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderTopStartRadius: 20,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  qrCode: {
    alignItems: "center",
    justifyContent: "space-between",
    height: "90%",
  },
  qrCodeTextBox: {
    position: "absolute",
    bottom: -60,
    left: "20%",
  },
  qrCodeText: {
    fontSize: 24,
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
  thesis: {
    width: 500,
    borderWidth: 3,
    borderRadius: 25,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    padding: 20,
    alignItems: "center",
  },
  thesisTitle: {
    padding: 5,
    fontSize: 20,
    fontFamily: "sans-serif",
  },
  thesisRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  thesisGroup: {
    width: 220,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  thesisLabel: {
    fontSize: 16,
    opacity: 0.5,
  },
  thesisInfo: {
    fontSize: 20,
    marginLeft: 5,
  },
  thesisPublisher: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: 460,
  },
  generatedTextBox: {

  },
  generatedText: {

  }
})
