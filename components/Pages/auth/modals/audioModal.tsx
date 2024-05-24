import React, { useState, useEffect, SetStateAction } from "react";
import { View, Button, Text, StyleSheet, Pressable } from "react-native";
import { Audio } from "expo-av";

export default function SignUp({
  setStage,
}: {
  setStage: React.Dispatch<
    React.SetStateAction<
      "audio" | "image" | "signup" | "login" | "verification"
    >
  >;
}) {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Set audio mode
    Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    // Request audio permissions
    Audio.requestPermissionsAsync();
  }, []);

  const startRecording = async () => {
    try {
      // Create a new recording instance
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync();
      setRecording(recording as unknown as SetStateAction<null>);
      setIsRecording(true);
    } catch (error) {
      console.log("Error starting recording:", error);
    }
  };

  const stopRecording = async () => {
    try {
      if (recording) {
        await (recording as Audio.Recording).stopAndUnloadAsync();
      }
      setStage("image");
      setIsRecording(false);
    } catch (error) {
      console.log("Error stopping recording:", error);
    }
  };

  const playRecording = async () => {
    try {
      if (recording) {
        const { sound } = await (
          recording as Audio.Recording
        ).createNewLoadedSoundAsync();
        await sound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log("Error playing recording:", error);
    }
  };

  const stopPlaying = async () => {
    try {
      if (recording) {
        const { sound } = await (
          recording as Audio.Recording
        ).createNewLoadedSoundAsync();
        await sound.stopAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.log("Error stopping playback:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audio Data</Text>
      {/* <Button
        title={isRecording ? "Stop Recording" : "Start Recording"}
        onPress={isRecording ? stopRecording : startRecording}
      />
      <Button
        title={isPlaying ? "Stop Playback" : "Play Recording"}
        onPress={isPlaying ? stopPlaying : playRecording}
      /> */}
      <View style={styles.audioView}></View>
      <Pressable
        onPress={isRecording ? stopRecording : startRecording}
        style={[
          styles.recordingButton,
          { backgroundColor: isRecording ? "red" : "black" },
        ]}
      >
        {isRecording ? (
          <Text style={styles.recordText}>
            Tap to Stop recording your voice
          </Text>
        ) : (
          <Text style={styles.recordText}>
            Tap to start recording your voice
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
  recordingButton: {
    backgroundColor: "black",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 150,
    width: 300,
    height: 300,
  },
  recordText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  audioView: {
    height: 100,
    width: "100%",
    // backgroundColor: "black",
  },
});
