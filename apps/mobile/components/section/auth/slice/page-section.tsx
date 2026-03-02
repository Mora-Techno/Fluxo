import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { ButtonWrapper } from "@/components/wrapper/ButtonWrapper";
import { Link } from "expo-router";
import { ButtonSliceAuth } from "@/core/static";
import { ButtonSliceAuthType } from "@/types/static";

const SliceAuthSection = () => {
  return (
    <View className=" flex items-center  justify-center flex-col p-4 min-h-screen bg-background">
      <View className="w-full flex items-center  gap-5">
        <Text className="text-5xl font-bold text-primary">Create Account</Text>
        {ButtonSliceAuth.map((item: ButtonSliceAuthType, key: number) => (
          <Link key={key} href={item.href} className="w-full z-10">
            <ButtonWrapper
              className="w-full max-w-sm rounded-full"
              variant={"auth"}
            >
              <Text className="font-semibold">{item.title}</Text>
            </ButtonWrapper>
          </Link>
        ))}
      </View>
    </View>
  );
};

export default SliceAuthSection;
