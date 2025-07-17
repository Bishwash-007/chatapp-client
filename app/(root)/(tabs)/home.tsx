import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDebounce } from "@/hooks/useDebounce";
import SearchBar from "@/components/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "@/components/ui/Avatar";
import MessageListsItem from "@/components/MessageListsItem";
import MessageListItem from "@/components/MessageListsItem";
import { getToken } from "@/lib/token";

interface Contact {
  id: string;
  name: string;
}
const mockContacts: Contact[] = [
  { id: "1", name: "Alice Johnson" },
  { id: "2", name: "Bob Smith" },
  { id: "3", name: "Charlie Garcia" },
  { id: "4", name: "David Lee" },
];

export default function ContactsScreen() {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 300);
  const [results, setResults] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = debouncedText.trim();
    setLoading(query.length > 0);

    const timer = setTimeout(() => {
      const filtered = query
        ? mockContacts.filter((c) =>
            c.name.toLowerCase().includes(query.toLowerCase())
          )
        : [];
      setResults(filtered);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [debouncedText]);

  const handleCreateChat = () => {};

  return (
    <View className="flex-1 pt-safe px-4">
      {/* header  */}
      <View className="flex flex-row justify-between py-4 ">
        <Text className="font-poppins text-xl dark:text-muted-50 text-muted-900">
          NightCall
        </Text>

        <TouchableOpacity onPress={handleCreateChat}>
          <Ionicons name="create-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <SearchBar
        text={text}
        onTextChange={setText}
        isTyping={loading || results.length > 0}
        onClear={() => setText("")}
        placeholder="Search contacts..."
      />

      {/* onilne flatlist  */}
      <View>
        <Text className="font-poppinsLight text-sm py-2">online</Text>
        <View className="flex-row gap-3">
          {Array.from({ length: 10 }, (_, i) => (
            <Avatar
              imageUri="https://i.pinimg.com/736x/ab/76/a4/ab76a49af041b0bb4ac65d8c624a171a.jpg"
              size={72}
              isActive={true}
              className="ring-2 ring-gray-300"
            />
          ))}
        </View>
      </View>

      {/* messages flatlist  */}
      <>
        <Text className="font-poppinsLight text-lg dark:text-muted-50 text-muted-900 pt-4">
          Messages
        </Text>
        {Array.from({ length: 10 }, (_, i) => (
          <MessageListItem
            imageUri="https://i.pinimg.com/736x/ab/76/a4/ab76a49af041b0bb4ac65d8c624a171a.jpg"
            name="Miru Magar"
            message="Kafle Ji Kata ho?"
            timestamp="9:30 PM"
            isNew={true}
            isActive={true}
          />
        ))}
      </>
    </View>
  );
  {
    /* {loading ? (
          <ActivityIndicator className="mt-4" size="large" color="#007AFF" />
        ) : (
          <FlatList
            data={results}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => (
              <Text className="mt-2 text-lg">{item.name}</Text>
            )}
            ListEmptyComponent={
              <Text className="mt-4 text-center text-gray-500">
                {results.length ? null : "No contacts found."}
              </Text>
            }
          />
        )} */
  }
}
