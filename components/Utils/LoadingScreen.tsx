import React, { useState } from "react";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";

interface LoadingScreenProps {
  redirect: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  redirect,
}: LoadingScreenProps) => {
  // Add your loading GIF source here
  const loadingGifSrc = require("../../assets/video/loading.gif");
  const [redirectNow, setRedirectNow] = useState(false);
  // Add any additional loading logic here

  //   redirect after 2 seconds
  setTimeout(() => {
    if (redirect) {
      setRedirectNow(true);
    }
  }, 2000);

  return redirectNow ? (
    <Redirect href={redirect} />
  ) : (
    <View style={styles.container}>
      <Image source={loadingGifSrc} style={styles.loadingGif} />
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  loadingGif: {
    width: 300,
    height: 300,
  },
});

export default LoadingScreen;
