import { ButtonWrapper } from "@/components/wrapper/ButtonWrapper";
import { InputWrapper } from "@/components/wrapper/InputWrapper";
import { FlatColors } from "@/core/providers/theme.provinder";
import { FormForgotPassword } from "@repo/shared";

import { View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface ForgotPasswordSectionProps {
  ns: {
    theme: FlatColors;
  };
  state: {
    formForgotPassword: FormForgotPassword;
    setFormForgotPassword: React.Dispatch<
      React.SetStateAction<FormForgotPassword>
    >;
    isKeyboardVisible: boolean;
    setIsKeyBoardVisible: React.Dispatch<React.SetStateAction<boolean>>;
  };
  service: {
    mutate: {
      isPending: boolean;
      onForgotPassword: () => void;
    };
  };
}
const ForgotPasswordSection: React.FC<ForgotPasswordSectionProps> = ({
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
      showsHorizontalScrollIndicator={false}
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
          <View className="w-full gap-2">
            <Text className="font-bold text-4xl text-primary">
              Verifikasi Akun Anda
            </Text>
            <InputWrapper
              placeholder="Masukkan Email/Nomor Hp"
              onChangeText={(e) =>
                state.setFormForgotPassword((prev) => ({
                  ...prev,
                  identifer: e,
                }))
              }
            />
            <ButtonWrapper
              disabled={service.mutate.isPending}
              onPress={() => service.mutate.onForgotPassword()}
            >
              <Text className="font-bold">Contine</Text>
            </ButtonWrapper>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ForgotPasswordSection;
