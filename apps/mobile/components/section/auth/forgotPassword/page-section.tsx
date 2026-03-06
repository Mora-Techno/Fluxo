import { FlatColors } from "@/core/providers/theme.provinder";
import { Router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { ScrollView, View, Text } from "react-native";

interface ForgotPasswordSectionProps {
  namespace: {
    router: Router;
    theme: FlatColors;
  };
}
const ForgotPasswordSection: React.FC<ForgotPasswordSectionProps> = ({
  namespace,
}) => {
  return (
    <ScrollView className="relative">
      <View className="w-full min-h-screen flexx justify-start items-center">
        <View className="w-full flex-row  gap-2">
          <ChevronLeft
            color={namespace.theme.foreground}
            width={30}
            height={30}
            onPress={() => namespace.router.back()}
          />
          <Text className="text-2xl font-bold text-foreground">Back</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordSection;
