import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useDebounce } from "@/hooks/useDebounce";
import SearchBar from "@/components/SearchBar";
import Avatar from "@/components/ui/Avatar";
import MessageListItem from "@/components/MessageListsItem";
import { useChatStore, User } from "@/hooks/useChatStore";
import { useAuthStore } from "@/hooks/useAuthStore";

export default function ContactsScreen() {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 300);
  const router = useRouter();

  const { getUsers, users, isUserLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const { selectedUser, setSelectedUser, getMessages } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [users]);

  const activeUsers = useMemo(
    () => users.filter((user) => onlineUsers.includes(user._id)),
    [users, onlineUsers]
  );

  const filteredActiveUsers = useMemo(() => {
    if (!debouncedText.trim()) return activeUsers;
    const query = debouncedText.toLowerCase();
    return activeUsers.filter((u) => u.fullName.toLowerCase().includes(query));
  }, [debouncedText, activeUsers]);

  const handleRoute = (user: User) => {
    setSelectedUser(user);
    router.push("/chat");
  };

  return (
    <View className="flex-1 pt-safe px-4 bg-white dark:bg-black">
      {/* Header */}
      <View className="flex flex-row justify-between py-4 items-center">
        <Text className="font-poppins text-xl dark:text-muted-50 text-muted-900">
          NightCall
        </Text>
        <TouchableOpacity onPress={() => console.log("Create Chat")}>
          <Ionicons
            name="create-outline"
            size={24}
            color="black"
            className="dark:text-white"
          />
        </TouchableOpacity>
      </View>

      {/* Contact List */}
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRoute(item)}>
            <MessageListItem
              imageUri={item.image}
              name={item.fullName}
              message="Hello"
              isActive={onlineUsers.includes(item._id)}
            />
          </TouchableOpacity>
        )}
        ListHeaderComponent={
          <>
            <SearchBar
              text={text}
              onTextChange={setText}
              isTyping={false}
              onClear={() => setText("")}
              placeholder="Search contacts..."
              className="mb-4"
            />

            {filteredActiveUsers.length > 0 && (
              <FlatList
                data={filteredActiveUsers}
                keyExtractor={(item) => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleRoute(item)}>
                    <View className="items-center justify-center mx-2 pt-4">
                      <Avatar isActive imageUri={item.image} />
                      <Text
                        numberOfLines={1}
                        className="font-poppins text-xs mt-1 text-center max-w-[60px] text-neutral-700 dark:text-neutral-300"
                      >
                        {item.fullName.length > 10
                          ? `${item.fullName.slice(0, 8)}...`
                          : item.fullName}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}

            <View className="mt-6">
              <Text className="text-base font-poppinsSemibold text-muted-700 dark:text-white">
                Chats
              </Text>
            </View>
          </>
        }
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View className="h-[1px] bg-muted-100 dark:bg-muted-800 mx-4" />
        )}
        ListEmptyComponent={
          isUserLoading ? (
            <ActivityIndicator size="large" className="mt-6" />
          ) : (
            <Text className="text-muted-400 text-center mt-6">
              No chats available
            </Text>
          )
        }
      />
    </View>
  );
}
