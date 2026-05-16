import { ButtonWrapper } from "@/components/wrapper/ButtonWrapper";
import { ScrollView, View, Text } from "react-native";

interface HomeUserSectionProps {
  service: {
    mutation: {
      logout: () => void;
      isPending: boolean;
    };
  };
}
const HomeUserSection: React.FC<HomeUserSectionProps> = ({ service }) => {
  return (
    <ScrollView className="relative">
      <View className="w-full min-h-screen flex items-center justify-start">
        <Text className="text-primary">Initial Home User Section</Text>
        <ButtonWrapper
          className="w-full"
          disabled={service.mutation.isPending}
          onPress={() => service.mutation.logout()}
        >
          <Text>Keluar</Text>
        </ButtonWrapper>
      </View>
    </ScrollView>
  );
};

export default HomeUserSection;
