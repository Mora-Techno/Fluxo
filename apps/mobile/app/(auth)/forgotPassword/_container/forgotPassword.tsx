import ForgotPasswordSection from "@/components/section/auth/forgotPassword/page-section";
import { useAppNameSpace } from "@/hooks/costum/namespace";
import { useServiceMobile } from "@/hooks/service/module/useService";
import { FormForgotPassword } from "@repo/shared";
import { useState } from "react";
import { Keyboard, View } from "react-native";
import { useEffect } from "react";

const ForgotPasswordContainer = () => {
  const ns = useAppNameSpace();
  const service = useServiceMobile();

  //mutate
  const forgotPasswordMutate = service.auth.mutation.forgot();
  //state
  const [formForgotPassword, setFormForgotPassword] =
    useState<FormForgotPassword>({
      identifer: "",
    });
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);

  const handleForgotPassword = async () => {
    await forgotPasswordMutate.ForgotPassword(formForgotPassword);
  };

  useEffect(() => {
    const showListener = Keyboard.addListener("keyboardWillShow", () =>
      setIsKeyboardVisible(true),
    );
    const hideListener = Keyboard.addListener("keyboardWillHide", () =>
      setIsKeyboardVisible(false),
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);
  return (
    <View className="w-full min-h-screen">
      <ForgotPasswordSection
        ns={{
          theme: ns.colors,
        }}
        state={{
          formForgotPassword: formForgotPassword,
          setFormForgotPassword: setFormForgotPassword,
          isKeyboardVisible: isKeyboardVisible,
          setIsKeyBoardVisible: setIsKeyboardVisible,
        }}
        service={{
          mutate: {
            isPending: forgotPasswordMutate.isPending,
            onForgotPassword: handleForgotPassword,
          },
        }}
      />
    </View>
  );
};

export default ForgotPasswordContainer;
