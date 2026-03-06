import ForgotPasswordSection from "@/components/section/auth/forgotPassword/page-section";
import { useAppNameSpace } from "@/hooks/costum/namespace";
import { View } from "react-native";

const ForgotPasswordContainer = () => {
  const ns = useAppNameSpace();
  return (
    <View className="w-full min-h-screen">
      <ForgotPasswordSection
        namespace={{
          router: ns.router,
          theme: ns.colors,
        }}
      />
    </View>
  );
};

export default ForgotPasswordContainer;
