import React from "react";
import { View, Image, Text, ScrollView, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface LayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

const AppLayout: React.FC<LayoutProps> = ({ children, backgroundColor }) => {
  const [showMenu, setShowMenu] = React.useState(false);
  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: backgroundColor ? "black" : "white" },
      ]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {children ?? null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    paddingBottom: 100,
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
