import React, { useState } from "react";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";

interface LoadingScreenProps {
  redirect: string;
  redirectNow: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  redirect,
  redirectNow,
}: LoadingScreenProps) => {
  // Add your loading GIF source here
  const loadingGifSrc = require("../../assets/video/loading.gif");
  // Add any additional loading logic here

  //   redirect after 2 seconds

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
    backgroundColor: "black",
  },
  loadingGif: {
    width: 300,
    height: 300,
  },
});

export default LoadingScreen;
