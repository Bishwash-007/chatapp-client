import { View, Text, Alert, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { pickImageAsync } from "@/lib/pickImage";
import { useAuthStore } from "@/hooks/useAuthStore";
import { EvilIcons } from "@expo/vector-icons";

const placeholderImg = require("@/assets/images/placeholder.png");

const EditProfile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePickImage = async () => {
    const uri = await pickImageAsync();
    if (uri) {
      setSelectedImage(uri);
      setError(null);
    }
  };

  const handleUpdateAvatar = async () => {
    if (!selectedImage) {
      Alert.alert("No image selected", "Please choose a profile picture.");
      return;
    }

    try {
      setLoading(true);
      await updateProfile({ imageUri: selectedImage });
      Alert.alert("Profile Updated", "Your profile picture has been updated!");
      setSelectedImage(undefined);
    } catch (err) {
      console.error("Update failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const displayUri = selectedImage || authUser?.avatar;

  return (
    <View className="flex-1 justify-center items-center px-6 bg-white dark:bg-black">
      <View className="relative mb-4">
        <Image
          source={displayUri ? { uri: displayUri } : placeholderImg}
          className="w-36 h-36 rounded-full bg-gray-300 dark:bg-gray-700"
        />
        <TouchableOpacity
          onPress={handlePickImage}
          className="absolute bottom-1 right-1 p-2 bg-white dark:bg-neutral-800 rounded-full shadow-md"
        >
          <EvilIcons name="camera" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <View className="items-center">
        <Text className="text-xl font-semibold text-black dark:text-white">
          {authUser?.fullName || "Unnamed"}
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          {authUser?.email || "No email"}
        </Text>
      </View>

      {error && (
        <Text className="mt-3 text-red-500 text-sm">{error}</Text>
      )}

      <Button
        title="Save Changes"
        onPress={handleUpdateAvatar}
        loading={loading || isUpdatingProfile}
        disabled={!selectedImage}
        className="mt-6 w-[70%]"
      />
    </View>
  );
};

export default EditProfile;