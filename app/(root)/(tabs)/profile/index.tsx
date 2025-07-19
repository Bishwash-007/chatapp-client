import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Switch,
  Alert,
} from "react-native";
import { useAuthStore } from "@/hooks/useAuthStore";
import { Feather } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import { useThemeStore } from "@/hooks/useThemeStore";

const placeholderImg = require("@/assets/images/placeholder.png");

const ProfileScreen = () => {
  const { authUser, logOut } = useAuthStore();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const handleEditProfile = () => {
    try {
      router.push("/(root)/(tabs)/profile/editprofile");
    } catch (err) {
      console.error("Navigation error:", err);
      setError("Failed to navigate. Please try again.");
    }
  };

  const handleLogout = async () => {
    await logOut();
    router.replace("/");
  };

  const { theme, resolvedTheme, toggleTheme } = useThemeStore();
  const isDarkMode = resolvedTheme === "dark";

  const displayUri = authUser?.avatar;

  return (
    <View className="flex-1 bg-white dark:bg-black pt-16 px-6">
      {/* Avatar & Edit */}
      <View className="items-center">
        <Image
          source={displayUri ? { uri: displayUri } : placeholderImg}
          className="w-32 h-32 rounded-full bg-gray-200 dark:bg-neutral-800"
        />
        <TouchableOpacity
          onPress={handleEditProfile}
          className="mt-4 flex-row items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-neutral-800 rounded-full shadow-sm"
        >
          <Text className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Edit Profile
          </Text>
          <Feather
            name="edit-3"
            size={18}
            color={isDarkMode ? "#f4f4f5" : "#0f0f0f"}
          />
        </TouchableOpacity>
      </View>

      {/* Error */}
      {error && (
        <Text className="mt-3 text-red-500 text-sm text-center">{error}</Text>
      )}

      {/* User Info */}
      <View className="mt-6 items-center">
        <Text className="text-xl font-semibold text-black dark:text-white">
          {authUser?.fullName || "Unknown User"}
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          {authUser?.email || "No email"}
        </Text>
      </View>

      {/* Settings */}
      <View className="mt-10 w-full space-y-6 border-t border-gray-200 dark:border-gray-700 pt-6">
        <Text className="text-lg font-semibold text-black dark:text-white">
          Settings
        </Text>

        {/* Theme Toggle */}
        <SettingItem
          title="Dark Mode"
          subtitle={theme === "system" ? "(System)" : undefined}
          control={
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              thumbColor={isDarkMode ? "#fff" : "#000"}
              trackColor={{ false: "#ccc", true: "#444" }}
            />
          }
        />

        {/* Logout */}
        <SettingItem
          title="Log out"
          onPress={handleLogout}
          icon={
            <Feather
              name="log-out"
              size={22}
              color={isDarkMode ? "#f4f4f5" : "#0f0f0f"}
            />
          }
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const SettingItem = ({
  title,
  subtitle,
  control,
  icon,
  onPress,
}: {
  title: string;
  subtitle?: string;
  control?: React.ReactNode;
  icon?: React.ReactNode;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      className="flex-row items-center justify-between bg-gray-100 dark:bg-neutral-800 px-4 py-3 rounded-xl"
    >
      <View>
        <Text className="text-base font-medium text-black dark:text-white">
          {title}
        </Text>
        {subtitle && (
          <Text className="text-xs text-gray-500 dark:text-gray-400">
            {subtitle}
          </Text>
        )}
      </View>
      {control || icon}
    </TouchableOpacity>
  );
};
