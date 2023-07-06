import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack, Tabs, useRouter } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import React from "react";
import IconButton from "../../components/UI/IconButton";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  function manageExpensePressHandler(): void {
    router.push("/expense");
  }
  return (
    <Tabs
      screenOptions={{
        headerTitle: "Expenses Overview",
        title: "Tab Layout",
        headerStyle: {
          backgroundColor: Colors.primary500,
        },
        headerRight: ({ tintColor }) => (
          <IconButton
            color={tintColor}
            icon="add"
            size={30}
            onPress={manageExpensePressHandler}
          />
        ),
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: Colors.primary500 },
        tabBarActiveTintColor: Colors.accent500,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Recent Expenses",
          title: "Recent Expenses",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="history" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="allExpenses"
        options={{
          headerTitle: "All Expenses",
          title: "All expenses",
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
    </Tabs>
  );
}
