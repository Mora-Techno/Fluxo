import { ButtonWrapper } from "@/components/wrapper/ButtonWrapper";
import { InputWrapper } from "@/components/wrapper/InputWrapper";
import { FlatColors } from "@/core/providers/theme.provinder";
import { FormForgotPassword, kebabCaseToWords } from "@repo/shared";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SelectedAuthWrapper } from "@/types/form";

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
  isActive: {
    selectForgotPassword: SelectedAuthWrapper;
    setSelectForgotPassword: React.Dispatch<
      React.SetStateAction<SelectedAuthWrapper>
    >;
  };
}
const ForgotPasswordSection: React.FC<ForgotPasswordSectionProps> = ({
  ns,
  state,
  service,
  isActive,
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
            <Text className="font-extrabold text-4xl text-primary">
              Verifikasi Your Account
            </Text>

            <Text className="font-semibold text-lg">
              Masukkan email yang terdaftar, kami akan mengirimkan tautan
              pemulihan
            </Text>

            <View className="w-full flex flex-row justify-between items-center gap-2">
              <ButtonWrapper
                className={`flex-1 ${isActive.selectForgotPassword === "email" ? "bg-primary" : "bg-background"}`}
                variant={"auth"}
                onPress={() => isActive.setSelectForgotPassword("email")}
              >
                <Text
                  className={`font-semibold ${isActive.selectForgotPassword === "email" ? "text-background" : "text-foreground"}`}
                >
                  Email
                </Text>
              </ButtonWrapper>
              <ButtonWrapper
                className={`flex-1 ${isActive.selectForgotPassword === "phone" ? "bg-primary" : "bg-background"}`}
                variant={"auth"}
                onPress={() => isActive.setSelectForgotPassword("phone")}
              >
                <Text
                  className={`font-semibold ${isActive.selectForgotPassword === "phone" ? "text-background" : "text-foreground"}`}
                >
                  Phone
                </Text>
              </ButtonWrapper>
              <ButtonWrapper
                className={`flex-1 ${isActive.selectForgotPassword === "username" ? "bg-primary" : "bg-background"}`}
                variant={"auth"}
                onPress={() => isActive.setSelectForgotPassword("username")}
              >
                <Text
                  className={`font-semibold ${isActive.selectForgotPassword === "username" ? "text-background" : "text-foreground"}`}
                >
                  Username
                </Text>
              </ButtonWrapper>
            </View>
            <View className="w-full">
              <Text variant={"h3"} className="text-primary">
                {kebabCaseToWords(isActive.selectForgotPassword)}
              </Text>
              <InputWrapper
                // rightIcon={}
                placeholder="Enter "
                onChangeText={(e) =>
                  state.setFormForgotPassword((prev) => ({
                    ...prev,
                    identifer: e,
                  }))
                }
              />
            </View>

            <ButtonWrapper
              disabled={service.mutate.isPending}
              onPress={() => service.mutate.onForgotPassword()}
            >
              <Text variant={"h4"} className="font-semibold text-background">
                Contine
              </Text>
            </ButtonWrapper>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ForgotPasswordSection;
