import * as ImagePicker from "expo-image-picker";

export const pickImageAsync = async (): Promise<string | null> => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [4, 4],
    quality: 0.8,
  });

  if (!result.canceled && result.assets.length > 0) {
    return result.assets[0].uri;
  }

  return null;
};
