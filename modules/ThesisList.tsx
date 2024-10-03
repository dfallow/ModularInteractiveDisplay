import { Text, View } from "react-native";
import * as cheerio from "cheerio";

import * as ThesisFn from "@/scripts/theses.js";
import { useEffect, useState } from "react";


export default function ThesisList() {

  const [theses, setTheses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
     
        const response = await fetch("http://localhost:3000/theses");
      
    }
  })
  

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit modules/ThesisList.tsx to edit this test.</Text>
      
    </View>
  );
}