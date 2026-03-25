import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Router } from "expo-router";

import { FlatColors } from "@/core/providers/theme.provinder";
import { InputWrapper } from "@/components/wrapper/InputWrapper";
import { ButtonWrapper } from "@/components/wrapper/ButtonWrapper";
import React from "react";
import { FormLogin } from "@repo/shared";
import { Link } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LottieView from "lottie-react-native";

interface LoginSectionProps {
  ns: {
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
    isKeyboardVisible: boolean;
    setIsKeyboardVisible: React.Dispatch<React.SetStateAction<boolean>>;
    lottieSize: any;
  };
}
const LoginSection: React.FC<LoginSectionProps> = ({ ns, state, service }) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: state.isKeyboardVisible ? "flex-start" : "center",
        alignItems: "center",
      }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={24}
      style={{ flex: 1, backgroundColor: "transparent" }}
    >
      <View
        className="items-center w-full  px-6"
        style={{ paddingVertical: state.isKeyboardVisible ? 20 : 48 }}
      >
        <View
          className="items-center w-full"
          style={{ marginBottom: state.isKeyboardVisible ? 20 : 40 }}
        >
          <View className="flex items-center justify-center">
            <LottieView
              autoPlay
              loop
              style={{ width: state.lottieSize, height: state.lottieSize }}
              source={require("@/assets/lottie/Login Character Animation.json")}
            />
          </View>
          <View className="w-full">
            <Text className="text-5xl font-extrabold text-primary">
              Login to your account
            </Text>
          </View>
          <View className=" gap-6 mt-4 w-full">
            <InputWrapper
              placeholder="Email or Phone Number"
              className="w-full  "
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
          <View className="w-full gap-6 mt-6  flex justify-center">
            <ButtonWrapper
              disabled={service.mutation.isPending}
              onPress={() => service.mutation.login()}
            >
              <Text className="font-bold">Login</Text>
            </ButtonWrapper>

            <Link href={"/forgotPassword/page"}>
              <Text className="w-full text-center text-lg font-semibold text-primary">
                Forgot Password
              </Text>
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginSection;
