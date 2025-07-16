import React from "react";
import { View, Text, TextInput, TextInputProps, Pressable } from "react-native";

type Props = TextInputProps & {
  className?: string;
  label?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  secureToggle?: boolean;
};

const InputField: React.FC<Props> = ({
  className = "",
  style,
  placeholderTextColor,
  label,
  iconLeft,
  iconRight,
  secureToggle,
  secureTextEntry,
  ...props
}) => {
  const [visible, setVisible] = React.useState(!secureTextEntry);

  return (
    <View className="flex mb-4">
      {label && (
        <Text className="ml-2 font-poppinsSemibold text-lg text-muted-light dark:text-muted-dark mb-1">
          {label}
        </Text>
      )}

      <View
        className={`flex-row items-center px-2 bg-white dark:bg-black border border-muted-300 dark:border-muted-800 rounded-xl ${className}`}
      >
        {iconLeft && <View className="ml-3 mr-2">{iconLeft}</View>}

        <TextInput
          {...props}
          secureTextEntry={secureToggle ? !visible : secureTextEntry}
          style={[{ flex: 1 }, style]}
          className="px-3 py-2 font-poppinsLight text-black dark:text-white"
          placeholderTextColor={placeholderTextColor ?? "#737373"}
        />

        {secureToggle ? (
          <Pressable onPress={() => setVisible((v) => !v)} className="mr-3">
            {visible ? (iconRight ?? null) : (iconRight ?? null)}
          </Pressable>
        ) : (
          iconRight && <View className="mr-3">{iconRight}</View>
        )}
      </View>
    </View>
  );
};

export default InputField;
