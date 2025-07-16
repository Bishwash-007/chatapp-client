import { useAuthStore } from "@/hooks/useAuthStore";
import { useEffect } from "react";
import { View, Text } from "react-native";

const HomeScreen = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) return <Text>loading....</Text>;

  console.log(authUser);
  return (
    <>
      <View></View>
    </>
  );
};
export default HomeScreen;
