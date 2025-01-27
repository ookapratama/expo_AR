import React, { useEffect, useRef, useState } from "react";
import { View, Image, Animated, StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { StatusBar } from "expo-status-bar";
import { ThemedView } from "@/components/ThemedView";
import { Link, useLocalSearchParams } from "expo-router";
import { AnimalIMages } from "@/constants/Images";
import { ActivityIndicator, Button } from "react-native-paper";
import { heightPercentageToDP as h } from "@/constants/Responsive";

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 100;

interface IData {
  title: string | number;
  desc: string;
  category: string;
  classification: string;
  url: string;
}

const Detail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<IData[]>([]);

  const getData = async () => {
    // const data = await AnimalIMages.find((item) => item.id == parseInt(id));
    const data = await AnimalIMages.filter((item) => String(item.id) === id);
    setData(data);
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

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
          source={data[0]?.url ? data[0].url : require("../../../assets/images/404/error1.png")}
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
          {data == undefined ? (
            <ActivityIndicator animating={true} color="red"></ActivityIndicator>
          ) : (
            <>
              <ThemedText type="title" style={styles.title}>
                {data[0]?.title}
              </ThemedText>
              <ThemedView
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 24
                }}
              >
                <ThemedView style={{ marginLeft: 5 }}>
                  <ThemedText type="subtitle" style={{}}>
                    Kategori
                  </ThemedText>
                  <ThemedText
                    style={{ fontWeight: "600", textTransform: "capitalize" }}
                  >
                    {data[0]?.category}
                  </ThemedText>
                </ThemedView>
                <ThemedView style={{ marginLeft: 5 }}>
                  <ThemedText type="subtitle" style={{}}>
                    Klasifikasi
                  </ThemedText>
                  <ThemedText
                    style={{ fontWeight: "600", textTransform: "capitalize" }}
                  >
                    Hidup di {data[0]?.classification}
                  </ThemedText>
                </ThemedView>
              </ThemedView>
              <ThemedText numberOfLines={1}></ThemedText>
              <ThemedText
                type="link"
                style={{
                  marginLeft: 5,
                  fontSize: 28,
                  marginTop: 24,
                  fontWeight: "700",
                }}
              >
                Deskripsi:
              </ThemedText>
              <ThemedText
                style={{
                  textAlign: "justify",
                  marginLeft: 5,
                  fontSize: 16,
                  marginTop: 6,
                  lineHeight: 28,
                  fontWeight: "400",
                }}
              >
                {"\u00A0"}
                {"\u00A0"}
                {"\u00A0"}
                {"\u00A0"}
                {data[0]?.desc}
              </ThemedText>
            </>
          )}
        </View>
      </Animated.ScrollView>
      <ThemedView>
        <Link href={{
          pathname: "/(screen)/camera/[id]",
          params: {idx: data[0]?.title}
        }}>
          <Button
            style={{ width: "100%", height: h(8), borderRadius: 0, backgroundColor:'#FA8F2A' }}
            labelStyle={{ fontSize: 20, letterSpacing: 2, paddingVertical: 16, }}
            icon={"camera"}
            mode={"contained"}
          >
            Open AR Camera
          </Button>
        </Link>
      </ThemedView>
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
    textTransform: 'capitalize'
  },
});

export default Detail;
