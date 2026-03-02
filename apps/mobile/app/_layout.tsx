import "@/styles/global.css";

import { Stack } from "expo-router";
import ThemeToggle from "@/components/ui/toggleTheme";
import { useTheme } from "@/core/providers/theme.provinder";
import { AppProviders } from "./provinder";
import { useMemo } from "react";

function RootLayoutContent() {
  const { colors, isDark, theme } = useTheme();

  const screenOptions = useMemo(
    () => ({
      headerStyle: {
        backgroundColor: isDark ? colors.card : colors.background,
      },
      headerTintColor: colors.text,
      headerRight: () => <ThemeToggle />,
    }),
    [colors.background, colors.card, colors.text, isDark],
  );

  return (
    <Stack key={theme} screenOptions={screenOptions}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(public)/home/page"
        options={{
          title: "Home",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="(auth)/login/page"
        options={{
          title: "Sign In",
          headerShown: true,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="(private)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AppProviders>
      <RootLayoutContent />
    </AppProviders>
  );
}
