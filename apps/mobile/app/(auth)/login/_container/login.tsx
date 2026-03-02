import { View } from "react-native";
import LoginSection from "@/components/section/auth/login/page-section";
import { useAppNameSpace } from "@/hooks/costum/namespace";

const LoginContainer = () => {
  const namespace = useAppNameSpace();
  return (
    <View className="w-full min-h-screen ">
      <LoginSection
        namespace={{
          router: namespace.router,
          theme: namespace.colors,
        }}
      />
    </View>
  );
};

export default LoginContainer;
