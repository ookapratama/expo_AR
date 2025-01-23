import Swiper from "react-native-swiper";
import { ThemedView } from "./ThemedView";
import { Images } from "@/constants/Images";
import { ThemedText } from "./ThemedText";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "@/constants/Responsive";
import FastImage from "react-native-fast-image";

const CarouselItems = () => {
  return (
    <ThemedView style={{ backgroundColor: "grey", height: h(20) }}>
      <Swiper
        autoplay
        dotColor="#ccc"
        activeDotColor="#ff6347"
        showsPagination={true}
      >
        {Images.map((item, index) => (
          <ThemedView
            key={item.id}
            style={{ flex: 1, justifyContent: "center" }}
          >
            item
            <FastImage
              source={item.image}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
              }}
            />
          </ThemedView>
        ))}
      </Swiper>
    </ThemedView>
  );
};

export default CarouselItems;
