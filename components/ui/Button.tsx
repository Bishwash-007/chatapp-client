import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

export type ButtonProps = TouchableOpacityProps & {
  title: string;
  className?: string;
  icon?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  title,
  className = "",
  style,
  onPress,
  activeOpacity = 0.8,
  icon,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={style}
      className={`flex-row items-center justify-center gap-2
        bg-muted-900 dark:bg-muted-200
        border border-muted-300 dark:border-muted-700
        rounded-xl px-4 py-4
        ${className}
      `}
      {...props}
    >
      {icon && <>{icon}</>}
      <Text className="text-center text-base font-poppinsSemibold text-white dark:text-black">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
