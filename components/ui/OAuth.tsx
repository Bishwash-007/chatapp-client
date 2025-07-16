import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

const iconMap: Record<string, any> = {
  google: require("@/assets/images/icons/google.png"),
  github: require("@/assets/images/icons/github.png"),
  facebook: require("@/assets/images/icons/facebook.png"),
};

export type OAuthButtonProps = TouchableOpacityProps & {
  title?: string;
  className?: string;
  iconName: keyof typeof iconMap;
};

const OAuthButton: React.FC<OAuthButtonProps> = ({
  title,
  className = "",
  style,
  onPress,
  activeOpacity = 0.8,
  iconName,
  ...props
}) => {
  const iconSource = iconMap[iconName];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={style}
      className={`flex-row items-center dark:bg-white justify-center gap-3 px-4 py-3 rounded-3xl border border-muted-300 dark:border-muted-700 ${className}`}
      {...props}
    >
      <Image
        source={iconSource}
        resizeMode="contain"
        style={{ width: 24, height: 24 }}
      />
      {title && (
        <Text className="text-sm font-poppinsLight text-black dark:text-white">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default OAuthButton;
