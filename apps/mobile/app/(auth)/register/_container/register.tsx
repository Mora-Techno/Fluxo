import RegisterSection from "@/components/section/auth/register/page-section";
import { useAppNameSpace } from "@/hooks/costum/namespace";
import { View } from "react-native";
import { useState } from "react";
import { FormRegister } from "../../../../../module/@types/auth.types";
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

  //handler
  const handlerRegister = async () => {
    await registerMutate.register(formRegister);
  };

  return (
    <View className="w-full min-h-screen">
      <RegisterSection
        ns={{
          router: ns.router,
          theme: ns.colors,
        }}
        service={{
          mutation: {
            register: handlerRegister,
          },
        }}
        state={{
          formRegister: formRegister,
          setFormRegister: setFormRegister,
        }}
      />
    </View>
  );
};

export default RegisterContainer;
