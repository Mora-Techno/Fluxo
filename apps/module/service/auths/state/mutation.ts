import { useMutation } from "@tanstack/react-query";
import { TResponse } from "../../../utils/trespone";
import { FormLogin, PickRegister } from "../../../@types/auth.types";
import Api from "../../../api/useApi";

export function useRegister() {
  return useMutation<TResponse<any>, Error, PickRegister>({
    mutationFn: (payload) => Api.Auth.Register(payload),
  });
}

export function useLogin() {
  return useMutation<TResponse<any>, Error, FormLogin>({
    mutationFn: (payload) => Api.Auth.Login(payload),
  });
}

export function useLogout() {
  return useMutation<TResponse<any>, Error, any>({
    mutationFn: () => Api.Auth.Logout(),
  });
}
