import { StyleSheet, ActivityIndicator, FlatList, Text, View, Button } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";


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
  
  if (loading) {
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <FlatList
        data={theses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.thesis.title}</Text>
            <Text>{item.thesis.author}</Text>
            <Text>{item.thesis.year}</Text>
            <Text>{item.thesis.publisher}</Text>

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
        )}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({

})