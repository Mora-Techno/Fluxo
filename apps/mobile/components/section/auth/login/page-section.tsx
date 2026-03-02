import { ScrollView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { Router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { FlatColors } from "@/core/providers/theme.provinder";
import { InputWrapper } from "@/components/wrapper/InputWrapper";
import { ButtonWrapper } from "@/components/wrapper/ButtonWrapper";

interface LoginSectionProps {
  namespace: {
    router: Router;
    theme: FlatColors;
  };
}
const LoginSection: React.FC<LoginSectionProps> = ({ namespace }) => {
  return (
    <ScrollView className="relative">
      <View className="w-full min-h-screen flex items-center justify-start flex-col gap-20">
        <View className="w-full flex-row  gap-2">
          <ChevronLeft
            color={namespace.theme.foreground}
            width={30}
            height={30}
            onPress={() => namespace.router.back()}
          />
          <Text className="text-2xl font-light">Back</Text>
        </View>
        <View className="w-full">
          <Text className="text-5xl font-extrabold text-primary">
            Login to your account
          </Text>
        </View>
        <View className="w-full gap-10">
          <InputWrapper placeholder="Email or Phone Number" />
          <InputWrapper placeholder="Email or Phone Number" />
        </View>
        <View className="w-full gap-10 flex justify-center">
          <ButtonWrapper>
            <Text>Login</Text>
          </ButtonWrapper>
          <Text className="w-full text-center text-lg font-semibold text-primary">
            Forget Password
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginSection;
