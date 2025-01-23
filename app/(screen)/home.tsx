import {
  Image,
  StyleSheet,
  Platform,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { getGreeting } from "@/constants/Greetings";
import { Avatar, useTheme } from "react-native-paper";
import { useThemeColor } from "@/hooks/useThemeColor";
import BulletCategory from "@/components/BulletCategory";
import CarouselItems from "@/components/CarouselItems";

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#FA8F2A", dark: "#1D3D47" }}
      headerImage={
        // <Image
        //   source={require("@/assets/images/partial-react-logo.png")}
        //   style={styles.reactLogo}
        // />
        <ThemedView
          style={{ marginTop: 80, paddingHorizontal: 20 }}
          lightColor="#FA8F2A"
          darkColor="#1D3D47"
        >
          <ThemedText lightColor="#fff" darkColor="#000" type="subtitle">
            Hi, {getGreeting()}
          </ThemedText>
          <ThemedText
            style={{ marginTop: 20 }}
            lightColor="#fff"
            darkColor="#000"
            type="title"
          >
            Welcome To Kebun Binatang Bonto Marannu
          </ThemedText>
        </ThemedView>
      }
    >
      {/* Start Cateogry hewan */}
      <ThemedView>
        {/* category label */}
        <ThemedView
          id="containerLabel"
          style={[styles.titleContainer, { justifyContent: "space-between" }]}
        >
          <ThemedText type="subtitle">Kategori Hewan</ThemedText>
          <ThemedText type="link" style={{ textDecorationLine: "underline" }}>
            Lihat semua
          </ThemedText>
        </ThemedView>
        {/* Category item */}
        <ThemedView style={styles.containerCategory}>
          <BulletCategory
            title={"mamalia"}
            url={require("../../assets/images/icon/mamalia.png")}
          />
          <BulletCategory
            title={"reptile"}
            url={require("../../assets/images/icon/reptile.png")}
          />
          <BulletCategory
            title={"burung"}
            url={require("../../assets/images/icon/bird.png")}
          />
          <BulletCategory
            title={"ikan"}
            url={require("../../assets/images/icon/fish.png")}
          />
        </ThemedView>
      </ThemedView>
      {/* End Cateogry hewan */}

      {/* Start klasifikasi hewan */}
      <ThemedView style={styles.stepContainer}>
        {/* category label */}
        <ThemedView
          id="containerLabel"
          style={[styles.titleContainer, { justifyContent: "space-between" }]}
        >
          <ThemedText type="subtitle">Klasifikasi Hewan</ThemedText>
          <ThemedText type="link" style={{ textDecorationLine: "underline" }}>
            Lihat semua
          </ThemedText>
        </ThemedView>
        <CarouselItems />
      </ThemedView>
      {/* End klasifikasi hewan */}

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  containerCategory: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    alignItems: "center",
  },
});
