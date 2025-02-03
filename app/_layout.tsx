import {useFonts } from "expo-font"
import { Stack } from "expo-router";

export default function RootLayout() {

  useFonts({
'roboto':require('./../assets/fonts/Roboto-Regular.ttf'),
'roboto-medium':require('./../assets/fonts/Roboto-Medium.ttf'),
'roboto-bold':require('./../assets/fonts/Roboto-Bold.ttf')
  })

  return <Stack />;
} 
