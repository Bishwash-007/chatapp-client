import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import OAuthButton from "@/components/ui/OAuth";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useThemeStore } from "@/hooks/useThemeStore";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { logIn, isLoggingIn } = useAuthStore();
  

  const validateForm = (): boolean => {
    if (!email || !password) {
      console.warn("Both fields are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn("Enter a valid email.");
      return false;
    }

    if (password.length < 6) {
      console.warn("Password must be longer than 6 characters.");
      return false;
    }

    return true;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;

    try {
      await logIn({ email, password });
      router.replace("/(root)/(tabs)/home");
    } catch (err) {
      console.error("Sign in failed:", err);
    }
  };

  const handleOAuth = (provider: string) => {
    console.log(`Signing in with ${provider}`);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : -30}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingHorizontal: 18,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          className="bg-muted-50 dark:bg-black"
        >
          <View className="flex-1 w-full px-6 justify-center items-center bg-muted-50 dark:bg-black">
            <Text className="font-poppinsSemibold text-3xl text-muted-800 dark:text-muted-100 mb-8 text-center">
              NightCall
            </Text>

            <View className="w-full space-y-5 mb-6">
              {/* Username */}
              <InputField
                label="Email"
                placeholder="yourname"
                value={email}
                onChangeText={setEmail}
                iconLeft={
                  <Ionicons name="person-outline" size={20} color="#737373" />
                }
                className="w-full h-16 rounded-2xl bg-white dark:bg-muted-800 border border-muted-200 dark:border-muted-700"
              />

              {/* Password */}
              <InputField
                label="Password"
                placeholder="Your password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                iconLeft={
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#737373"
                  />
                }
                iconRight={
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#737373"
                    onPress={() => setShowPassword((prev) => !prev)}
                  />
                }
                className="w-full h-16 rounded-2xl bg-white dark:bg-muted-800 border border-muted-200 dark:border-muted-700"
              />
            </View>

            {/* Sign In Button */}
            <Button
              title="Sign In"
              className="w-full bg-muted-800 dark:bg-muted-200"
              onPress={handleSignIn}
            />

            {/* Sign In Redirect */}
            <Link href="/(auth)/sign-up" asChild>
              <Text className="mt-4 font-poppins text-sm text-muted-500 dark:text-muted-400">
                Don&apos;t have an account?
                <Text className="underline"> SignUp</Text>
              </Text>
            </Link>

            {/* Separator */}
            <View className="w-full flex-row items-center justify-center gap-3 my-6">
              <View className="flex-1 h-[1px] bg-muted-300 dark:bg-muted-700" />
              <Text className="text-sm text-muted-500 dark:text-muted-400 font-poppinsLight">
                or
              </Text>
              <View className="flex-1 h-[1px] bg-muted-300 dark:bg-muted-700" />
            </View>

            <View className="flex-row w-full justify-center gap-4">
              <OAuthButton
                iconName="google"
                onPress={() => handleOAuth("google")}
              />
              <OAuthButton
                iconName="github"
                onPress={() => handleOAuth("github")}
              />
              <OAuthButton
                iconName="facebook"
                onPress={() => handleOAuth("facebook")}
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
