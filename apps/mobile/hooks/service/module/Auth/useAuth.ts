import {
  useLoginService,
  useLogutService,
  useRegisterService,
} from "./state/mutation";

const useAuth = () => {
  return {
    mutation: {
      login: useLoginService,
      register: useRegisterService,
      logout: useLogutService,
    },
  };
};

export default useAuth;
