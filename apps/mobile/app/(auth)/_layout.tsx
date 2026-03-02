import { View } from "react-native";
import { Slot } from "expo-router";

export default function AuthLayout() {
  return (
    <View className="flex-1 px-6 py-12 bg-background">
      <Slot />
    </View>
  );
}
