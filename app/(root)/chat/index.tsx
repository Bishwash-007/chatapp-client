import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import MessageInput from "@/components/MessageInput";
import ChatHeader from "@/components/ChatHeader";
import { useChatStore } from "@/hooks/useChatStore";
import { useMediaManager } from "@/hooks/useMediaManager";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";

const ChatScreen = () => {
  const keyboard = useAnimatedKeyboard();
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value }],
  }));

  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    sendMessage,
  } = useChatStore();

  const [message, setMessage] = useState("");
  const { mediaFiles, setMediaFiles, handleCamera, handleLibrary } =
    useMediaManager();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id]);

  const handleSendMessage = async (text: string, imageUris?: string[]) => {
    if (!selectedUser) return;

    const formData = new FormData();

    formData.append("message", text);

    if (imageUris?.length) {
      imageUris.forEach((uri, index) => {
        const fileType = uri.split(".").pop();
        const fileName = `media_${index}.${fileType}`;
        formData.append("files", {
          uri,
          type: `image/${fileType}`,
          name: fileName,
        } as any);
      });
    }

    try {
      await sendMessage(formData);
    } catch (err) {
      console.error("Sending message failed", err);
    }
  };

  const handleRemoveImage = (uri: string) => {
    setMediaFiles((prev) => prev.filter((item) => item !== uri));
  };

  return (
    <View className="flex-1 h-full bg-white dark:bg-black pt-10 justify-between">
      <ChatHeader />

      <Animated.View style={animatedStyles}>
        <Text>Messages....</Text>

        <MessageInput
          message={message}
          mediaFiles={mediaFiles}
          onChangeMessage={setMessage}
          onPickImage={handleLibrary}
          onRemoveImage={handleRemoveImage}
          onSend={() => handleSendMessage}
        />
      </Animated.View>
    </View>
  );
};

export default ChatScreen;
