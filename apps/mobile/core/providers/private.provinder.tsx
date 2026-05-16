import { router } from "expo-router";
import { useEffect } from "react";

import { useAppSelector } from "@/hooks/toolkit/redux";

export default function PrivateProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useAppSelector((state) => state.auth.token);
  const isAuth = token;

  useEffect(() => {
    if (!isAuth) {
      router.replace("/(auth)/login" as any);
    }
  }, [isAuth]);

  return <>{children}</>;
}
