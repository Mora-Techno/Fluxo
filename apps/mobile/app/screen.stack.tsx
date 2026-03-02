import "@/styles/global.css";

import { Stack } from "expo-router";
import ThemeToggle from "@/components/ui/toggleTheme";
import { useTheme } from "@/core/providers/theme.provinder";
import { useMemo } from "react";
export function RootLayoutContent() {
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
    <Stack
      key={theme}
      screenOptions={{
        ...screenOptions,
        headerShown: false,
      }}
    />
  );
}
