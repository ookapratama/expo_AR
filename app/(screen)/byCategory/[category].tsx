import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { TextInput, useTheme } from "react-native-paper";
import Card from "@/components/Card";
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w,
} from "@/constants/Responsive";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { AnimalIMages } from "@/constants/Images";

const ByCategory = () => {
  const { id, category } = useLocalSearchParams();
  const navigation = useNavigation();
  const colors = useTheme();

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    navigation.setOptions({
      title: category,
    });
  }, []);
  return (
    <ScrollView
      style={{
        flex: 1,
        paddingHorizontal: 14,
        paddingTop: 20,
        backgroundColor: "white",
      }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <TextInput
        value={searchValue}
        style={{ backgroundColor: colors.colors.onPrimary }}
        onChangeText={(text) => setSearchValue(text)}
        label={"Search"}
        mode="outlined"
        right={<TextInput.Icon icon={"magnify"} />}
      />
      <ThemedView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginTop: h(3),
        }}
      >
        {AnimalIMages.map((item) => (
          <Card key={item.id} title={item.title} url={item.url} />
        ))}
      </ThemedView>
    </ScrollView>
  );
};

export default ByCategory;

const styles = StyleSheet.create({});
