import { useLogin, useLogout, useRegister } from "./state/mutation";

export function useAuthModule() {
  return {
    mutation: {
      login: useLogin,
      register: useRegister,
      logout: useLogout,
    },
    query: {
      //
    },
  };
}
