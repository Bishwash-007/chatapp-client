import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDebounce } from "@/hooks/useDebounce";
import SearchBar from "@/components/SearchBar";
import Avatar from "@/components/ui/Avatar";
import { useChatStore } from "@/hooks/useChatStore";
import { useRouter } from "expo-router";
import MessageListItem from "@/components/MessageListsItem";

export interface User {
  __v: number;
  _id: string;
  avatar?: string;
  email: string;
  fullName: string;
}

export interface FetchFriendsResponse {
  data: User[];
  message: string;
  statusCode: number;
  success: boolean;
}

const mockMessages = [
  {
    _id: "1",
    avatar: "https://i.pravatar.cc/150?img=1",
    fullName: "Elon Musk",
    lastMessage: "Hey, got that rocket fuel?",
    timestamp: "2m ago",
    isNew: true,
  },
  {
    _id: "2",
    avatar: "https://i.pravatar.cc/150?img=2",
    fullName: "Mark Zuckerberg",
    lastMessage: "Meta now owns Mars.",
    timestamp: "5m ago",
    isNew: false,
  },
  {
    _id: "3",
    avatar: "https://i.pravatar.cc/150?img=3",
    fullName: "Bill Gates",
    lastMessage: "Just finished another vaccine batch.",
    timestamp: "10m ago",
    isNew: true,
  },
];

export default function ContactsScreen() {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 300);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    getUsers,
    users,
    setSelectedUser,
    selectedUser,
    isUserLoading,
    onlineUser,
  } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [selectedUser, getUsers]);

  const handleRoute = (user: User) => {
    setSelectedUser(user);
    router.push("/chat");
  };

  const filteredUsers =
    debouncedText.trim().length > 0
      ? users.filter((u) =>
          u.fullName.toLowerCase().includes(debouncedText.toLowerCase())
        )
      : users;

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

      {/* Main List */}
      <FlatList
        data={mockMessages}
        renderItem={({ item }) => (
          <MessageListItem
            imageUri={item.avatar}
            name={item.fullName}
            message={item.lastMessage}
            timestamp={item.timestamp}
            isActive={true}
            isNew={item.isNew}
          />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View className="h-[1px] bg-muted-100 dark:bg-muted-800 mx-4" />
        )}
        ListHeaderComponent={
          <>
            {/* Search Bar */}
            <SearchBar
              text={text}
              onTextChange={setText}
              isTyping={false}
              onClear={() => setText("")}
              placeholder="Search contacts..."
              className="mb-4"
            />

            {/* Horizontal Avatar List */}
            <FlatList
              data={filteredUsers}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleRoute(item)}>
                  <View className="items-center justify-center mx-2 pt-4">
                    <Avatar isActive={true} imageUri={item.avatar} />
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
              horizontal
              contentContainerStyle={{ paddingHorizontal: 16 }}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={
                isUserLoading ? (
                  <ActivityIndicator size="small" className="mt-4" />
                ) : (
                  <Text className="text-sm text-center text-muted-400 mt-4">
                    No contacts found.
                  </Text>
                )
              }
            />

            {/* Placeholder for actual chat list below */}
            <View className="mt-6">
              <Text className="text-base font-poppinsSemibold text-muted-700 dark:text-white">
                Chats
              </Text>
              {/* Map or FlatList of chat previews goes here */}
            </View>
          </>
        }
      />
    </View>
  );
}
