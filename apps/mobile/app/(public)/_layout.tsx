import { View } from "react-native";
import { Slot } from "expo-router";

export default function PublicLayout() {
  return (
    <View className="flex-1 bg-background">
      <Slot />
    </View>
  );
}
