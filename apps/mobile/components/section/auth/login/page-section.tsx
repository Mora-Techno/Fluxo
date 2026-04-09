import { TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/text";
import { FlatColors } from "@/core/providers/theme.provinder";
import { InputWrapper } from "@/components/wrapper/InputWrapper";
import { ButtonWrapper } from "@/components/wrapper/ButtonWrapper";
import React from "react";
import { FormLogin } from "@repo/shared";
import { Link } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Eye, EyeOff } from "lucide-react-native";

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
    render: "email" | "phone";
    setRender: React.Dispatch<React.SetStateAction<"email" | "phone">>;
    switching: boolean;
    setSwitching: React.Dispatch<React.SetStateAction<boolean>>;
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
      style={{ flex: 1, backgroundColor: ns.theme.background }}
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
            <View className="w-full flex justify-center">
              <Text className="text-7xl font-extrabold text-primary">
                Fluxo
              </Text>
            </View>
            <Image
              source={require("@/assets/logo/Fluxo.png")}
              style={{ width: 160, height: 160 }}
              contentFit="contain"
            />
          </View>
          <View className="w-full flex  justify-center flex-col my-2">
            <Text className="text-4xl text-center font-extrabold text-primary">
              Welcome Back
            </Text>
            <Text className="text-lg text-center font-semibold font-">
              Your sentient home is waiting
            </Text>
          </View>
          <View className=" flex gap-2 justify-between flex-row items-center px-14 ">
            <View className="">
              <ButtonWrapper
                className={`w-full ${state.render === "email" ? "bg-primary" : "bg-secondary"}`}
                onPress={() => state.setRender("email")}
                startIcon={
                  <Ionicons
                    name="mail"
                    size={16}
                    color={`${state.render === "email" ? ns.theme.secondary : ns.theme.foreground}`}
                  />
                }
              >
                <Text
                  variant={"h1"}
                  className={
                    state.render === "email"
                      ? "text-background"
                      : "text-foreground"
                  }
                >
                  Email
                </Text>
              </ButtonWrapper>
            </View>
            <View className="">
              <ButtonWrapper
                onPress={() => state.setRender("phone")}
                className={`w-full ${state.render === "phone" ? "bg-primary" : "bg-secondary"}`}
                startIcon={
                  <Ionicons
                    name="phone-portrait"
                    size={16}
                    color={`${state.render === "phone" ? ns.theme.secondary : ns.theme.foreground}`}
                  />
                }
              >
                <Text
                  variant={"h1"}
                  className={
                    state.render === "email"
                      ? "text-foreground"
                      : "text-background"
                  }
                >
                  Phone
                </Text>
              </ButtonWrapper>
            </View>
          </View>

          <View className=" gap-6 mt-4 w-full">
            <InputWrapper
              placeholder={
                state.render === "email" ? "fluxo@gmail.com" : "082345678"
              }
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
              placeholder="password"
              secureTextEntry={!state.switching}
              value={state.formLogin.password}
              rightIcon={
                <TouchableOpacity
                  onPress={() => state.setSwitching(!state.switching)}
                >
                  {state.switching ? (
                    <Eye className={ns.theme.foreground} />
                  ) : (
                    <EyeOff className={ns.theme.foreground} />
                  )}
                </TouchableOpacity>
              }
              onChangeText={(e) =>
                state.setFormLogin((prev) => ({
                  ...prev,
                  password: e,
                }))
              }
            />
            <Link href={"/forgotPassword/page"} className="w-full">
              <Text className="w-full text-end  text-lg  text-primary">
                Forgot Password?
              </Text>
            </Link>
          </View>
          <View className="w-full gap-6 mt-6  flex justify-center">
            <ButtonWrapper
              disabled={service.mutation.isPending}
              onPress={() => service.mutation.login()}
            >
              <Text className="font-bold">Login</Text>
            </ButtonWrapper>
          </View>
          <View className="w-full flex items-center my-2">
            <ButtonWrapper
              className="w-full"
              variant={"auth"}
              startIcon={<Ionicons name="logo-google" size={16} />}
            >
              <Text className="font-bold">Login With Goggle</Text>
            </ButtonWrapper>
          </View>
          <View className="mt-5">
            <Text className=" text-center">
              New User?
              <Link href={"/(auth)/register/page"}>
                <Text className="text-primary font-bold">Create Profile</Text>
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginSection;
