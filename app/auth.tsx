import React from "react";
import { View, Image, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import the screens for sign up and login navigation
import SignUpScreen from "../components/Pages/auth/signup";
import LoginScreen from "../components/Pages/auth/login";
import AudioScreen from "../components/Pages/auth/modals/audioModal";
import ImageScreen from "../components/Pages/auth/modals/imageModal";
import VerificationScreen from "../components/Pages/auth/modals/verificationModal";

interface LayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isSignedUp, setIsSignedUp] = React.useState(false);
  const [stage, setStage] = React.useState<
    "signup" | "login" | "audio" | "image" | "verification"
  >("signup");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/images/logo.png")}
            resizeMode="contain"
          />
        </View>

        {stage === "signup" ? (
          <SignUpScreen setStage={setStage} />
        ) : stage === "login" ? (
          <LoginScreen setStage={setStage} />
        ) : stage === "audio" ? (
          <AudioScreen setStage={setStage} />
        ) : stage === "image" ? (
          <ImageScreen setStage={setStage} />
        ) : stage === "verification" ? (
          <VerificationScreen setStage={setStage} />
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
