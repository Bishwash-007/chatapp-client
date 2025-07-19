import React from "react";
import { View, Text, Image } from "react-native";

interface MessageProps {
  messages: string;
  mediaFiles?: string[];
  read?: boolean;
  isTyping?: boolean;
  isSender?: boolean;
  isReceiver?: boolean;
}

const MessageBubble: React.FC<MessageProps> = ({
  messages,
  mediaFiles = [],
  read = false,
  isTyping = false,
  isSender = false,
}) => {

  return (
    <View
      className={`max-w-[80%] my-2 px-3 py-2 rounded-2xl ${
        isSender ? "self-end" : "self-start"
      }`}
    >
      {/* Media images */}
      {mediaFiles?.length > 0 && (
        <View className="flex-row flex-wrap gap-2 mb-2">
          {mediaFiles.map((uri, idx) => (
            <Image
              key={idx}
              source={{ uri }}
              className="w-36 h-36 rounded-xl"
              resizeMode="cover"
            />
          ))}
        </View>
      )}

      {/* Text message bubble */}
      {!isTyping && messages && (
        <View
          className={`rounded-lg px-4 py-2 ${
            isSender ? "bg-blue-700 self-end" : "bg-white dark:bg-gray-600"
          }`}
        >
          <Text
            className={`text-base ${
              isSender ? "text-white" : "text-gray-900 dark:text-gray-100"
            }`}
          >
            {messages}
          </Text>
        </View>
      )}
    </View>
  );
};

export default MessageBubble;
