import { ButtonWrapper } from "@/components/wrapper/ButtonWrapper";
import { InputWrapper } from "@/components/wrapper/InputWrapper";
import { FlatColors } from "@/core/providers/theme.provinder";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { FormRegister } from "@repo/shared";
import React from "react";
import { EyeOff } from "lucide-react-native";
import { Eye } from "lucide-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
      style={{ flex: 1, backgroundColor: "transparent" }}
    >
      <View
        className="items-center w-full "
        style={{ paddingVertical: state.isKeyboardVisible ? 20 : 48 }}
      >
        <View
          className="items-center w-full gap-6"
          style={{ marginBottom: state.isKeyboardVisible ? 20 : 40 }}
        >
          <View className="w-full">
            <Text className="text-5xl font-extrabold text-primary">
              Createyour account
            </Text>
          </View>
          <View className="w-full gap-10">
            <InputWrapper
              placeholder="First Name"
              value={state.formRegister.first_name}
              onChangeText={(e) =>
                state.setFormRegister((prev) => ({
                  ...prev,
                  first_name: e,
                }))
              }
            />
            <InputWrapper
              placeholder="Last Name"
              value={state.formRegister.last_name}
              onChangeText={(e) =>
                state.setFormRegister((prev) => ({
                  ...prev,
                  last_name: e,
                }))
              }
            />
            <InputWrapper
              placeholder="Email or Phone Number"
              value={state.formRegister.identifer}
              onChangeText={(e) =>
                state.setFormRegister((prev) => ({
                  ...prev,
                  identifer: e,
                }))
              }
            />
            <InputWrapper
              placeholder="Password"
              secureTextEntry={!state.switch}
              rightIcon={
                <TouchableOpacity
                  onPress={() => state.setSwitch(!state.switch)}
                >
                  {state.switch ? (
                    <Eye className={ns.theme.foreground} />
                  ) : (
                    <EyeOff className={ns.theme.foreground} />
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
              <Text className="text-destructive font-bold">
                Term & Conditions
              </Text>{" "}
              and{" "}
              <Text className="text-destructive font-bold">Privacy Policy</Text>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RegisterSection;
