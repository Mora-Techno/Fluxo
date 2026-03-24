import VerifyOtpSection from "@/components/section/auth/verifyOtp/page-section";
import { useAppNameSpace } from "@/hooks/costum/namespace";
import { View } from "react-native";

const VerifyOtpContainer = () => {
  const ns = useAppNameSpace();
  return (
    <View className="w-full min-h-screen">
      <VerifyOtpSection
        ns={{
          route: ns.router,
        }}
      />
    </View>
  );
};

export default VerifyOtpContainer;
