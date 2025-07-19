import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  TextInputProps,
} from "react-native";
import { EvilIcons, Feather, Ionicons } from "@expo/vector-icons";

interface MessageInputProps extends TextInputProps {
  message: string;
  mediaFiles: string[];
  onChangeMessage: (text: string) => void;
  onPickImage: () => void;
  onRemoveImage: (uri: string) => void;
  onSend: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  message,
  mediaFiles,
  onChangeMessage,
  onPickImage,
  onRemoveImage,
  onSend,
  ...props
}) => {
  const renderImageItem = ({ item }: { item: string }) => (
    <View className="relative m-1">
      <Image
        source={{ uri: item }}
        className="w-20 h-20 rounded-xl"
        resizeMode="cover"
      />
      <TouchableOpacity
        onPress={() => onRemoveImage(item)}
        className="absolute top-1 right-1 bg-black/60 rounded-full p-1"
      >
        <Ionicons name="close" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="w-full px-4 pt-2 pb-3 bg-white dark:bg-black border-t border-muted-200 dark:border-muted-800">
      {mediaFiles.length > 0 && (
        <FlatList
          data={mediaFiles}
          keyExtractor={(uri, index) => uri + index}
          renderItem={renderImageItem}
          numColumns={4}
          scrollEnabled={false}
          contentContainerStyle={{ marginBottom: 10 }}
        />
      )}

      <View className="flex-row items-center gap-3">
        <TouchableOpacity onPress={onPickImage}>
          <EvilIcons name="image" size={28} color="black" />
        </TouchableOpacity>

        <TextInput
          value={message}
          onChangeText={onChangeMessage}
          placeholder="Say hi!"
          placeholderTextColor="#999"
          className="flex-1 px-4 py-2 rounded-full bg-muted-50 dark:bg-muted-900 text-black dark:text-white font-poppinsLight"
          {...props}
        />

        <TouchableOpacity onPress={onSend} className="p-1">
          <Feather name="send" size={22} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessageInput;