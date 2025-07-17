import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export function useMediaManager() {
  const [mediaFiles, setMediaFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCamera = async () => {
    setLoading(true);
    setError(null);
    try {
      const { granted } = await ImagePicker.requestCameraPermissionsAsync();
      if (!granted) {
        setError("Camera permission denied.");
        setLoading(false);
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        mediaTypes: ["images", "videos"],
      });

      if (!result.canceled && result.assets?.length) {
        setMediaFiles((prev) => [...prev, result.assets[0].uri]);
      }
    } catch {
      setError("Something went wrong with the camera.");
    } finally {
      setLoading(false);
    }
  };

  const handleLibrary = async (options?: {
    single?: boolean;
  }): Promise<string[] | string | null> => {
    setLoading(true);
    setError(null);
    try {
      const { granted } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!granted) {
        setError("Media library permission denied.");
        setLoading(false);
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        aspect: [1, 1],
        quality: 1,
        mediaTypes: ["images", "videos"],
        allowsMultipleSelection: !options?.single,
      });

      if (!result.canceled && result.assets?.length) {
        const uris = result.assets.map((a) => a.uri);
        setMediaFiles((prev) => [...prev, ...uris]);

        return options?.single ? uris[0] : uris;
      }
    } catch (err) {
      setError("Something went wrong with media picker.");
    } finally {
      setLoading(false);
    }

    return null;
  };

  return {
    mediaFiles,
    setMediaFiles,
    loading,
    error,
    handleCamera,
    handleLibrary,
  };
}
