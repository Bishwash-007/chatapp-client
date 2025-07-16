import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const onboarding = () => {
  return (
    <View className="h-full items-center justify-center flex flex-1 gap-6">
      <Link href={`/(auth)/sign-in`} asChild>
        <Text>SignIn</Text>
      </Link>
      <Link href={`/(auth)/sign-up`} asChild>
        <Text>SignUp</Text>
      </Link>
    </View>
  );
};

export default onboarding;
