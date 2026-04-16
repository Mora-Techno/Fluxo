import { usePathname, useRouter } from "expo-router";
import { useAlert } from "../useAlert/costum-alert";
import { useAppDispatch } from "../toolkit/redux";
import { useQueryClient } from "@tanstack/react-query";
import { useTheme } from "@/core/providers/theme.provinder";
import { getValueFor, save } from "../useSecureStore";

export function useAppNameSpace() {
  const alert = useAlert();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { colors } = useTheme();
  const useSave = save;
  const useValue = getValueFor;

  return {
    alert,
    useSave,
    useValue,
    router,
    dispatch,
    pathname,
    queryClient,
    colors,
  };
}
