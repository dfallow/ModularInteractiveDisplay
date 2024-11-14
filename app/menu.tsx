//import ThesisList from "@/modules/ThesisList";
import ThesisList from "@/app/modules/ThesisList";
import { Link } from "expo-router";
import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";

export default function Menu() {
  return (
    <View style={styles.screen}>
      <View style={styles.navButtonBox}>
    
        <Pressable
          onPress={() => window.location.href = "/modules/ThesisList"}
          style={styles.navButton}
        >
            <Text style={styles.navButtonText}>Thesis Search</Text>
        </Pressable>
        <Pressable
          onPress={() => window.location.href = "/modules/ThesisList"}
          style={styles.navButton}
        >
            <Text style={styles.navButtonText}>Innovation Projects</Text>
        </Pressable>
        <Pressable
          onPress={() => window.location.href = "/modules/ThesisList"}
          style={styles.navButton}
        >
            <Text style={styles.navButtonText}>Upcoming Events</Text>
        </Pressable>
        <Pressable
          onPress={() => window.location.href = "/modules/ThesisList"}
          style={styles.navButton}
        >
            <Text style={styles.navButtonText}>Settings</Text>
        </Pressable>      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "#ffffff",
        width: "80%",
        marginBottom: 20,
    },
    navButtonBox: {
        width: "100%",
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    navButton: {
        width: "10%",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: "#008AE3",
    },
    navButtonText: {
        borderWidth: 1,
        textAlign: "center",
    },
})
