import { Entypo, EvilIcons, Feather } from "@expo/vector-icons";
import React from "react";
import { View, TextInput, TextInputProps, Pressable } from "react-native";

interface SearchBarProps extends TextInputProps {
  text: string;
  onTextChange: (value: string) => void;
  isTyping: boolean;
  onClear?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  text,
  onTextChange,
  isTyping,
  onClear,
  ...props
}) => {
  return (
    <View className="flex-row items-center justify-between w-full h-14 border-hairline rounded-2xl px-4">
      <TextInput
        {...props}
        onChangeText={onTextChange}
        value={text}
        className="h-full flex-1 px-2"
      />
      {!isTyping ? (
        <EvilIcons name="search" size={26} color="black" />
      ) : (
        <Pressable onPress={onClear}>
          <Feather name="x" size={24} color="black" />
        </Pressable>
      )}
    </View>
  );
};

export default SearchBar;
