import { View, Text, StyleSheet } from "react-native";



interface ThesisBoxProps {
  title: string;
  author: string;
  year: string;
  publisher: string;
}

export function ThesisBox({ title, author, year, publisher }: ThesisBoxProps) {

    return (
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
    )
}

const styles = StyleSheet.create({
    thesis: {
        width: 500,
        height: 200,
        borderWidth: 3,
        borderRadius: 25,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        padding: 20,
        alignItems: "center",
        justifyContent: "space-evenly",
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
})
