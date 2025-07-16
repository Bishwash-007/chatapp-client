import React from "react";
import { View, Image, ViewStyle } from "react-native";

interface AvatarProps {
  uri: string;
  size?: number;
  style?: ViewStyle;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  uri,
  size = 60,
  style,
  className = "",
}) => {
  return (
    <View
      style={[{ width: size, height: size, borderRadius: size / 2 }, style]}
      className={`overflow-hidden bg-muted-200 dark:bg-muted-800 ${className}`}
    >
      <Image
        source={{ uri }}
        resizeMode="cover"
        style={{ width: size, height: size }}
        className="rounded-full"
      />
    </View>
  );
};

export default Avatar;