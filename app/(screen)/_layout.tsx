import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

import { useColorScheme } from "@/hooks/useColorScheme";
import { StatusBar } from "expo-status-bar";

const stackScreen = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        initialRouteName="home"
        screenOptions={{
          headerTitleStyle: { fontWeight: "bold" },
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#FA8F2A" },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="byCategory" />
        <Stack.Screen name="details" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
};

export default stackScreen;
