// App.js
import React, { useEffect, useState } from "react";
import { SafeAreaView, Button, View, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";

const App = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const volumes = [
    useSharedValue(1),
    useSharedValue(1),
    useSharedValue(1),
    useSharedValue(1),
  ];
  const lastUpdated = [0, 0, 0, 0];
  let currentCircle = 0;

  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, [recording]);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync();
      setRecording(recording);

      recording.setOnRecordingStatusUpdate((status) => {
        if (status.isRecording) {
          // Mock volume detection (replace with actual implementation)
          const volume = Math.random();
          volumes[currentCircle].value = withTiming(volume * 100 + 20, {
            duration: 100,
          });
          lastUpdated[currentCircle] = Date.now();
          currentCircle = (currentCircle + 1) % volumes.length;
        }
      });

      await recording.startAsync();

      // Periodically check and reset circles if they haven't been updated
      const interval = setInterval(() => {
        const now = Date.now();
        volumes.forEach((vol, index) => {
          if (now - lastUpdated[index] > 500) {
            // 500ms threshold
            vol.value = withTiming(20, { duration: 500 });
          }
        });
      }, 100);

      return () => clearInterval(interval);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log("Recording stopped and stored at", uri);
      setRecording(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Start Recording" onPress={startRecording} />
      <Button title="Stop Recording" onPress={stopRecording} />
      <View style={styles.circlesContainer}>
        {volumes.map((vol, index) => (
          <AnimatedCircle key={index} volume={vol} />
        ))}
      </View>
    </SafeAreaView>
  );
};

const AnimatedCircle = ({
  volume,
}: {
  volume: Animated.SharedValue<number>;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: volume.value,
    };
  });

  return <Animated.View style={[styles.circle, animatedStyle]} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circlesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginTop: 20,
    alignItems: "center",
    height: 200,
  },
  circle: {
    width: 20,
    backgroundColor: "blue",
    borderRadius: 10,
  },
});

export default App;
