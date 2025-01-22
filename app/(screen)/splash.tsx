import React, { useEffect, useRef, useState } from "react";
import { View, Animated, StyleSheet, Dimensions } from "react-native";
import { Avatar, Text, useTheme } from "react-native-paper";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const moveAnim = useRef(new Animated.Value(0)).current;
  const [showLottie, setShowLottie] = useState(false);
  const lottieOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(moveAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowLottie(true);
      Animated.timing(lottieOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primaryContainer }]}>
      {/* Container untuk Lottie di belakang */}
      {showLottie && (
        <Animated.View
          style={[styles.lottieContainer, { opacity: lottieOpacity }]}
        >
          <LottieView
            source={require("../../assets/lottie/panda_wave.json")}
            style={styles.lottie}
            autoPlay
          />
        </Animated.View>
      )}
      {/* <View style={[styles.textLogo]}> */}
        <Animated.View
          style={[
            styles.avatarContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: moveAnim },
                {
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <Avatar.Image
            style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
            size={width - 120}
            source={require("../../assets/images/icon.jpg")}
          />
        </Animated.View>
        {/* <Text style={{marginTop:30}} variant="displayMedium">Welcome To Bonto Marannu Zoo</Text> */}
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottieContainer: {
    position: "absolute",
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    top: -240,
    right: -80,
    transform: [{ rotate: "20deg" }],
  },
  lottie: {
    width: "70%",
    height: "70%",
    position: "absolute",
  },
  avatarContainer: {
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    elevation: 8, // untuk Android
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  textLogo : {
    marginTop: width - 300,
  }
});
