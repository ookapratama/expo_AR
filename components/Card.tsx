import { Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "@/constants/Responsive";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Link } from "expo-router";

interface ICard {
  title: string;
  url: undefined;
  category?: string;
  classification?: string;
}

const Card = ({ title, url }: ICard) => {
  return (
    <ThemedView style={{ marginBottom: h(2) }}>
      <Link href={"/(screen)/splash"}>
        <ThemedView
          style={{
            width: w(50),
            height: h(16),
            backgroundColor: "#FA8F2A",
            borderRadius: 8,
          }}
        >
          <Image
            resizeMode="stretch"
            style={{  width: '100%', height: '100%', borderRadius: 8  }}
            source={url}
          />
        </ThemedView>
      </Link>
      <ThemedText
        type="defaultSemiBold"
        style={{ fontSize: 18, marginVertical: h(1), textTransform: 'capitalize' }}
      >
        {title}
      </ThemedText>
    </ThemedView>
  );
};

export default Card;

const styles = StyleSheet.create({});
