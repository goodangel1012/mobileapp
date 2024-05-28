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
import LoadingScreen from "@/components/Utils/LoadingScreen";
import PostFormData from "@/components/Utils/Requests/FormData/Post";
import {
  clear,
  getAllItems,
  getItem,
  setItem,
} from "@/components/Utils/AsyncStorage";
import { router } from "expo-router";

export default function SignUp({
  setStage,
  error,
  setError,
}: {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setStage: React.Dispatch<
    React.SetStateAction<
      "audio" | "image" | "signup" | "login" | "verification"
    >
  >;
}) {
  const navigation = useNavigation();
  const [image, setImage] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [redirectNow, setRedirectNow] = useState(false);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    // const result = await ImagePicker.launchCameraAsync();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setDone(true);

      let user_image = await getItem("user_image");
      let user_audio_sample = await getItem("user_audio");
      let user_details = await getItem("user");

      let formData = new FormData();

      const uriToFile = async (
        uri: string | URL | Request,
        fileName: string
      ) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return new File([blob], fileName, { type: blob.type });
      };

      if (user_image) {
        const imageFile = await uriToFile(user_image, "user_image.jpg");
        formData.append("user_image", imageFile);
      }

      if (user_audio_sample) {
        const imageFile = await uriToFile(
          user_audio_sample,
          "user_audio_sample.mp3"
        );
        formData.append("user_audio_sample", imageFile);
      }

      if (result.assets && result.assets.length > 0) {
        const imageFile = await uriToFile(
          result.assets[0].uri,
          "user_government_id.jpg"
        );
        formData.append("user_government_id", imageFile);
      }
      formData.append(
        "user_names",
        JSON.stringify({
          first_name: user_details.firstName,
          last_name: user_details.lastName,
        })
      );

      const response = await fetch(
        "http://localhost:5001/user/authentication",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      console.log("data ==>", data);

      if (data.verification_status.status === "error") {
        //WRONG
        // if (data.verification_status.status != "error") { GOOD
        const response = await fetch("http://localhost:3000/v1/user/signup", {
          method: "POST",
          body: JSON.stringify({
            first_name: user_details.firstName,
            last_name: user_details.lastName,
            password: user_details.password,
            username: user_details.userName,
            email: user_details.email,
            voice_id: data.voice_id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("response ==>", response);
        if (response.ok) {
          const data = await response.json();
          await clear();
          await setItem("token", data.payload.token);
          setRedirectNow(true);
        } else {
          const data = await response.json();
          setStage("signup");
          setError(data.error.message);
        }
      } else {
        setStage("signup");
        setError("Verification failed");
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Verification Data</Text>
        <View>
          <Pressable style={styles.upload} onPress={takePhoto}>
            <Entypo name="camera" size={60} color="white" />
            <Text style={styles.uploadText}>Scan Identification Card</Text>
          </Pressable>
        </View>
      </View>
      {done && <LoadingScreen redirectNow={redirectNow} redirect="/home" />}
    </>
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
    borderRadius: 135,
    width: 270,
    height: 270,
  },
  uploadText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
});
