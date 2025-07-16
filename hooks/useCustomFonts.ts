import { useFonts } from "expo-font";

export function useCustomFonts() {
  return useFonts({
    PoppinsExtraLight: require("../assets/fonts/Poppins/Poppins-ExtraLight.ttf"),
    PoppinsLight: require("../assets/fonts/Poppins/Poppins-Light.ttf"),
    PoppinsThin: require("../assets/fonts/Poppins/Poppins-Thin.ttf"),
    Poppins: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsSemibold: require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    PoppinsExtraBold: require("../assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
    PoppinsBlack: require("../assets/fonts/Poppins/Poppins-Black.ttf"),
  });
}
