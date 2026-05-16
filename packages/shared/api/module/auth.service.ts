import {
  PickForgotPassword,
  PickLogin,
  PickRegister,
  PickResetPassword,
  PickSendOtp,
  PickAddUsername,
  PickVerify,
} from "../../@types/auth.types";
import AxiosClient from "../../utils/axios";
import { TResponse } from "../../utils/trespone";

class AuthApi {
  public async Register(payload: PickRegister): Promise<TResponse<any>> {
    const res = await AxiosClient.post("/api/auth/register", payload);
    return res.data;
  }

  public async Login(payload: PickLogin): Promise<TResponse<any>> {
    const res = await AxiosClient.post("/api/auth/", payload);
    return res.data;
  }
  public async Logout(): Promise<TResponse<any>> {
    const res = await AxiosClient.post("/api/auth/logout");
    return res.data;
  }
  public async VerifyOtp(payload: PickVerify): Promise<TResponse<any>> {
    const res = await AxiosClient.post("/api/auth/verifyOtp", payload);
    return res.data;
  }
  public async Resend(payload: PickSendOtp): Promise<TResponse<any>> {
    const res = await AxiosClient.post("/api/auth/resend", payload);
    return res.data;
  }
  public async ForgotPassword(
    payload: PickForgotPassword,
  ): Promise<TResponse<any>> {
    const res = await AxiosClient.post("/api/auth/forgot", payload);
    return res.data;
  }
  public async ResetPassword(
    payload: PickResetPassword,
  ): Promise<TResponse<any>> {
    const res = await AxiosClient.post("/api/auth/reset-password", payload);
    return res.data;
  }
  public async GetUsername(username?: string): Promise<TResponse<any>> {
    const res = await AxiosClient.get(
      `/api/auth/username?username=${username}`,
    );
    return res.data;
  }
  public async AddUsername(payload: PickAddUsername): Promise<TResponse<any>> {
    const res = await AxiosClient.patch("/api/auth/addUsername", payload);
    return res.data;
  }
}

export default AuthApi;
