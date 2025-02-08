import { CreateTripContext } from "@/context/CreateTripContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { LogBox } from 'react-native';


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "outfit": require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });
  LogBox.ignoreAllLogs(); 

  const [tripData, setTripData] = useState<any>({});

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }
  return (
    <CreateTripContext.Provider value={{ tripData, setTripData }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
      </Stack>
    </CreateTripContext.Provider>
  );
}
