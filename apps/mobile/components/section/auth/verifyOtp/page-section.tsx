import OTPInput from "@/components/ui/inputOtp";
import { Router } from "expo-router";
import { View, Text } from "react-native";

interface VerifyOtpSectionProps {
  ns: {
    route: Router;
  };
}
const VerifyOtpSection: React.FC<VerifyOtpSectionProps> = ({ ns }) => {
  return (
    <View className="flex-1 px-6 py-12 items-center justify-center">
      <View className="items-center mb-10">
        <Text className="text-2xl font-bold text-foreground mb-2">
          Verifikasi Kode
        </Text>
        <Text className="text-sm text-muted-foreground text-center px-4">
          Silakan masukkan 4 digit kode verifikasi yang telah dikirim ke
          perangkat Anda.
        </Text>
      </View>

      <View className="mb-8">
        <OTPInput length={4} />
      </View>

      <View className="mt-4">
        <Text className="text-sm text-muted-foreground">
          Tidak menerima kode?{" "}
          <Text className="text-primary font-semibold">Kirim Ulang</Text>
        </Text>
      </View>
    </View>
  );
};
export default VerifyOtpSection;
