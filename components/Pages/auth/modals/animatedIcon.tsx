// AnimatedIcon.js
import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const AnimatedIcon = ({ pitch }: { pitch: number }) => {
  const scale = useSharedValue(1);

  scale.value = withSpring(pitch / 100, { damping: 10, stiffness: 100 });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View style={[styles.icon, animatedStyle]}>
      <View style={styles.innerIcon} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
    borderRadius: 50,
  },
  innerIcon: {
    width: 50,
    height: 50,
    backgroundColor: "blue",
    borderRadius: 25,
  },
});

export default AnimatedIcon;
