import { useAppNameSpace } from "@/hooks/costum/namespace";
import { useAuthModule } from "../../../../../../module/service/auths/useAuth";
import { setRole, setToken } from "@/stores/authSlice/authSlice";
import {
  FormLogin,
  FormRegister,
} from "../../../../../../module/@types/auth.types";
import { logout } from "@/stores/authSlice/authSlice";

export function useLoginService() {
  const ns = useAppNameSpace();
  const module = useAuthModule();
  const loginMutation = module.mutation.login();

  const login = async (formLogin: FormLogin) => {
    const payload: any = {
      password: formLogin.password,
    };
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formLogin.identifer);
    if (isEmail) {
      payload.email = formLogin.identifer;
    } else {
      payload.phone = formLogin.identifer;
    }
    loginMutation.mutate(payload, {
      onSuccess: (res) => {
        const { token, role } = res.data;
        ns.dispatch(setToken(token));
        ns.dispatch(setRole(role));

        if (role === "admin") {
          ns.router.push({
            pathname: "/(private)/admin/home/page",
          });
        } else {
          ns.router.push({
            pathname: "/(private)/user/home/page",
          });
        }
      },
      onError: (err) => {
        ns.alert.toast({
          title: "Failed",
          message: "Login Failed",
          icon: "error",
          onVoid: () => {
            console.log(err);
          },
        });
      },
    });
  };
  return {
    login,
    isPending: loginMutation.isPending,
  };
}

export function useRegisterService() {
  const ns = useAppNameSpace();
  const module = useAuthModule();
  const registerMutation = module.mutation.register();

  const register = async (formRegister: FormRegister) => {
    if (
      !formRegister.identifer ||
      !formRegister.first_name ||
      !formRegister.last_name ||
      !formRegister.password
    ) {
      return null;
    }

    const payload: any = {
      password: formRegister.password,
      first_name: formRegister.first_name,
      last_name: formRegister.last_name,
      role: formRegister.role,
    };

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formRegister.identifer);

    if (isEmail) {
      payload.email = formRegister.identifer;
    } else {
      payload.phone = formRegister.identifer;
    }
    registerMutation.mutate(payload, {
      onSuccess: (res) => {
        const email = res.data;

        if (!email) {
          ns.router.push({
            pathname: "/login/page",
          });
        } else {
          ns.router.push({
            pathname: "/(auth)/verifikasi/page",
            params: {
              target: "/login/page",
              var: email,
            },
          });
        }
        ns.alert.toast({
          title: "berhasil",
          message: "",
          icon: "success",
        });
      },
      onError: (err) => {
        ns.alert.toast({
          title: "Failed",
          message: "Login Failed",
          icon: "error",
          onVoid: () => {
            console.log(err);
          },
        });
      },
    });
  };
  return {
    register,
    isPending: registerMutation.isPending,
  };
}

export function useLogutService() {
  const ns = useAppNameSpace();
  const module = useAuthModule();
  const logoutMutate = module.mutation.logout();

  const Logout = () => {
    logoutMutate.mutate(
      {},
      {
        onSuccess: () => {
          ns.dispatch(logout());
          ns.alert.toast({
            title: "successfully",
            message: "you succesfuly logout",
            icon: "success",
          });
          ns.router.push({
            pathname: "/(auth)/login/page",
          });
        },
        onError: (err) => {
          ns.alert.toast({
            title: "Failed",
            message: "Logout Failed",
            icon: "error",
            onVoid: () => {
              console.log(err);
            },
          });
          ns.router.push({
            pathname: "/(auth)/login/page",
          });
        },
      },
    );
  };
  return {
    Logout,
    isPending: logoutMutate.isPending,
  };
}
