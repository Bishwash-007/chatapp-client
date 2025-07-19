import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="chatbubble" size={24} />
            ) : (
              <Ionicons name="chatbubble-outline" size={24} />
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} />
            ) : (
              <Ionicons name="person-outline" size={24} />
            ),
        }}
      />
    </Tabs>
  );
}
