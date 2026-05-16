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
import { SelectedAuth } from "@/types/form";
import { kebabCaseToWords } from "@repo/shared";

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
    render: SelectedAuth;
    setRender: React.Dispatch<React.SetStateAction<SelectedAuth>>;
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
          <View className=" flex w-full gap-2 justify-between flex-row items-center  ">
            <ButtonWrapper
              className={`flex-1 ${state.render === "username" ? "bg-primary" : "bg-secondary"}`}
              onPress={() => state.setRender("username")}
              startIcon={
                <Ionicons
                  name="person"
                  size={16}
                  color={`${state.render === "username" ? ns.theme.secondary : ns.theme.foreground}`}
                />
              }
            >
              <Text
                variant={"h1"}
                className={`font-semibold ${
                  state.render === "username"
                    ? "text-background"
                    : "text-foreground"
                }`}
              >
                Username
              </Text>
            </ButtonWrapper>

            <ButtonWrapper
              onPress={() => state.setRender("phone")}
              className={`flex-1 ${state.render === "phone" ? "bg-primary" : "bg-secondary"}`}
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
                className={`font-semibold ${
                  state.render === "phone"
                    ? "text-background"
                    : "text-foreground"
                }`}
              >
                Phone
              </Text>
            </ButtonWrapper>
          </View>

          <View className=" gap-6 mt-4 w-full">
            <View className="gap-1">
              <Text variant={"h4"} className="font-semibold text-primary">
                {kebabCaseToWords(state.render)}
              </Text>
              <InputWrapper
                placeholder={
                  state.render === "username" ? "Fluxo" : "082345678"
                }
                leftIcon={
                  state.render === "username" ? (
                    <Ionicons
                      name="person"
                      size={16}
                      color={`${state.render === "username" ? ns.theme.foreground : ns.theme.background}`}
                    />
                  ) : (
                    <Ionicons
                      name="phone-portrait"
                      size={16}
                      color={`${state.render === "phone" ? ns.theme.foreground : ns.theme.background}`}
                    />
                  )
                }
                className="w-full"
                value={
                  state.render === "username"
                    ? state.formLogin.username
                    : state.formLogin.phone
                }
                onChangeText={(e) =>
                  state.setFormLogin((prev) => ({
                    ...prev,
                    [state.render]: e,
                  }))
                }
              />
            </View>
            <View className="gap-1">
              <Text variant={"h4"} className="font-semibold text-primary">
                Password
              </Text>
              <InputWrapper
                placeholder="Password"
                secureTextEntry={!state.switching}
                value={state.formLogin.password}
                leftIcon={
                  <Ionicons
                    name="lock-closed"
                    color={`${ns.theme.foreground}`}
                    size={16}
                  />
                }
                rightIcon={
                  <TouchableOpacity
                    onPress={() => state.setSwitching(!state.switching)}
                  >
                    {state.switching ? (
                      <Eye color={ns.theme.foreground} />
                    ) : (
                      <EyeOff color={ns.theme.foreground} />
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
            </View>

            <Link href={"/forgotPassword/page"} className="w-full text-right">
              <Text variant={"h4"} className="text-primary">
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
          <View className="w-full flex flex-row justify-center   gap-2 m-2 overflow-x-hidden ">
            <ButtonWrapper
              className="flex-1"
              variant={"auth"}
              startIcon={
                <Ionicons name="logo-google" size={16} color={ns.theme.text} />
              }
            >
              <Text className="font-bold">Login With Goggle</Text>
            </ButtonWrapper>

            <ButtonWrapper
              className="flex-1"
              variant={"auth"}
              startIcon={
                <Ionicons name="logo-apple" size={16} color={ns.theme.text} />
              }
            >
              <Text className="font-bold">Login With Apple</Text>
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
          {/* digunakan ketika develop */}
          <View className="mt-5">
            <Link href={"/(auth)/addUsername/page"}>
              <Text className="text-primary font-bold">Akses Cepat</Text>
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginSection;
