import { PickResetPassword } from "@repo/shared";
import { ButtonWrapper } from "@/components/wrapper/ButtonWrapper";
import { InputWrapper } from "@/components/wrapper/InputWrapper";
import { Eye, EyeOff } from "lucide-react-native";
import LottieView from "lottie-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface ResetPasswordSectionProps {
  state: {
    isKeyboardVisible: boolean;
    setIsKeyboardVisible: React.Dispatch<React.SetStateAction<boolean>>;
    formResetPassword: PickResetPassword;
    setFormResetPassword: React.Dispatch<
      React.SetStateAction<PickResetPassword>
    >;
    newPassword: string;
    setNewPassword: React.Dispatch<React.SetStateAction<string>>;
    visiblePassword: boolean;
    setVisiblePassword: React.Dispatch<React.SetStateAction<boolean>>;
    visibleConfirmPassword: boolean;
    setVisibleConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
    lottieSize: number;
  };
  service: {
    mutate: {
      onReset: () => void;
      isPending: boolean;
    };
  };
}
const ResetPasswordSection: React.FC<ResetPasswordSectionProps> = ({
  state,
  service,
}) => {
  const hasMinLength = state.formResetPassword.password.trim().length >= 8;
  const isMatched =
    state.newPassword.length > 0 &&
    state.formResetPassword.password === state.newPassword;
  const isInvalidConfirm = state.newPassword.length > 0 && !isMatched;
  const canSubmit = hasMinLength && isMatched && !service.mutate.isPending;

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
        className="items-center w-full px-6"
        style={{ paddingVertical: state.isKeyboardVisible ? 20 : 48 }}
      >
        <View
          className="items-center w-full gap-6"
          style={{ marginBottom: state.isKeyboardVisible ? 20 : 40 }}
        >
          <View className="items-center justify-center">
            <LottieView
              autoPlay
              loop
              style={{ width: state.lottieSize, height: state.lottieSize }}
              source={require("@/assets/lottie/Fingerprint.json")}
            />
          </View>

          <View className="w-full gap-2">
            <Text className="text-4xl font-extrabold text-primary">
              Reset Password
            </Text>
            <Text className="text-base text-muted-foreground">
              Create a new password to secure your account.
            </Text>
          </View>

          <View className="w-full gap-4">
            <InputWrapper
              placeholder="New Password"
              secureTextEntry={!state.visiblePassword}
              autoCapitalize="none"
              autoCorrect={false}
              value={state.formResetPassword.password}
              onChangeText={(e) =>
                state.setFormResetPassword((prev) => ({
                  ...prev,
                  password: e,
                }))
              }
              rightIcon={
                <TouchableOpacity
                  onPress={() =>
                    state.setVisiblePassword(!state.visiblePassword)
                  }
                >
                  {state.visiblePassword ? (
                    <Eye size={18} className="text-muted-foreground" />
                  ) : (
                    <EyeOff size={18} className="text-muted-foreground" />
                  )}
                </TouchableOpacity>
              }
            />

            <InputWrapper
              placeholder="Confirm New Password"
              secureTextEntry={!state.visibleConfirmPassword}
              autoCapitalize="none"
              autoCorrect={false}
              value={state.newPassword}
              onChangeText={(e) => state.setNewPassword(e)}
              rightIcon={
                <TouchableOpacity
                  onPress={() =>
                    state.setVisibleConfirmPassword(
                      !state.visibleConfirmPassword,
                    )
                  }
                >
                  {state.visibleConfirmPassword ? (
                    <Eye size={18} className="text-muted-foreground" />
                  ) : (
                    <EyeOff size={18} className="text-muted-foreground" />
                  )}
                </TouchableOpacity>
              }
            />

            {!hasMinLength && state.formResetPassword.password.length > 0 && (
              <Text className="text-sm text-destructive">
                Password must be at least 8 characters.
              </Text>
            )}

            {isInvalidConfirm && (
              <Text className="text-sm text-destructive">
                Confirmation password does not match.
              </Text>
            )}
          </View>

          <View className="w-full gap-3">
            <ButtonWrapper
              disabled={!canSubmit}
              onPress={service.mutate.onReset}
            >
              <Text className="font-bold text-background">
                {service.mutate.isPending ? "Updating..." : "Update Password"}
              </Text>
            </ButtonWrapper>

            <Text className="text-center text-sm text-muted-foreground">
              Use a combination of uppercase, lowercase, number, and symbol for
              better security.
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ResetPasswordSection;
