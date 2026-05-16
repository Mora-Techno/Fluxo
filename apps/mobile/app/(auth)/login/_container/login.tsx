import { Keyboard, View } from "react-native";
import LoginSection from "@/components/section/auth/login/page-section";
import { useAppNameSpace } from "@/hooks/costum/namespace";
import { useEffect, useMemo, useState } from "react";
import { FormLogin } from "@repo/shared";
import { useServiceMobile } from "@/hooks/service/module/useService";
import { SelectedAuth } from "@/types/form";

const LoginContainer = () => {
  const namespace = useAppNameSpace();
  const service = useServiceMobile();
  // mutate
  const loginMutation = service.auth.mutation.login();
  //state
  const [formLogin, setFormLogin] = useState<FormLogin>({
    phone: "",
    username: "",
    password: "",
  });

  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
  const [render, setRender] = useState<SelectedAuth>("username");
  const [switching, setSwitching] = useState<boolean>(false);
  // handler
  const handlerLogin = async () => {
    await loginMutation.login(formLogin);
  };

  // async
  useEffect(() => {
    const showListener = Keyboard.addListener("keyboardWillShow", () => {
      setIsKeyboardVisible(true);
    });
    const hideListener = Keyboard.addListener("keyboardWillHide", () =>
      setIsKeyboardVisible(false),
    );
    return () => {
      (showListener.remove(), hideListener.remove());
    };
  }, []);

  const lottieSize = useMemo(
    () => (isKeyboardVisible ? 145 : 305),
    [isKeyboardVisible],
  );
  return (
    <View className="w-full min-h-screen ">
      <LoginSection
        ns={{
          theme: namespace.colors,
        }}
        state={{
          formLogin: formLogin,
          setFormLogin: setFormLogin,
          isKeyboardVisible: isKeyboardVisible,
          setIsKeyboardVisible: setIsKeyboardVisible,
          lottieSize: lottieSize,
          render: render,
          setRender: setRender,
          setSwitching: setSwitching,
          switching: switching,
        }}
        service={{
          mutation: {
            isPending: loginMutation.isPending,
            login: handlerLogin,
          },
        }}
      />
    </View>
  );
};

export default LoginContainer;
