import { useAuthStore } from "@/hooks/useAuthStore";
import { getToken } from "@/lib/token";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
  console.log(authUser);

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (authUser) {
    return <Redirect href="/home" />;
  }

  return <Redirect href="/home" />;
}
