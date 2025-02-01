import { Image, StyleSheet } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { getGreeting } from "@/constants/Greetings";
import { useTheme } from "react-native-paper";
import BulletCategory from "@/components/BulletCategory";
import CarouselItems from "@/components/CarouselItems";
import { ImageSlides } from "@/constants/Images";
import Swiper from "react-native-swiper";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "@/constants/Responsive";

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#FA8F2A", dark: "#1D3D47" }}
      headerImage={
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
      <ThemedView style={styles.stepContainer}>
        {/* category label */}
        <ThemedView
          id="containerLabel"
          style={[
            styles.titleContainer,
            { justifyContent: "space-between", marginBottom: 5 },
          ]}
        >
          <ThemedText type="subtitle">Kategori Hewan</ThemedText>
          <ThemedText type="link" style={{ textDecorationLine: "underline" }}>
            Lihat semua
          </ThemedText>
        </ThemedView>
        {/* Category item */}
        <ThemedView style={styles.containerCategory}>
          <Link
            href={{
              pathname: "/(screen)/byCategory/[category]",
              params: { id: 1, category: "Mamalia" },
            }}
          >
            <BulletCategory
              title={"mamalia"}
              url={require("../../assets/images/icon/mamalia.png")}
              idx={1}
            />
          </Link>
          <Link
            href={{
              pathname: "/(screen)/byCategory/[category]",
              params: { id: 2, category: "Reptile" },
            }}
          >
            <BulletCategory
              title={"reptile"}
              url={require("../../assets/images/icon/reptile.png")}
              idx={2}
            />
          </Link>
          <Link
            href={{
              pathname: "/(screen)/byCategory/[category]",
              params: { id: 3, category: "Burung" },
            }}
          >
            <BulletCategory
              title={"burung"}
              url={require("../../assets/images/icon/bird.png")}
              idx={3}
            />
          </Link>
          <Link
            href={{
              pathname: "/(screen)/byCategory/[category]",
              params: { id: 4, category: "Ikan" },
            }}
          >
            <BulletCategory
              title={"ikan"}
              url={require("../../assets/images/icon/fish.png")}
              idx={4}
            />
          </Link>
          <Link
            href={{
              pathname: "/(screen)/byCategory/[category]",
              params: { id: 5, category: "Avertebrata" },
            }}
          >
            <BulletCategory
              title={"avertebrata"}
              url={require("../../assets/images/icon/crab.png")}
              idx={5}
            />
          </Link>
        </ThemedView>
      </ThemedView>
      {/* End Cateogry hewan */}

      {/* Start klasifikasi hewan */}
      <ThemedView style={[styles.stepContainer, { marginTop: 5 }]}>
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

      {/* Start galeri zoo */}
      <ThemedView style={styles.stepContainer}>
        <ThemedView
          id="containerLabel"
          style={[styles.titleContainer, { justifyContent: "space-between" }]}
        >
          <ThemedText type="subtitle">Galeri Wisata</ThemedText>
          <Link href={"https://www.instagram.com/bontomarannueducationpark/"}>
            <ThemedText type="link" style={{ textDecorationLine: "underline" }}>
              Lihat lebih lengkap
            </ThemedText>
          </Link>
        </ThemedView>
        <ThemedView style={{ height: h(22), borderRadius: 20 }}>
          <Swiper
            autoplay
            dotColor="#ccc"
            activeDotColor="#FA8F2A"
            showsPagination={true}
            autoplayTimeout={4}
          >
            {ImageSlides.map((item) => (
              <ThemedView
                key={item.id}
                style={{ flex: 1, justifyContent: "center", borderRadius: 20 }}
              >
                <Image
                  source={item.url}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    borderRadius: 20,
                  }}
                />
              </ThemedView>
            ))}
          </Swiper>
        </ThemedView>
      </ThemedView>
      {/* End galeri zoo */}
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
  containerCategory: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
