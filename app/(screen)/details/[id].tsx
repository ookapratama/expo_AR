import React, { useRef } from "react";
import { View, Image, Animated, StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { StatusBar } from "expo-status-bar";
import { ThemedView } from "@/components/ThemedView";

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 100;

const Detail = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [1, 0.2],
    extrapolate: "clamp",
  });

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [0, -50],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
            opacity: headerOpacity,
            transform: [{ translateY: headerTranslate }],
          },
        ]}
      >
        <Image
          source={require("../../../assets/images/category/gajah.jpg")}
          style={styles.headerImage}
          resizeMode="cover"
        />
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.contentContainer}>
          <ThemedText type="title" style={styles.title}>
            Gajah
          </ThemedText>
          <ThemedView
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ThemedView style={{ marginLeft: 5, marginTop: 48 }}>
              <ThemedText type="subtitle" style={{}}>
                Kategori
              </ThemedText>
              <ThemedText style={{ fontWeight: "600" }}>Mamalia</ThemedText>
            </ThemedView>
            <ThemedView style={{ marginLeft: 5, marginTop: 48 }}>
              <ThemedText type="subtitle" style={{}}>
                Klasifikasi
              </ThemedText>
              <ThemedText style={{ fontWeight: "600" }}>
                Hidup di Darat
              </ThemedText>
            </ThemedView>
          </ThemedView>
          <ThemedText numberOfLines={1}></ThemedText>
          <ThemedText type="link" style={{ marginLeft: 5, fontSize: 28, marginTop: 24, fontWeight: '700' }}>
            Deskripsi:
          </ThemedText>
          {/* Add more content here */}
          {/* {[...Array(20)].map((_, index) => (
            <ThemedText style={{ fontSize: 48 }} type="title" key={index}>
              Detail content paragraph {index + 1}
            </ThemedText>
          ))} */}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  scrollView: {
    flex: 1,
    zIndex: 2,
  },
  scrollContent: {
    paddingTop: HEADER_MAX_HEIGHT,
  },
  contentContainer: {
    padding: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -20,
  },
  title: {
    fontSize: 32,
    marginLeft: 5,
    marginTop: 10,
  },
});

export default Detail;
