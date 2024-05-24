import React from "react";
import { View, Image, Text, ScrollView, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppLayout from "../components/Pages/app/_layout";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

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
          <Text style={styles.name}> John Doe</Text>
          <Text style={styles.description}>A Positive person</Text>
        </View>
        <View style={styles.middle}>
          <View style={styles.friends}>
            <Text style={styles.value}>646</Text>
            <Text style={styles.lable}>Friends</Text>
          </View>
          <View style={styles.followers}>
            <Text style={styles.value}>123</Text>
            <Text style={styles.lable}>Friends</Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.buttomCard}>
            <View>
              <Ionicons name="mail-sharp" size={24} color="black" />
            </View>
            <View style={styles.bottomTextContainer}>
              <Text style={styles.bottomText}>Email</Text>
            </View>
            <View>
              <FontAwesome5 name="pen" size={20} color="black" />
            </View>
          </View>
          <View style={styles.buttomCard}>
            <View>
              <Fontisto name="credit-card" size={16} color="black" />
            </View>
            <View style={styles.bottomTextContainer}>
              <Text style={styles.bottomText}>Credit Card</Text>
            </View>
            <View>
              <FontAwesome5 name="pen" size={20} color="black" />
            </View>
          </View>
          <View style={styles.buttomCard}>
            <View>
              <Fontisto name="locked" size={24} color="black" />
            </View>
            <View style={styles.bottomTextContainer}>
              <Text style={styles.bottomText}>Password</Text>
            </View>
            <View>
              <FontAwesome5 name="pen" size={20} color="black" />
            </View>
          </View>
          <View style={styles.buttomCard}>
            <View>
              <FontAwesome5 name="pen" size={20} color="black" />
            </View>
            <View style={styles.bottomTextContainer}>
              <Text style={styles.bottomText}>Edit Profile</Text>
            </View>
            <View>
              <FontAwesome5 name="pen" size={20} color="black" />
            </View>
          </View>
        </View>
        <View style={styles.audioContainer}>
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
                  <Link href="/profile">
                    <MaterialIcons name="person-2" size={34} color="white" />
                  </Link>
                </View>
                <View style={styles.circle}>
                  <Link href="/home">
                    <AntDesign name="back" size={34} color="white" />
                  </Link>
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
  avatarContainer: {
    width: "100%",
    flexDirection: "column",
    height: "100%",
  },
  avatar: {
    width: "100%",
    height: "60%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  middle: {
    width: "100%",
    height: "10%",
    backgroundColor: "black",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  avatarImage: {
    width: "80%",
    height: "80%",
  },
  audioContainer: {
    alignItems: "flex-end",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: "black",
    position: "absolute",
    bottom: 0,
  },
  audioImage: {
    width: "80%", // Adjust width according to your needs
    height: 35,
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
  name: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
  },
  description: {
    fontSize: 20,
    color: "#666",
  },
  friends: {
    width: "40%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  followers: {
    width: "40%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  bottom: {
    width: "100%",
    height: "30%",
    // backgroundColor: "red",
    marginTop: 10,
  },
  actionContainer: {
    position: "absolute",
    bottom: 0,
  },
  value: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  lable: {
    color: "white",
    fontSize: 15,
  },
  buttomCard: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomTextContainer: {
    width: "60%",
  },
  bottomText: {
    fontSize: 20,
  },
});
