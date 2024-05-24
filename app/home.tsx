import React from "react";
import { View, Image, Text, ScrollView, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppLayout from "../components/Pages/app/_layout";
import { Link } from "expo-router";

const Home: React.FC = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  return (
    <AppLayout>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Image
            style={styles.avatarImage}
            source={require("../assets/images/app/avatar.png")}
          />
        </View>
        <View style={styles.audioContainer}>
          <Image
            style={styles.audioImage}
            source={require("../assets/images/logo.png")}
          />
          <View style={styles.actionContainer}>
            {showMenu && (
              <View>
                <View style={styles.circle}>
                  <Link href="/message">
                    <MaterialCommunityIcons
                      name="message-text-outline"
                      size={34}
                      color="white"
                    />
                  </Link>
                </View>
                <View style={styles.circle}>
                  <Link href="/account">
                    <MaterialIcons name="person-2" size={34} color="white" />
                  </Link>
                </View>
                <View style={styles.circle}>
                  <Pressable onPress={() => setShowMenu(!showMenu)}>
                    <AntDesign name="back" size={34} color="white" />
                  </Pressable>
                </View>
              </View>
            )}
            <Pressable onPress={() => setShowMenu(!showMenu)}>
              <AntDesign name="pluscircle" size={65} color="black" />
            </Pressable>
          </View>
        </View>
      </View>
    </AppLayout>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
  },
  avatarContainer: {
    width: "100%",
    flexDirection: "row",
    height: "85%",
    justifyContent: "flex-start",
  },
  avatar: {
    width: "80%",
    height: "85%",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  audioContainer: {
    flex: 1,
    overflow: "hidden",
    alignItems: "flex-end",
    marginTop: 20,
    width: "20%",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  audioImage: {
    width: "80%", // Adjust width according to your needs
    height: 35,
  },
  plus: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  actionContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
