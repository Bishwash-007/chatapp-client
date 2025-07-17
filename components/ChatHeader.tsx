import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useChatStore } from "@/hooks/useChatStore";
import Avatar from "./ui/Avatar";
import { useRouter } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const ChatHeader = () => {
  const { selectedUser } = useChatStore();
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between px-4 py-4 bg-white dark:bg-black border-b-hairline border-muted-200 rounded-xl">
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} className="">
        <Ionicons name="chevron-back-outline" size={26} color="black" />
      </TouchableOpacity>

      {/* User Info */}
      <View className="flex-row items-center gap-2 flex-1 px-2">
        <Avatar imageUri={selectedUser?.avatar} size={40} isActive />
        <View>
          <Text className="font-poppinsMedium text-base text-muted-900 dark:text-white">
            {selectedUser?.fullName || "Unknown"}
          </Text>
          <Text className="text-xs text-muted-600 dark:text-muted-400">
            Online
          </Text>
        </View>
      </View>

      {/* Action Icons */}
      <View className="flex-row items-center gap-4">
        <TouchableOpacity>
          <Ionicons name="call" size={22} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="video-camera" size={22} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatHeader;
