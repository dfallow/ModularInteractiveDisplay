import { StyleSheet, ActivityIndicator, FlatList, Text, View } from "react-native";
import * as cheerio from "cheerio";

import * as ThesisFn from "@/scripts/theses.js";
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
        console.log("Theses:", data);
      } catch (error) {
        console.error("Error fetching theses:", error);
      } finally {
        setLoading(false);
      }     
    };
    fetchTheses();
  })
  
  if (loading) {
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
      <FlatList
        data={theses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.title}</Text>
            <Text>{item.author}</Text>
            <Text>{item.year}</Text>
            <Text>{item.publisher}</Text>
          </View>
        )}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  
})