import React from "react";
import { View, Text, Image } from "react-native";

interface MessageListItemProps {
  imageUri: string;
  name: string;
  message: string;
  timestamp: string;
  isNew?: boolean;
  isActive: boolean;
}

const MessageListItem: React.FC<MessageListItemProps> = ({
  imageUri,
  name,
  message,
  timestamp,
  isActive = true,
  isNew = false,
}) => {
  return (
    <View className="flex-row items-start px-4 py-2">
      <View>
        <Image
          source={{ uri: imageUri }}
          resizeMode="cover"
          style={{ width: 48, height: 48 }}
          className="rounded-full"
        />
        {isActive && (
          <View className="absolute bottom-0 right-0 bg-green-500 border-2 border-white size-4 rounded-full" />
        )}
      </View>

      <View className="flex-1 px-4">
        <Text className="font-poppinsLight text-muted-900 dark:text-muted-50">
          {name}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="font-poppinsLight text-muted-700 dark:text-muted-400"
        >
          {message}
        </Text>
      </View>

      <View className="items-end justify-between">
        {isNew && (
          <View className="bg-accent rounded-full px-2 py-1 mb-1">
            <Text className="text-xs text-white">new</Text>
          </View>
        )}
        <Text className="font-poppinsLight text-sm text-muted-600 dark:text-muted-300">
          {timestamp}
        </Text>
      </View>
    </View>
  );
};

export default MessageListItem;
