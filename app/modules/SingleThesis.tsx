import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, Text, View } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import { ThesisBox } from "@/components/moduleComps/ThesisBox";

export default function Index() {
  const params = useLocalSearchParams();
  const { title, author, year, publisher, handle } = params;

  const mockKeyPoints = [
    "Innovative 5G Solution: Discover how Nokia's Endeavour tool enhances 5G system testing by solving complex data storage challenges.",
    "Efficient Debugging: Learn how a cutting-edge implementation reduces workload and optimizes error reproduction from real-world customer logs.",
    "Practical Engineering: A hands-on project using advanced tools like C++ and GTest to innovate in 5G message storage and system component testing."
    ]

  const baseLink = "https://www.theseus.fi";
  const [qrValue, setQrValue] = useState("");
  const [qrLoading, setQrLoading] = useState(true);

  const [thesisText, setThesisText] = useState("");
  const [keyPoints, setKeyPoints] = useState<String[]>([]);
  const [keyPointsLoading, setKeyPointsLoading] = useState(true);
  const [downloadLink, setDownloadLink] = useState("");

  console.log("Handle:", handle);
  const test = typeof handle === 'string' ? handle.split("/") : []

  // Used to create mock key points when AI was out of tokens
 /*  setTimeout(() => {
    setKeyPoints(mockKeyPoints);
    setKeyPointsLoading(false);
  }, 3000);
 */
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
  

  useEffect(() => {
    console.log("THESIS TEXT", thesisText)

    if (thesisText !== "") {
      const textArray = thesisText.split("\n");
      console.log("Text Array:", textArray);
      

      textArray.forEach((element, index) => {
        textArray[index] = element.substring(2).replace('.', '')
      })

      console.log("Text Array NEW:", textArray);
      setKeyPoints(textArray);
      setKeyPointsLoading(false);
    }
    

  }, [thesisText])

 

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

        <ThesisBox
          title={Array.isArray(title) ? title.join(", ") : title}
          author={Array.isArray(author) ? author.join(", ") : author}
          year={Array.isArray(year) ? year.join(", ") : year}
          publisher={Array.isArray(publisher) ? publisher.join(", ") : publisher}
        />

      </View>
      {
        keyPointsLoading ? (
          <View style={styles.screenRight}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Generating key points</Text>
          </View>
        ): (
          <View style={styles.screenRight}>
            <Text style={styles.keyPointsLabel}>Key Points:</Text>
            <Text style={styles.aiLabel}>(This text is AI generated)</Text>
            <View style={styles.generatedTextBox}>
              {
                keyPoints.map(str => {
                  return (
                    <View style={styles.keyPoint}>
                      <Text style={styles.keyPointText}>{'\u2B24'}</Text>
                      <Text style={styles.keyPointText}>{str}</Text>
                    </View>
                  )
                })
              }
            </View>
      
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
    margin: 5,
    backgroundColor: "#ffffff",
  },
  screenLeft: {
    flex: 0.4,
    height: '100%',
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  screenRight: {
    flex: 0.6,
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
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
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
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
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
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
  keyPointsLabel: {
    alignSelf: "flex-start",
    marginLeft: "5%",
    fontFamily: "sans-serif",
    fontSize:28,
    opacity: 0.7,
    fontWeight: "bold",
  },
  aiLabel: {
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginBottom: 10,
    fontFamily: "sans-serif",
    fontSize:16,
    opacity: 0.7,
  },
  generatedTextBox: {
    padding: 0,
    width: "90%",
  },
  keyPoint: {
    flexDirection: "row",
    paddingVertical: 5,
    alignItems: "center",
  },
  keyPointText: {
    marginLeft: 10,
    fontSize: 32,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginBottom: 5,
    fontFamily: "sans-serif",
  },
  generatedText: {

  }
})
