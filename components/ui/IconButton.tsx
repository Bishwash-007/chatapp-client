import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type IconButtonProps = TouchableOpacityProps & {
  title: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  textColor?: string;
  bgColor?: string;
  border?: boolean;
  className?: string;
};

const IconButton: React.FC<IconButtonProps> = ({
  title,
  iconName,
  iconColor = "white",
  textColor = "white",
  bgColor = "black",
  border = false,
  className = "",
  style,
  onPress,
  activeOpacity = 0.8,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={[
        {
          backgroundColor: bgColor,
          borderColor: border ? "#ccc" : "transparent",
          borderWidth: border ? 1 : 0,
        },
        style as ViewStyle,
      ]}
      className={`flex-1 py-2 px-4 rounded-lg flex-row items-center justify-center gap-2 ${className}`}
      {...props}
    >
      {iconName && <Ionicons name={iconName} size={20} color={iconColor} />}
      <Text
        className="text-base font-poppinsSemibold"
        style={{ color: textColor } as TextStyle}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default IconButton;
