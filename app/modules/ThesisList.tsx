import { StyleSheet, ActivityIndicator, FlatList, Text, View, Button, TextInput, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";

const link = "discover?scope=10024%2F6&query=+nokia&rpp=30";

const uniCodes = {
  "centria": "10024%2F1900",
  "diakonia": "10024%2F1552",
  "haaga-helia": "10024%2F431",
  "hämeen": "10024%2F1766",
  "humanistinen": "10024%2F2050",
  "jyväskylä": "10024%2F5",
  "kaakkois-suomen": "10024%2F12136",
  "kajaani": "10024%2F1967",
  "Karelia": "10024%2F1620",
  "Kymenlaakson": "10024%2F1493",
  "lab": "10024%2F266372",
  "Lahden":"10024%2F10",
  "lapin": "10024%2F69720",
  "laurea": "10024%2F12",
  "Metropolia": "10024%2F6",
  "Mikkelin": "10024%2F2074",
  "oulu": "10024%2F2124",
  "poliisi": "10024%2F86551",
  "saimaan": "10024%2F1567",
  "satakunnan": "10024%2F14",
  "savonia": "10024%2F1476",
  "seinäjoen": "10024%2F1",
  "tampere": "10024%2F13",
  "turun": "10024%2F15",
  "vaasa": "10024%2F1660",
  "Yrkeshögskolan Arcada": "10024%2F4",
  "Yrkeshögskolan Novia": "10024%2F2188",
}

export default function ThesisList() {
  const stop = true;

  const [theses, setTheses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheses = async () => {
      try {
        console.log("Fetching theses...");
        const response = await fetch(`http://localhost:3000/uni/${encodeURIComponent(link)}`);
        const data = await response.json();
        setTheses(data);
      } catch (error) {
        console.error("Error fetching theses:", error);
      } finally {
        setLoading(false);
      }     
    };
    fetchTheses();
  }, [stop])
  


  return (
    <View
      style={{
        flex: 1,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <View style={styles.search}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for a thesis"
          placeholderTextColor={"#999"}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headings}>
        <View style={{...styles.title, ...{paddingLeft:10}}}>
          <Text>Title</Text>
        </View>
        <View style={{...styles.author, ...{paddingLeft:30}}}>
          <Text>Author</Text>
        </View>
        <View style={{...styles.year, ...{paddingLeft:50}}}>
          <Text>Date</Text>
        </View>
        <View style={{...styles.publisher, ...{paddingLeft:80}}}>
          <Text>Publisher</Text>
        </View>
        <View style={{...styles.year, ...{paddingLeft:30}}}>
          <Text>Link</Text>
        </View>
      </View>
      
      {
        loading ? 
        <ActivityIndicator size="large" color="#0000ff" /> 
        : 
        <FlatList
        data={theses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.singleThesis}>
            <View style={styles.title}>
              <Text style={styles.titleText}>{item.thesis.title}</Text>
            </View>
            <View style={styles.author}>
              <Text>{item.thesis.author}</Text>
            </View>
            <View style={styles.year}>
              <Text>{item.thesis.year}</Text>
            </View>
            <View style={styles.publisher}>
              <Text style={styles.publisherText}>{item.thesis.publisher}</Text>
            </View>
            <View style={styles.viewButton}>
              <Link href={{
                pathname: "/modules/SingleThesis",
                params: { 
                  handle: item.handle,
                  title: item.thesis.title,
                  author: item.thesis.author,
                  year: item.thesis.year,
                  publisher: item.thesis.publisher,
                  img: item.img
                }
              }}
              >View Thesis</Link>
            </View>
            
          </View>
        )}
      />
      }
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    marginTop: 20,
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  searchBar: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    width: "60%",
  },
  searchButton: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    width: "10%",
    alignItems: "center",
    marginLeft: 10,
  },
  headings: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    alignSelf : "center",
    justifyContent: "space-around",
    padding: 10,
    marginVertical: 15,
    flex: 1,
  },
  singleThesis: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    alignSelf : "center",
    justifyContent: "space-around",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    flex: 1,
  },
  title: {
    maxWidth: "50%",
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  author: {
    maxWidth: "15%",
    alignItems: "center",
    flex: 1,
  },
  year: {
    maxWidth: "10%",
    alignItems: "center",
    flex: 1,
  },
  publisher: {
    maxWidth: "10%",
    alignItems: "center",
    flex: 1,
  },
  publisherText: {
    textAlign: "center",
  },
  viewButton: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#008AE3",
    alignItems: "center",
    justifyContent: "center",
  },
})