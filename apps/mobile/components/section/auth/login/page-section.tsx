import { ScrollView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { Router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { FlatColors } from "@/core/providers/theme.provinder";
import { InputWrapper } from "@/components/wrapper/InputWrapper";
import { ButtonWrapper } from "@/components/wrapper/ButtonWrapper";
import React from "react";
import { FormLogin } from "@repo/shared";
import { Link } from "expo-router";

interface LoginSectionProps {
  ns: {
    router: Router;
    theme: FlatColors;
  };
  service: {
    mutation: {
      login: () => void;
      isPending: boolean;
    };
  };
  state: {
    formLogin: FormLogin;
    setFormLogin: React.Dispatch<React.SetStateAction<FormLogin>>;
  };
}
const LoginSection: React.FC<LoginSectionProps> = ({ ns, state, service }) => {
  return (
    <ScrollView className="relative">
      <View className="w-full min-h-screen flex items-center justify-start flex-col gap-20">
        <View className="w-full flex-row  ">
          <ChevronLeft
            color={ns.theme.foreground}
            width={30}
            height={30}
            onPress={() => ns.router.back()}
          />
          <Text className="text-2xl font-bold">Back</Text>
        </View>
        <View className="w-full">
          <Text className="text-5xl font-extrabold text-primary">
            Login to your account
          </Text>
        </View>
        <View className="w-full gap-10">
          <InputWrapper
            placeholder="Email or Phone Number"
            value={state.formLogin.identifer}
            onChangeText={(e) =>
              state.setFormLogin((prev) => ({
                ...prev,
                identifer: e,
              }))
            }
          />
          <InputWrapper
            placeholder="Password"
            secureTextEntry={true}
            value={state.formLogin.password}
            onChangeText={(e) =>
              state.setFormLogin((prev) => ({
                ...prev,
                password: e,
              }))
            }
          />
        </View>
        <View className="w-full gap-5 flex justify-center">
          <ButtonWrapper onPress={() => service.mutation.login()}>
            <Text className="font-bold">Login</Text>
          </ButtonWrapper>
          <Link href={"/forgotPassword/page"}>
            <Text className="w-full text-center text-lg font-semibold text-primary">
              Forget Password
            </Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginSection;
