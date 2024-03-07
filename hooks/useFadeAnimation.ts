import { useRef } from "react";
import { Animated } from "react-native";

export const useFadeAnimation = () => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeIn = (duration = 3000) => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = (duration = 3000) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };
  return { fadeAnim, fadeIn, fadeOut };
};
