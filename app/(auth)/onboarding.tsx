import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link, Redirect } from "expo-router";
import { useAuthStore } from "@/hooks/useAuthStore";

const Onboarding = () => {
  const { authUser } = useAuthStore();

  if (authUser) {
    return <Redirect href="/home" />;
  }

  return (
    <View className="flex-1 items-center justify-center gap-6 bg-white dark:bg-black">
      <Link href="/(auth)/sign-in" asChild>
        <Pressable>
          <Text className="text-lg text-blue-500">Sign In</Text>
        </Pressable>
      </Link>

      <Link href="/(auth)/sign-up" asChild>
        <Pressable>
          <Text className="text-lg text-green-500">Sign Up</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Onboarding;
