import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Text, Alert } from "react-native";
import { useAuthStore } from "@/hooks/useAuthStore";
import { EvilIcons } from "@expo/vector-icons";
import Button from "@/components/ui/Button";
import { pickImageAsync } from "@/lib/pickImage";

let placeholderImg = require("@/assets/images/placeholder.png");

const ProfileScreen = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePickImage = async () => {
    const uri = await pickImageAsync();
    if (uri) setSelectedImage(uri);
  };

  const handleUpdateAvatar = async () => {
    if (!selectedImage) {
      Alert.alert("No image", "Please select an image first.");
      return;
    }

    try {
      setLoading(true);
      await updateProfile({ imageUri: selectedImage });
      Alert.alert("Success", "Profile picture updated successfully!");
      setSelectedImage(undefined);
    } catch (err) {
      console.error("Update failed", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const displayUri = selectedImage || authUser?.avatar;

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black px-4">
      <View className="relative">
        <Image
          source={displayUri ? { uri: displayUri } : placeholderImg}
          className="w-32 h-32 rounded-full bg-gray-200"
        />

        <TouchableOpacity
          onPress={handlePickImage}
          className="absolute bottom-1 right-1 p-2 bg-white rounded-full shadow"
        >
          <EvilIcons name="camera" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {error && <Text className="mt-4 text-red-500">{error}</Text>}

      <View className="mt-4">
        <Text className="text-center text-lg font-medium">
          {authUser?.fullName}
        </Text>
        <Text className="text-center text-sm text-gray-600 dark:text-gray-400">
          {authUser?.email}
        </Text>
      </View>

      <Button
        title="Save Changes"
        onPress={handleUpdateAvatar}
        loading={loading || isUpdatingProfile}
        disabled={!selectedImage}
        className="mt-6 w-full"
      />
    </View>
  );
};

export default ProfileScreen;
