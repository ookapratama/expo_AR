import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

// import { useColorScheme } from "@/hooks/useColorScheme";
import { StatusBar } from "expo-status-bar";
import { ThemedText } from "@/components/ThemedText";

const stackScreen = () => {
  // const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={ DefaultTheme}>
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
        <Stack.Screen name="byCategory/[category]" />
        <Stack.Screen name="byClassification/[classification]"  />
        <Stack.Screen
          name="details/[id]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="camera/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
};

export default stackScreen;
