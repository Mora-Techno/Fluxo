import {
  useAddUsernameService,
  useForgotPasswordService,
  useLoginService,
  useLogutService,
  useRegisterService,
  useResendService,
  useResetPasswordService,
  useVerifyService,
} from "./state/mutation";
import { useGetUsernameService } from "./state/query";

const useAuth = () => {
  return {
    mutation: {
      login: useLoginService,
      register: useRegisterService,
      logout: useLogutService,
      verifyOtp: useVerifyService,
      resend: useResendService,
      forgot: useForgotPasswordService,
      reset: useResetPasswordService,
      addUsername: useAddUsernameService,
    },
    query: {
      getUsername: useGetUsernameService,
    },
  };
};

export default useAuth;
