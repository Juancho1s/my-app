/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    paymentLetterBackground: "#f7f7f7",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#2c2e2f",
    paymentLetterBackground: "#405A57",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

// Move useColorScheme call to the component where it will be used
export const theme = async (systemTheme: "light" | "dark") => {
  try {
    const storedTheme = await AsyncStorage.getItem("selectedTheme");
    return storedTheme ? storedTheme : systemTheme;
  } catch (error) {
    console.error(error);
    return systemTheme;
  }
};
