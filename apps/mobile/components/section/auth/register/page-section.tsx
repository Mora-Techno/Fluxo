import { ButtonWrapper } from "@/components/wrapper/ButtonWrapper";
import { InputWrapper } from "@/components/wrapper/InputWrapper";
import { FlatColors } from "@/core/providers/theme.provinder";
import { View, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { FormRegister } from "@repo/shared";
import React from "react";
import { EyeOff } from "lucide-react-native";
import { Eye } from "lucide-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Link } from "expo-router";
import { Image } from "expo-image";

interface RegisterSectionProps {
  ns: {
    theme: FlatColors;
  };
  state: {
    formRegister: FormRegister;
    setFormRegister: React.Dispatch<React.SetStateAction<FormRegister>>;
    switch: boolean;
    setSwitch: React.Dispatch<React.SetStateAction<boolean>>;
    isKeyboardVisible: boolean;
    setIsKeyboardVisible: React.Dispatch<React.SetStateAction<boolean>>;
  };
  service: {
    mutation: {
      register: () => void;
      isPending: boolean;
    };
  };
}
const RegisterSection: React.FC<RegisterSectionProps> = ({
  ns,
  state,
  service,
}) => {
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
        className="items-center w-full px-6 "
        style={{ paddingVertical: state.isKeyboardVisible ? 20 : 48 }}
      >
        <View
          className="items-center w-full gap-6"
          style={{ marginBottom: state.isKeyboardVisible ? 20 : 40 }}
        >
          <View className="w-full flex items-center">
            <Text className="text-5xl font-extrabold text-primary">
              Create your account
            </Text>
            <Image
              source={require("@/assets/logo/Fluxo.png")}
              style={{ width: 160, height: 160 }}
              contentFit="contain"
            />
          </View>

          <View className="w-full gap-4">
            <View className="flex-row w-full gap-4">
              <View className="flex-1 gap-1">
                <Text className="text-primary font-semibold">First Name</Text>
                <InputWrapper
                  placeholder="joe"
                  value={state.formRegister.first_name}
                  onChangeText={(e) =>
                    state.setFormRegister((prev) => ({
                      ...prev,
                      first_name: e,
                    }))
                  }
                />
              </View>
              <View className="flex-1 gap-1">
                <Text className="text-primary font-semibold">Last Name</Text>
                <InputWrapper
                  placeholder="nardi"
                  value={state.formRegister.last_name}
                  onChangeText={(e) =>
                    state.setFormRegister((prev) => ({
                      ...prev,
                      last_name: e,
                    }))
                  }
                />
              </View>
            </View>

            <View className="gap-1">
              <Text className="font-semibold text-primary">Email</Text>
              <InputWrapper
                placeholder="Fluxo@gmail.com"
                value={state.formRegister.email}
                onChangeText={(e) =>
                  state.setFormRegister((prev) => ({
                    ...prev,
                    email: e,
                  }))
                }
              />
            </View>
            <View className="gap-1">
              <Text className="font-semibold text-primary">Phone</Text>
              <InputWrapper
                placeholder="0812345678"
                value={state.formRegister.phone}
                onChangeText={(e) =>
                  state.setFormRegister((prev) => ({
                    ...prev,
                    phone: e,
                  }))
                }
              />
            </View>
            <View className="gap-1">
              <Text className="font-semibold text-primary">Password</Text>
              <InputWrapper
                placeholder="*****"
                secureTextEntry={!state.switch}
                rightIcon={
                  <TouchableOpacity
                    onPress={() => state.setSwitch(!state.switch)}
                  >
                    {state.switch ? (
                      <Eye color={ns.theme.foreground} />
                    ) : (
                      <EyeOff color={ns.theme.foreground} />
                    )}
                  </TouchableOpacity>
                }
                value={state.formRegister.password}
                onChangeText={(e) =>
                  state.setFormRegister((prev) => ({
                    ...prev,
                    password: e,
                  }))
                }
              />
            </View>
          </View>
          <View className="w-full gap-10 flex justify-center">
            <ButtonWrapper
              disabled={service.mutation.isPending}
              onPress={() => service.mutation.register()}
              variant={"default"}
            >
              <Text className="font-bold text-background">Register</Text>
            </ButtonWrapper>
          </View>
          <View className="w-full">
            <Text className="text-center text-lg font-light text-foreground">
              By clicking “Create Account” your email address will be saved as
              your sign in account and you agree to our{" "}
              <Link href={"/(general)/term/page"}>
                <Text className="text-destructive font-bold">
                  Term & Conditions
                </Text>{" "}
              </Link>
              and{" "}
              <Link href={"/(general)/policy/page"}>
                <Text className="text-destructive font-bold">
                  Privacy Policy
                </Text>
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RegisterSection;
