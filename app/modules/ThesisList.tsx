import { StyleSheet, ActivityIndicator, FlatList, Text, View, Button, TextInput, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import SelectDropdown from 'react-native-select-dropdown'
import { ThesisBox } from "@/components/moduleComps/ThesisBox";
import { Hoverable, Pressable } from "react-native-web-hover";

const uniCodes = [
  {"uni": "Centria", "code": "10024%2F1900"},
  {"uni": "Diakonia", "code": "10024%2F1552"},
  {"uni": "Haaga-Helia", "code": "10024%2F431"},
  {"uni": "Hämeen", "code": "10024%2F1766"},
  {"uni": "Humanistinen", "code": "10024%2F2050"},
  {"uni": "Jyväskylä", "code": "10024%2F5"},
  {"uni": "Kaakkois-suomen", "code": "10024%2F12136"},
  {"uni": "Kajaani", "code": "10024%2F1967"},
  {"uni": "Karelia", "code": "10024%2F1620"},
  {"uni": "Kymenlaakson", "code": "10024%2F1493"},
  {"uni": "Lab", "code": "10024%2F266372"},
  {"uni": "Lahden", "code":"10024%2F10"},
  {"uni": "Lapin", "code": "10024%2F69720"},
  {"uni": "Laurea", "code": "10024%2F12"},
  {"uni": "Metropolia", "code": "10024%2F6"},
  {"uni": "Mikkelin", "code": "10024%2F2074"},
  {"uni": "Oulu", "code": "10024%2F2124"},
  {"uni": "Poliisi", "code": "10024%2F86551"},
  {"uni": "Saimaan", "code": "10024%2F1567"},
  {"uni": "Satakunnan", "code": "10024%2F14"},
  {"uni": "Savonia", "code": "10024%2F1476"},
  {"uni": "Seinäjoen", "code": "10024%2F1"},
  {"uni": "Tampere", "code": "10024%2F13"},
  {"uni": "Turun", "code": "10024%2F15"},
  {"uni":  "Vaasa", "code": "10024%2F1660"},
  {"uni": "Yrkeshögskolan Arcada", "code": "10024%2F4"},
  {"uni":  "Yrkeshögskolan Novia", "code": "10024%2F2188"},
];

const linkStart = "discover?scope=";
const linkEnd = "&query=+nokia&rpp=30";
export default function ThesisList() {

  const [selectedItem, setSelectedItem] = useState<any>([uniCodes[0].uni, uniCodes[0].code]);
  const [searchedUni, setSearchedUni] = useState<any>(uniCodes[0].code);
  const [theses, setTheses] = useState<any[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  //Fetches thesis list, runs when user clicks search button
  useEffect(() => {
    const fetchTheses = async () => {
      try {
        console.log("Fetching theses from...", linkStart + searchedUni + linkEnd);
        const response = await fetch(`http://localhost:3000/uni/${encodeURIComponent(linkStart + searchedUni + linkEnd)}`);
        const data = await response.json();
        setTheses(data);
      } catch (error) {
        console.error("Error fetching theses:", error);
      } finally {
        setLoading(false);
      }     
    };
    fetchTheses();
  }, [searchedUni])
  
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
        <SelectDropdown
          data={uniCodes}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
            setSelectedItem([selectedItem.uni, selectedItem.code]);
          }}
          renderButton={() => {
            return (
              <View>
                <Text style={{color: 'black', fontSize: 16}}>{selectedItem[0]}</Text>
              </View>
            );
          
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View>
                <Text style={{color: 'black', fontSize: 16}}>{item.uni}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={true}
        />
        <TouchableOpacity style={styles.searchButton}
          onPress={() => {
            setTheses([]);
            setSearchedUni(selectedItem[1]);
          }}
        >
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
      
      
      {
        loading ? 
        <ActivityIndicator size="large" color="#0000ff" /> 
        : 
        <FlatList
        data={theses}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
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
          >
          <Hoverable 
            style={styles.singleThesis}
          >
            {({ hovered }) => (
              <View>
                
                <ThesisBox 
                  title={item.thesis.title}
                  author={item.thesis.author}
                  year={item.thesis.year}
                  publisher={item.thesis.publisher}
                />
                {hovered && 
                  <View style={styles.hovered}>
                    <Text style={styles.hoveredText}>Click to view</Text>
                  </View>
                }
              </View>

            )}
            
            
            
          </Hoverable>
          </Link>
        )}
      />
      }
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    marginVertical: 20,
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
    padding: 10,
    height: 250,
  },
  hovered: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
    borderRadius: 25,
    opacity: 0.7,
  },
  hoveredText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
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