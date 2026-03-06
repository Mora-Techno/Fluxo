import { View } from "react-native";
import LoginSection from "@/components/section/auth/login/page-section";
import { useAppNameSpace } from "@/hooks/costum/namespace";
import { useState } from "react";
import { FormLogin } from "../../../../../module/@types/auth.types";
import { useServiceMobile } from "@/hooks/service/module/useService";

const LoginContainer = () => {
  const namespace = useAppNameSpace();
  const service = useServiceMobile();

  // mutate
  const loginMutation = service.auth.mutation.login();
  //state
  const [formLogin, setFormLogin] = useState<FormLogin>({
    identifer: "",
    password: "",
  });

  const handlerLogin = async () => {
    await loginMutation.login(formLogin);
  };

  return (
    <View className="w-full min-h-screen ">
      <LoginSection
        namespace={{
          router: namespace.router,
          theme: namespace.colors,
        }}
        state={{
          formLogin: formLogin,
          setFormLogin: setFormLogin,
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
