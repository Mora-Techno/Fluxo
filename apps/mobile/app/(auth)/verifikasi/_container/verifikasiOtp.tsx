import VerifyOtpSection from "@/components/section/auth/verifyOtp/page-section";
import { useAppNameSpace } from "@/hooks/costum/namespace";
import { useServiceMobile } from "@/hooks/service/module/useService";
import { PickVerify } from "@repo/shared";
import { useEffect, useMemo, useState } from "react";
import { Keyboard, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Error } from "@/components/err/error";

const VerifyOtpContainer = () => {
  const ns = useAppNameSpace();
  const service = useServiceMobile();

  //params
  const params = useLocalSearchParams<any>();

  // mutate
  const verifyOtpMutation = service.auth.mutation.verifyOtp();
  const resendMutation = service.auth.mutation.resend();

  //state
  const [formVerifify, setFormVerify] = useState<PickVerify>({
    email: params.identifer,
    otp: "",
  });

  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
  const [colldown, setColldown] = useState<number>(0);

  // utils
  const emailer = params.identifer ?? "";
  const hash = emailer.slice(10);

  // handler
  const handleVerify = async () => {
    if (verifyOtpMutation.isPending) return false;
    try {
      await verifyOtpMutation.VerifikasiOtp(formVerifify);

      if (params.point === "register") {
        ns.router.push({
          pathname: params.target,
        });
      } else {
        ns.router.push({
          pathname: params.target,
          params: {
            identifer: params.identifer,
            target: "/(auth)/login/page",
          },
        });
      }
    } catch (error) {
      Error(error);
    }
  };

  const handleResend = async () => {
    if (resendMutation.isPending) return false;
    try {
      await resendMutation.Resend({ email: params.identifer });

      setColldown(300);
    } catch (error) {
      Error(error);
    }
  };

  //async
  useEffect(() => {
    if (colldown <= 0) return;
    const interfal = setInterval(() => {
      setColldown((prev) => {
        if (prev <= 0) {
          clearInterval(interfal);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interfal);
  }, [colldown]);

  useEffect(() => {
    const showListener = Keyboard.addListener("keyboardWillShow", () =>
      setIsKeyboardVisible(true),
    );
    const hideListener = Keyboard.addListener("keyboardWillHide", () =>
      setIsKeyboardVisible(false),
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const lottieSize = useMemo(
    () => (isKeyboardVisible ? 140 : 300),
    [isKeyboardVisible],
  );

  return (
    <View className="w-full min-h-screen">
      <VerifyOtpSection
        ns={{
          route: ns.router,
          theme: ns.colors,
        }}
        state={{
          formVerifify: formVerifify,
          setFormVerify: setFormVerify,
          colldown: colldown,
          isKeyboardVisible: isKeyboardVisible,
          setIsKeyboardVisible: setIsKeyboardVisible,
          lottieSize: lottieSize,
        }}
        service={{
          mutate: {
            isPending: verifyOtpMutation.isPending || resendMutation.isPending,
            verifyOtp: handleVerify,
            resend: handleResend,
          },
          params: {
            hash: hash,
          },
        }}
      />
    </View>
  );
};

export default VerifyOtpContainer;
