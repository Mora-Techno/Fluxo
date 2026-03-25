import RegisterSection from "@/components/section/auth/register/page-section";
import { useAppNameSpace } from "@/hooks/costum/namespace";
import { Keyboard, View } from "react-native";
import { useEffect, useState } from "react";
import { FormRegister } from "@repo/shared";
import { useServiceMobile } from "@/hooks/service/module/useService";

const RegisterContainer = () => {
  const ns = useAppNameSpace();
  const service = useServiceMobile();

  //mutate
  const registerMutate = service.auth.mutation.register();

  //state
  const [formRegister, setFormRegister] = useState<FormRegister>({
    identifer: "",
    first_name: "",
    last_name: "",
    password: "",
    role: "USER",
  });

  const [switching, setSwitching] = useState<boolean>(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);

  //handler
  const handlerRegister = async () => {
    await registerMutate.register(formRegister);
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
      showListener.remove(), hideListener.remove();
    };
  }, []);

  return (
    <View className="w-full min-h-screen">
      <RegisterSection
        ns={{
          theme: ns.colors,
        }}
        service={{
          mutation: {
            register: handlerRegister,
            isPending: registerMutate.isPending,
          },
        }}
        state={{
          formRegister: formRegister,
          setFormRegister: setFormRegister,
          setSwitch: setSwitching,
          switch: switching,
          isKeyboardVisible: isKeyboardVisible,
          setIsKeyboardVisible: setIsKeyboardVisible,
        }}
      />
    </View>
  );
};

export default RegisterContainer;
