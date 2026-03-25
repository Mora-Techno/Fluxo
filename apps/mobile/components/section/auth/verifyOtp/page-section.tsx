import OTPInput from "@/components/ui/inputOtp";
import { ButtonWrapper } from "@/components/wrapper/ButtonWrapper";
import { PickVerify } from "@repo/shared";
import { Router } from "expo-router";
import React from "react";
import { View, Text } from "react-native";
import LottieView from "lottie-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface VerifyOtpSectionProps {
  ns: {
    route: Router;
  };
  state: {
    formVerifify: PickVerify;
    setFormVerify: React.Dispatch<React.SetStateAction<PickVerify>>;
    colldown: number;
    isKeyboardVisible: boolean;
    setIsKeyboardVisible: React.Dispatch<React.SetStateAction<boolean>>;
    lottieSize: any;
  };

  service: {
    mutate: {
      verifyOtp: () => void;
      isPending: boolean;
      resend: () => void;
    };
    params: {
      hash: string;
    };
  };
}

const VerifyOtpSection: React.FC<VerifyOtpSectionProps> = ({
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
        className="items-center w-full max-w-md px-6"
        style={{ paddingVertical: state.isKeyboardVisible ? 20 : 48 }}
      >
        <View
          className="items-center"
          style={{ marginBottom: state.isKeyboardVisible ? 20 : 40 }}
        >
          <View className="flex items-center justify-center">
            <LottieView
              autoPlay
              loop
              style={{ width: state.lottieSize, height: state.lottieSize }}
              source={require("@/assets/lottie/Verify Phone Number.json")}
            />
          </View>
          <Text className="text-2xl font-bold text-foreground mb-2 text-center">
            Verifikasi Kode
          </Text>
          <Text className="text-sm text-muted-foreground text-center px-4">
            Silakan masukkan 6 digit kode verifikasi yang telah dikirim ke Email
            ...
            {}
          </Text>
        </View>

        <View className="mb-8 gap-6 w-full">
          <OTPInput
            length={6}
            onCodeChange={(e) =>
              state.setFormVerify((prev) => ({
                ...prev,
                otp: e,
              }))
            }
          />
          <ButtonWrapper
            disabled={
              service.mutate.isPending || state.formVerifify.otp?.length !== 6
            }
            onPress={() => service.mutate.verifyOtp()}
          >
            <Text className="font-bold">Verify</Text>
          </ButtonWrapper>
        </View>

        <View className="mt-4">
          <Text className="text-sm text-muted-foreground">
            Tidak menerima kode?{" "}
            {state.colldown > 0 ? (
              <Text className="text-primary font-semibold">
                ({Math.floor(state.colldown / 60)} :{" "}
                {(state.colldown % 60).toString().padStart(2, "0")})
              </Text>
            ) : (
              <Text
                className="text-primary font-semibold"
                disabled={service.mutate.isPending && state.colldown <= 0}
                onPress={() => {
                  service.mutate.resend();
                }}
              >
                Kirim Ulang
              </Text>
            )}
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default VerifyOtpSection;
