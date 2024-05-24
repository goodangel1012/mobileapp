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

const Home: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = React.useState(0);

  const Folder = ({ data }: { data: number[] }) => {
    return (
      <View style={styles.avatarInner}>
        {data.map((item, index) => (
          <View key={index} style={styles.folder}>
            {selectedFolder != item ? (
              <Pressable onPress={() => setSelectedFolder(item)}>
                <Text style={styles.name}>Folder {item}</Text>
                <FontAwesome name="folder" size={100} color="black" />
              </Pressable>
            ) : (
              <Pressable onPress={() => setSelectedFolder(0)}>
                <Text style={styles.nameOpen}>Folder {item}</Text>
                <FontAwesome6 name="folder-open" size={100} color="black" />
              </Pressable>
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <AppLayout>
      <View style={styles.avatarContainer}>
        <View style={styles.audioContainer}>
          <Image
            style={styles.audioImage}
            source={require("../assets/images/logo.png")}
          />
        </View>
        <View style={styles.avatar}>
          <View style={styles.avatarInner}>
            <Folder data={[1, 2, 3, 4, 5, 6, 7, 8, 9]} />
          </View>
        </View>
        <View style={styles.action}>
          <Link href="/contact_details">
            <AntDesign name="back" size={50} color="black" />
          </Link>
          <AntDesign name="up" size={50} color="black" />
          <AntDesign name="down" size={50} color="black" />
        </View>
        {selectedFolder != 0 && (
          <View style={styles.menu}>
            <Link href="/folder_details">
              <Text style={styles.menuItem}>Video</Text>
            </Link>
            <Link href="/folder_details">
              <Text style={styles.menuItem}>Images</Text>
            </Link>
            <Link href="/folder_details">
              <Text style={styles.menuItem}>Doc</Text>
            </Link>
          </View>
        )}
      </View>
    </AppLayout>
  );
};

export default Home;

const styles = StyleSheet.create({
  avatarContainer: {
    width: "100%",
    flexDirection: "column",
    height: "85%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  avatar: {
    width: "100%",
    height: "60%",
    overflow: "hidden",
    backgroundColor: "#e8e8e8",
    justifyContent: "center",
    alignItems: "center",
  },
  action: {
    width: "100%",
    height: "10%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#e8e8e8",
    marginTop: 20,
  },
  menu: {
    width: "100%",
    height: "10%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#e8e8e8",
    marginTop: 20,
  },
  menuItem: {
    fontSize: 20,
    color: "black",
  },
  audioContainer: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  audioImage: {
    width: 60, // Adjust width according to your needs
    height: 35,
  },
  avatarInner: {
    width: "100%",
    height: "100%",
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  folder: {
    padding: 15,
    position: "relative",
  },
  name: {
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 45,
    left: 12,
    zIndex: 1,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  nameOpen: {
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 55,
    left: 25,
    zIndex: 1,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
