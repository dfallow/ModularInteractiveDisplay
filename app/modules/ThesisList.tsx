import { StyleSheet, ActivityIndicator, FlatList, Text, View, Button, TextInput, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { SearchBar } from "react-native-screens";


export default function ThesisList() {

  const [theses, setTheses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheses = async () => {
      try {
        const response = await fetch("http://localhost:3000/theses");
        const data = await response.json();
        setTheses(data);
      } catch (error) {
        console.error("Error fetching theses:", error);
      } finally {
        setLoading(false);
      }     
    };
    fetchTheses();
  }, )
  


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
        <View style={styles.title}>
          <Text>Name</Text>
        </View>
        <View style={styles.author}>
          <Text>Author</Text>
        </View>
        <View style={styles.year}>
          <Text>Date</Text>
        </View>
        <View style={styles.publisher}>
          <Text>Publisher</Text>
        </View>
        <View style={styles.year}>
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
              <Text>{item.thesis.publisher}</Text>
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
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    flex: 1,
  },
  singleThesis: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    alignSelf : "center",
    justifyContent: "space-around",
    borderWidth: 1,
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
  viewButton: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#008AE3",
    alignItems: "center",
    justifyContent: "center",
  },
})