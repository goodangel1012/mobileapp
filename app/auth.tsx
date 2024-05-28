import React from "react";
import { View, ScrollView, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import the screens for sign up and login navigation
import SignUpScreen from "../components/Pages/auth/signup";
import LoginScreen from "../components/Pages/auth/login";
import AudioScreen from "../components/Pages/auth/modals/audioModal";
import ImageScreen from "../components/Pages/auth/modals/imageModal";
import VerificationScreen from "../components/Pages/auth/modals/verificationModal";
import { Link } from "expo-router";
import AudioLoader from "@/components/Utils/AudioLoader";

interface LayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isSignedUp, setIsSignedUp] = React.useState(false);
  const [error, setError] = React.useState("");
  const [stage, setStage] = React.useState<
    "signup" | "login" | "audio" | "image" | "verification"
  >("signup");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          {/* The speaker box that guides the user - general done */}
          {/* The chat bot appears on the screen, Talks about the platform and Tell a user a joke need a pi to create */}
          {/* Tap to speak */}
          {/* Folder management */}
          <Pressable onPress={() => setStage("audio")}>
            {/* <Image
              style={styles.image}
              source={require("../assets/images/logo.png")}
              resizeMode="contain"
            /> */}
            <AudioLoader
              stage={stage}
              audio={
                stage === "audio"
                  ? "https://web.opendrive.com/api/v1/download/file.json/NDZfNTA4NjQxNDRf?temp_key=%B1%CA%DEz%7D%E6%A7&inline=1"
                  : stage === "image"
                  ? "https://web.opendrive.com/api/v1/download/file.json/NDZfNTA4NjQxNDNf?temp_key=%B1%CA%DEz%7D%A6%A7&inline=1"
                  : stage === "verification"
                  ? "https://web.opendrive.com/api/v1/download/file.json/NDZfNTA4NjQxNDVf?temp_key=%B1%CA%DEz%7E%26%A7&inline=1"
                  : ""
              }
            />
          </Pressable>
        </View>

        {stage === "signup" ? (
          <SignUpScreen error={error} setError={setError} setStage={setStage} />
        ) : stage === "login" ? (
          <LoginScreen setStage={setStage} />
        ) : stage === "audio" ? (
          <AudioScreen setStage={setStage} />
        ) : stage === "image" ? (
          <ImageScreen setStage={setStage} />
        ) : stage === "verification" ? (
          <VerificationScreen
            error={error}
            setError={setError}
            setStage={setStage}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  imageContainer: {
    width: "100%",
  },
  image: {
    width: "50%", // Adjust width according to your needs
    height: 130,
  },
});
