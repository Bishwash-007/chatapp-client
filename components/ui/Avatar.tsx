import React from "react";
import { View, Image } from "react-native";

interface AvatarProps {
  imageUri: string;
  size?: number;
  className?: string;
  isActive?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  imageUri,
  size = 48,
  className = "",
  isActive = false,
}) => {
  return (
    <View
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        source={{ uri: imageUri }}
        resizeMode="cover"
        className="w-full h-full rounded-full"
      />

      {isActive && (
        <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
      )}
    </View>
  );
};

export default Avatar;