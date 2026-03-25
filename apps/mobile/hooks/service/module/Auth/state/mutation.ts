import { useAppNameSpace } from "@/hooks/costum/namespace";

import { setRole, setToken } from "@/stores/authSlice/authSlice";
import {
  FormForgotPassword,
  FormLogin,
  FormRegister,
  PickSendOtp,
  PickVerify,
} from "@repo/shared";
import { logout } from "@/stores/authSlice/authSlice";
import { useAuthRepo } from "@repo/shared";

export function useLoginService() {
  const ns = useAppNameSpace();
  const module = useAuthRepo();
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
  const module = useAuthRepo();
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
        const email = res.data.email as string;

        if (!email) {
          ns.router.push({
            pathname: "/login/page",
          });
        } else {
          ns.router.push({
            pathname: "/(auth)/verifikasi/page",
            params: {
              target: "/login/page",
              identifer: email,
              point: "register",
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
  const module = useAuthRepo();
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
          ns.dispatch(logout());
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

export function useVerifyService() {
  const ns = useAppNameSpace();
  const module = useAuthRepo();
  const Verifikasi = module.mutation.verify();
  const VerifikasiOtp = async (payload: PickVerify) => {
    if (!payload.email || !payload.otp) {
      return false;
    }

    Verifikasi.mutateAsync(payload, {
      onSuccess: (res) => {
        const email = res.data.email as string;
        ns.alert.toast({
          title: "successfully",
          message: `you succesfuly verify email:${email}`,
          icon: "success",
        });
      },
      onError: (err) => {
        ns.alert.toast({
          title: "Failed",
          message: "Your Failed Verify",
          icon: "error",
          onVoid: () => {
            console.log(err);
          },
        });
      },
    });
  };
  return {
    VerifikasiOtp,
    isPending: Verifikasi.isPending,
  };
}

export function useResendService() {
  const ns = useAppNameSpace();
  const module = useAuthRepo();
  const resend = module.mutation.resend();
  const Resend = async (formResend: PickSendOtp) => {
    if (!formResend.email) {
      return false;
    }

    resend.mutate(formResend, {
      onSuccess: (res) => {
        const email = res.data.email as string;

        ns.alert.toast({
          title: "successfully",
          icon: "success",
          message: `Please check your email again ${email}`,
        });
      },
      onError: (err) => {
        ns.alert.toast({
          title: "Failed",
          icon: "error",

          onVoid: () => {
            console.error(err);
          },
        });
      },
    });
  };
  return { Resend, isPending: resend.isPending };
}

export function useForgotPasswordService() {
  const ns = useAppNameSpace();
  const module = useAuthRepo();
  const forgot = module.mutation.forgot();

  const ForgotPassword = async (formForgotPassword: FormForgotPassword) => {
    //validation
    if (!formForgotPassword.identifer) {
      return false;
    }

    const payload: any = {};
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      formForgotPassword.identifer,
    );

    if (isEmail) {
      payload.email = formForgotPassword.identifer;
    } else {
      payload.phone = formForgotPassword.identifer;
    }

    forgot.mutate(payload, {
      onSuccess: (res) => {
        const email = res.data.email as string;
        if (!email) {
          ns.router.push({
            pathname: "/(auth)/forgotPassword/page",
          });
        } else {
          ns.router.push({
            pathname: "/(auth)/verifikasi/page",
            params: {
              target: "/(auth)/reset-password/page",
              identifer: email,
              point: "forgotPassword",
            },
          });
        }
        ns.alert.toast({
          title: "successfully",
          icon: "success",
        });
      },
      onError: (err) => {
        ns.alert.toast({
          title: "Failed",
          icon: "error",
          message: "failed detect email",
          onVoid: () => {
            console.log(err);
          },
        });
      },
    });
  };
  return { ForgotPassword, isPending: forgot.isPending };
}
