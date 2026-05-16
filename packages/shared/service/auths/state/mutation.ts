import { useMutation } from "@tanstack/react-query";
import { TResponse } from "@/utils";
import {
  PickForgotPassword,
  PickLogin,
  PickRegister,
  PickResetPassword,
  PickSendOtp,
  PickVerify,
  PickAddUsername,
} from "@/@types/auth.types";
import Api from "@/api/props.service";

export function useRegisterPackage() {
  return useMutation<TResponse<any>, Error, PickRegister>({
    mutationFn: (payload) => Api.Auth.Register(payload),
  });
}

export function useLoginPackage() {
  return useMutation<TResponse<any>, Error, PickLogin>({
    mutationFn: (payload) => Api.Auth.Login(payload),
  });
}

export function useLogoutPackage() {
  return useMutation<TResponse<any>, Error, any>({
    mutationFn: () => Api.Auth.Logout(),
  });
}

export function useVerifyOtpPackage() {
  return useMutation<TResponse<any>, Error, PickVerify>({
    mutationFn: (payload) => Api.Auth.VerifyOtp(payload),
  });
}

export function useResendPackage() {
  return useMutation<TResponse<any>, Error, PickSendOtp>({
    mutationFn: (payload) => Api.Auth.Resend(payload),
  });
}

export function useForgotPasswordPackage() {
  return useMutation<TResponse<any>, Error, PickForgotPassword>({
    mutationFn: (payload) => Api.Auth.ForgotPassword(payload),
  });
}

export function useResetPasswordPackage() {
  return useMutation<TResponse<any>, Error, PickResetPassword>({
    mutationFn: (payload) => Api.Auth.ResetPassword(payload),
  });
}

export function useAddUsernamePackage() {
  return useMutation<TResponse<any>, Error, PickAddUsername>({
    mutationFn: (payload: PickAddUsername) => Api.Auth.AddUsername(payload),
  });
}
