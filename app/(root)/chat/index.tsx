import React, { useEffect, useRef, useState } from "react";
import { View, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import MessageInput from "@/components/MessageInput";
import ChatHeader from "@/components/ChatHeader";
import { useChatStore } from "@/hooks/useChatStore";
import { useMediaManager } from "@/hooks/useMediaManager";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import MessageBubble from "@/components/ui/MessageBubble";
import { useRouter } from "expo-router";

const ChatScreen = () => {
  const keyboard = useAnimatedKeyboard();
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value }],
  }));

  const router = useRouter();

  const {
    messages,
    getMessages,
    selectedUser,
    sendMessage,
    subscribeToMessages,
    unsubscribeFromMessages,
    getUsers,
  } = useChatStore();

  const flatListRef = useRef<FlatList>(null);
  const [message, setMessage] = useState("");

  const { mediaFiles, setMediaFiles, handleCamera, handleLibrary } =
    useMediaManager();

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
      return () => unsubscribeFromMessages();
    }
  }, [
    selectedUser?._id,
    messages,
    getMessages,
    unsubscribeFromMessages,
    subscribeToMessages,
  ]);

  useEffect(() => {
    getUsers();
  }, [selectedUser?._id]);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [message]);

  const handleSendMessage = async (text: string, imageUris?: string[]) => {
    const trimmedText = text.trim();
    if (!trimmedText && (!imageUris || imageUris.length === 0)) return;
    if (!selectedUser) return;

    const formData = new FormData();
    if (trimmedText) {
      formData.append("message", trimmedText);
    }

    if (imageUris?.length) {
      imageUris.forEach((uri, index) => {
        let normalizedUri = uri.startsWith("file://") ? uri : `file://${uri}`;

        const match = /\.(\w+)(\?.*)?$/.exec(normalizedUri);
        const ext = match ? match[1] : "jpg";

        const mimeType = `image/${ext === "jpg" ? "jpeg" : ext}`;

        formData.append("files", {
          uri: normalizedUri,
          name: `image_${Date.now()}_${index}.${ext}`,
          type: mimeType,
        } as any);
      });
    }

    try {
      await sendMessage(formData);
      setMessage("");
      setMediaFiles([]);
    } catch (err) {
      console.error("Sending message failed", err);
    }
  };

  const handleRemoveImage = (uri: string) => {
    setMediaFiles((prev) => prev.filter((item) => item !== uri));
  };

  const RenderMessage = ({ item }: { item: any }) => {
    const isSender = item.senderId === selectedUser?._id ? false : true;
    return (
      <MessageBubble
        messages={item.text}
        mediaFiles={item.image}
        isSender={isSender}
        isReceiver={!isSender}
        read={item.read}
        isTyping={false}
      />
    );
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      <View className="flex-1 h-full bg-white dark:bg-black pt-10 justify-between">
        <ChatHeader onPress={() => router.back()} />
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <RenderMessage item={item} />}
          showsVerticalScrollIndicator={false}
        />
        <Animated.View className="" style={animatedStyles}>
          <MessageInput
            message={message}
            mediaFiles={mediaFiles}
            onChangeMessage={setMessage}
            onPickImage={handleLibrary}
            onRemoveImage={handleRemoveImage}
            onSend={() => handleSendMessage(message, mediaFiles)}
          />
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
