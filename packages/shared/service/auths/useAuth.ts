import {
  useAddUsernamePackage,
  useForgotPasswordPackage,
  useLoginPackage,
  useLogoutPackage,
  useRegisterPackage,
  useResendPackage,
  useResetPasswordPackage,
  useVerifyOtpPackage,
} from "./state/mutation";
import { useGetUsername } from "./state/query";

export function useAuthRepo() {
  return {
    mutation: {
      login: useLoginPackage,
      register: useRegisterPackage,
      logout: useLogoutPackage,
      verify: useVerifyOtpPackage,
      resend: useResendPackage,
      forgot: useForgotPasswordPackage,
      reset: useResetPasswordPackage,
      addUsername:useAddUsernamePackage
    },
    query: {
      getUsername: useGetUsername,
    },
  };
}
