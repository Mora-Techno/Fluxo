import { ScrollView, View, Animated, Easing } from "react-native";
import LottieView from "lottie-react-native";
import { Text } from "@/components/ui/text";
import { ButtonWrapper } from "@/components/wrapper/ButtonWrapper";
import Sun from "@/assets/svg/sunn";
import { Link } from "expo-router";
import { useEffect, useRef } from "react";

export default function SectionHomePage() {
  const rotate = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 5500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <ScrollView className="bg-background relative">
      <View className="absolute w-80 h-80 bg-primary rounded-full z-[-1] top-20 left-10 flex items-center justify-center">
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Sun />
        </Animated.View>
      </View>
      <View className="p-6 gap-10 z-0">
        <View className=" flex items-center  justify-center ">
          <LottieView
            autoPlay
            loop
            style={{ width: 590, height: 590 }}
            source={require("../../../../assets/lottie/Tester.json")}
          />
        </View>

        <View className="w-full flex flex-col items-center justify-center gap-2 ">
          <Text className="text-4xl font-bold">Judul</Text>
          <Text className="text-2xl font-semibold text-center  ">
            Unleash your potential through movement
          </Text>
        </View>
        <Link href={"/(auth)/slice/page"} className="w-full mt-8 z-10">
          <ButtonWrapper variant={"default"} className=" w-full">
            <Text className="text-lg font-semibold ">Let`s do it</Text>
          </ButtonWrapper>
        </Link>
      </View>
    </ScrollView>
  );
}
