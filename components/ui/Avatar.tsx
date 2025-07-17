import React, { useState } from "react";
import { View, Image, ImageProps } from "react-native";

interface AvatarProps {
  imageUri?: string;
  size?: number;
  className?: string;
  isActive?: boolean;
}

let placeholderImg = require("@/assets/images/placeholder.png");

const Avatar: React.FC<AvatarProps> = ({
  imageUri,
  size = 48,
  className = "",
  isActive = false,
}) => {
  const [source, setSource] = useState(
    imageUri ? { uri: imageUri } : placeholderImg
  );

  const handleError = () => setSource(placeholderImg);

  return (
    <View
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        source={source}
        resizeMode="cover"
        onError={handleError}
        className="w-full h-full rounded-full"
      />

      {isActive && (
        <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
      )}
    </View>
  );
};

export default Avatar;