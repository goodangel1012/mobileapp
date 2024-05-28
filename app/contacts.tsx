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

const Home: React.FC = () => {
  const [showMenu, setShowMenu] = React.useState(false);

  const Friends = ({ data }: { data: { name: string; image: any }[] }) => {
    return (
      <View style={styles.avatarInner}>
        {data.map((item, index) => (
          <Link style={styles.friendCard} key={index} href="/contact_details">
            <View style={styles.friendCardInner}>
              <View style={styles.image}>
                <Image style={styles.avatarImage} source={item.image} />
              </View>
              <View style={styles.name}>
                <Text>{item.name}</Text>
              </View>
            </View>
          </Link>
        ))}
      </View>
    );
  };

  return (
    <AppLayout>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 20,
        }}
      >
        Friends
      </Text>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Friends
            data={[
              {
                name: "John Doe",
                image: require("../assets/images/app/avatar.png"),
              },
              {
                name: "John Doe",
                image: require("../assets/images/app/avatar.png"),
              },
              {
                name: "John Doe",
                image: require("../assets/images/app/avatar.png"),
              },
              {
                name: "John Doe",
                image: require("../assets/images/app/avatar.png"),
              },
            ]}
          />
        </View>
        <View style={styles.audioContainer}>
          <Image
            style={styles.audioImage}
            source={require("../assets/images/logo.png")}
          />
          <View style={styles.navActions}>
            <Ionicons
              style={{ transform: [{ scaleX: -1 }] }}
              name="exit-outline"
              size={44}
              color="black"
            />
            <Ionicons name="exit-outline" size={44} color="black" />
          </View>
          <View style={styles.actionContainer}>
            {showMenu && (
              <View>
                <View style={styles.circle}>
                  <Link href="/contacts">
                    <MaterialIcons name="person-2" size={34} color="white" />
                  </Link>
                </View>
                <View style={styles.circle}>
                  <FontAwesome name="folder" size={24} color="white" />
                </View>
                <View style={styles.circle}>
                  <Link href="/message">
                    <AntDesign name="back" size={34} color="white" />
                  </Link>
                </View>
              </View>
            )}
            <Pressable onPress={() => setShowMenu(!showMenu)}>
              <View style={styles.circle}>
                <FontAwesome name="send" size={30} color="white" />
                {/* <AntDesign name="pluscircle" size={65} color="white" /> */}
              </View>
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
    alignItems: "center",
  },
  avatar: {
    width: "75%",
    height: "75%",
    overflow: "hidden",
    backgroundColor: "#e8e8e8",
    justifyContent: "center",
    alignItems: "center",
  },

  audioContainer: {
    flex: 1,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 20,
    width: "25%",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  audioImage: {
    width: "60%", // Adjust width according to your needs
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
  avatarInner: {
    width: "100%",
    height: "90%",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  friendCard: {
    width: "50%",
    height: "50%",
    backgroundColor: "white",
    borderWidth: 5,
    borderColor: "#e8e8e8",
  },
  friendCardInner: {
    width: "230%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "80%",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  name: {
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  navActions: {
    width: "100%",
    height: "20%",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  aboutCard: {
    width: "50%",
    height: "50%",
    backgroundColor: "white",
    borderWidth: 5,
    borderColor: "#e8e8e8",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 30,
  },
  aboutText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 10,
  },
});
