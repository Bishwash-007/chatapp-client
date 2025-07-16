import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import OAuthButton from "@/components/ui/OAuth";
import { useAuthStore } from "@/hooks/useAuthStore";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { signUp, isSigningUp } = useAuthStore();

  const validateForm = (): boolean => {
    if (!email || !fullName || !password) {
      console.warn("All fields are required.");
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

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      await signUp({ email, password, fullName });
      router.replace("/(root)/(tabs)/home");
    } catch (err) {
      console.error("Sign up failed:", err);
    }
  };

  const handleOAuth = (provider: string) => {
    console.log(`Signing in with ${provider}`);
    // You can add OAuth logic here later
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : -30}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingHorizontal: 18,
          }}
          className="bg-muted-50 dark:bg-black px-6"
        >
          <View className="flex-1 justify-center items-center py-8">
            <Text className="font-poppinsSemibold text-3xl text-muted-800 dark:text-muted-100 mb-8 text-center">
              NightCall
            </Text>

            <View className="w-full space-y-5 mb-6">
              <InputField
                label="fullName"
                placeholder="yourname"
                value={fullName}
                onChangeText={setFullName}
                iconLeft={
                  <Ionicons name="person-outline" size={20} color="#737373" />
                }
                className="w-full h-16 rounded-2xl bg-white dark:bg-muted-800 border border-muted-200 dark:border-muted-700"
              />

              <InputField
                label="Email"
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                iconLeft={
                  <Ionicons name="mail-outline" size={20} color="#737373" />
                }
                className="w-full h-16 rounded-2xl bg-white dark:bg-muted-800 border border-muted-200 dark:border-muted-700"
              />

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
                  <TouchableWithoutFeedback
                    onPress={() => setShowPassword((prev) => !prev)}
                  >
                    <View>
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="#737373"
                      />
                    </View>
                  </TouchableWithoutFeedback>
                }
                className="w-full h-16 rounded-2xl bg-white dark:bg-muted-800 border border-muted-200 dark:border-muted-700"
              />
            </View>

            <Button
              title="Sign Up"
              onPress={handleSignUp}
              className="w-full bg-muted-800 dark:bg-muted-200"
            />

            <Link href="/(auth)/sign-in" asChild>
              <Text className="mt-4 font-poppins text-sm text-muted-500 dark:text-muted-400 text-center">
                Already have an account?{" "}
                <Text className="underline">Sign In</Text>
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

            {/* OAuth Buttons */}
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

export default SignUp;
