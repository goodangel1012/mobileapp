// App.js
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Audio } from "expo-av";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const AudioLoader = ({ audio, stage }: { audio: string; stage: string }) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
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
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [recording, sound]);

  useEffect(() => {
    pickAudioFile();
  }, [stage]);

  const pickAudioFile = async () => {
    try {
      await playAudio(audio);
    } catch (err) {
      console.error("Failed to pick an audio file", err);
    }
  };

  const playAudio = async (uri: string) => {
    try {
      console.log("Playing audio from", uri);
      const { sound } = await Audio.Sound.createAsync({ uri });

      setSound(sound);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.isPlaying) {
          // Mock volume detection (replace with actual implementation)
          const volume = Math.random();
          volumes[currentCircle].value = withTiming(volume * 100, {
            duration: 100,
          });
          lastUpdated[currentCircle] = Date.now();
          currentCircle = (currentCircle + 1) % volumes.length;
        }
      });

      await sound.playAsync();

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
      console.error("Failed to play the audio", err);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.audioImage}
        source={require("../../assets/images/logo_alt.png")}
      />
      <View style={styles.circlesContainer}>
        {volumes.map((vol, index) => (
          <AnimatedCircle key={index} volume={vol} />
        ))}
      </View>
    </View>
  );
};

const AnimatedCircle = ({
  volume,
}: {
  volume: Animated.SharedValue<number>;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: 30 + volume.value, // Directly use the scaled volume
    };
  });

  return <Animated.View style={[styles.circle, animatedStyle]} />;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    justifyContent: "center",
    height: 110,
  },
  circlesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "40%",
    position: "absolute",
    left: 20,
  },
  circle: {
    width: 30,
    backgroundColor: "white",
    borderRadius: 15,
  },
  audioImage: {
    width: "50%",
    height: 110,
  },
});

export default AudioLoader;
