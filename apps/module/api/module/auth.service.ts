import { FormLogin, PickRegister } from "../../@types/auth.types";
import AxiosClient from "../../utils/axios";
import { TResponse } from "../../utils/trespone";

class AuthApi {
  public async Register(payload: PickRegister): Promise<TResponse<any>> {
    const res = await AxiosClient.post("/api/auth/register", payload);
    return res.data;
  }
  public async Login(payload: FormLogin): Promise<TResponse<any>> {
    const res = await AxiosClient.post("/api/auth/", payload);
    return res.data;
  }
  public async Logout(): Promise<TResponse<any>> {
    const res = await AxiosClient.post("/api/auth/logout");
    return res.data;
  }
}

export default AuthApi;
