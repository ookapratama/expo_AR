import Swiper from "react-native-swiper";
import { ThemedView } from "./ThemedView";
import { Images } from "@/constants/Images";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "@/constants/Responsive";
import FastImage from "react-native-fast-image";
import { Image } from "react-native";
import { ThemedText } from "./ThemedText";
import { Link } from "expo-router";

const CarouselItems = () => {
  return (
    <ThemedView style={{ height: h(20), borderRadius: 20 }}>
      <Swiper
        autoplay
        dotColor="#ccc"
        activeDotColor="#FA8F2A"
        showsPagination={true}
      >
        {Images.map((item) => (
          <ThemedView
            key={item.id}
            style={{ flex: 1, justifyContent: "center", borderRadius: 20 }}
          >
            <Link
              href={{
                pathname: "/(screen)/byClassification/[classification]",
                params: { classification: item.from },
              }}
            >
              <Image
                source={item.image}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                  borderRadius: 20,
                }}
              />
            </Link>
            <ThemedText
              style={{
                position: "absolute",
                bottom: 20,
                left: 15,
                color: "white",
                fontWeight: "500",
                fontSize: 14,
                letterSpacing: 0.5,
                textTransform: "capitalize",
              }}
            >
              Hidup di {item.from}
            </ThemedText>
          </ThemedView>
        ))}
      </Swiper>
    </ThemedView>
  );
};

export default CarouselItems;
