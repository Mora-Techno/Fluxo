import { ButtonWrapper } from "@/components/wrapper/ButtonWrapper";
import { InputWrapper } from "@/components/wrapper/InputWrapper";
import { FlatColors } from "@/core/providers/theme.provinder";
import { Router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { ScrollView, View, Text } from "react-native";
import { FormRegister } from "../../../../../module/@types/auth.types";
import React from "react";

interface RegisterSectionProps {
  ns: {
    router: Router;
    theme: FlatColors;
  };
  state: {
    formRegister: FormRegister;
    setFormRegister: React.Dispatch<React.SetStateAction<FormRegister>>;
  };
  service: {
    mutation: {
      register: () => void;
    };
  };
}
const RegisterSection: React.FC<RegisterSectionProps> = ({
  ns,
  state,
  service,
}) => {
  return (
    <ScrollView className="relative">
      <View className="w-full min-h-screen flex items-center justify-start flex-col gap-20">
        <View className="w-full flex-row ">
          <ChevronLeft
            color={ns.theme.foreground}
            width={30}
            height={30}
            onPress={() => ns.router.back()}
          />
          <Text className="text-2xl font-bold text-foreground">Back</Text>
        </View>
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
            onPress={() => service.mutation.register()}
            variant={"destructive"}
          >
            <Text className="font-bold text-foreground">Register</Text>
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
    </ScrollView>
  );
};

export default RegisterSection;
