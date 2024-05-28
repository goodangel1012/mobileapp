import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text } from "@/components/Themed";
import TextInput from "@/components/Auth/TextInput";
import Button from "@/components/Auth/Button";
import { useState } from "react";
import { Link } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { getItem, setItem } from "@/components/Utils/AsyncStorage";
import * as FileSystem from "expo-file-system";

export default function SignUp({
  setStage,
}: {
  setStage: React.Dispatch<
    React.SetStateAction<
      "audio" | "image" | "signup" | "login" | "verification"
    >
  >;
}) {
  const navigation = useNavigation();
  const [image, setImage] = useState<string | null>(null);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      // setStage("verification");
      console.log(result);
      setImage(result.assets[0].uri);
      // convert to base64
      const imageInfo = await FileSystem.getInfoAsync(result.assets[0].uri);
      if (imageInfo.exists) {
        const imageUri = imageInfo.uri;
        const imageBlob = await (await fetch(imageUri)).blob();
        console.log(imageBlob);
        // setStage("verification");
      }
    }
  };

  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need media library permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      // const result = await ImagePicker.launchCameraAsync();
      // setStage("verification");
      setImage(result.assets[0].uri);
      // await setItem("user_image", result.assets[0].uri);
      await setItem("user_image", result.assets[0].uri);
      setStage("verification");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image Data</Text>
      {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}
      <View>
        <Pressable style={styles.upload} onPress={takePhoto}>
          <Entypo name="camera" size={60} color="white" />
          <Text style={styles.uploadText}>Take Photo</Text>
        </Pressable>
      </View>
      <View>
        <Pressable style={styles.upload} onPress={pickFromGallery}>
          <FontAwesome5 name="images" size={60} color="white" />
          <Text style={styles.uploadText}>Upload from gallery</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    width: "92%",
    marginHorizontal: "5%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 20,
    width: "100%",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  upload: {
    marginTop: 20,
    // blcak circle
    backgroundColor: "black",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 110,
    width: 220,
    height: 220,
  },
  uploadText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
});
