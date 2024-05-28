import React from "react";
import { View, Image, Text, ScrollView, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppLayout from "../components/Pages/app/_layout";
import { FontAwesome, Ionicons, Feather, Octicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

const Home: React.FC = () => {
  return (
    <AppLayout backgroundColor="black">
      <View style={styles.container}>
        <View style={styles.firstContentBanner}></View>
        <View style={styles.folderDetails}>
          <View style={styles.folderDetailsS1}>
            <Text style={styles.folderDetailsS1Name1}>List: Mom Video</Text>
            <Text style={styles.folderDetailsS1Name2}>15 Videos 30 Min</Text>
          </View>
          <View style={styles.folderDetailsS2}>
            <Link href="/folders">
              <Fontisto name="share" size={34} color="white" />
            </Link>
          </View>
        </View>
        <View style={styles.folderList}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
            return (
              <View key={index} style={styles.folderListItem}>
                <View style={styles.folderListItemS1}></View>
                <View style={styles.folderListItemS2}>
                  <Text style={styles.folderListItemS2Name1}>
                    Folder {item}
                  </Text>
                  <Text style={styles.folderListItemS2Name2}>71,000 Views</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </AppLayout>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    height: "100%",
  },
  firstContentBanner: {
    width: "100%",
    height: 250,
    backgroundColor: "white",
  },
  folderDetails: {
    width: "100%",
    height: "10%",
    backgroundColor: "black",
    flexDirection: "row",
  },
  folderList: {
    width: "100%",
    height: "60%",
    // backgroundColor: "#f5f5f5",
  },
  folderDetailsS1: {
    width: "80%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 20,
  },
  folderDetailsS2: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  folderDetailsS1Name1: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  folderDetailsS1Name2: {
    fontSize: 14,
    color: "white",
  },
  folderListItem: {
    width: "100%",
    height: 120,
    flexDirection: "row",
    borderBottomColor: "#e8e8e8",
    paddingBottom: 10,
  },
  folderListItemS1: {
    width: "35%",
    height: "100%",
    backgroundColor: "#e8e8e8",
    borderRadius: 10,
  },
  folderListItemS2: {
    width: "65%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingBottom: 20,
  },
  folderListItemS2Name1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  folderListItemS2Name2: {
    fontSize: 16,
    color: "white",
  },
});
