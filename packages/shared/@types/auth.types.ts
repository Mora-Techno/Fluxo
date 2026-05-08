import { RoleType } from "../partial/auth.partial";
export interface Auth {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  identifer: string;
  password: string;
  phone: string;
  token?: string;
  role: RoleType;
  avaUrl: string;
  createdAt: Date;
  updatedAt: Date;
  otp?: string;
  expOtp?: Date;
  isVerify?: boolean;
  activateToken?: string;
  activateExp?: string;
  sessionId: string;
}

export type JwtPayload = Pick<Auth, "id" | "role" | "sessionId">;
export type PickRegister = Pick<
  Auth,
  | "email"
  | "first_name"
  | "last_name"
  | "password"
  | "role"
  | "phone"
  | "username"
>;
export type PickLogin = Pick<Auth, "email" | "password" | "phone" | "username">;
export type PickID = Pick<Auth, "id">;
export type PickForgotPassword = Pick<Auth, "email" | "phone">;
export type PickVerify = Pick<Auth, "email" | "otp">;
export type PickSendOtp = Pick<Auth, "email">;
export type PickResetPassword = Pick<Auth, "email" | "password" | "phone">;
export type PickUpdateProfile = Pick<
  Auth,
  "email" | "first_name" | "last_name" | "avaUrl" | "phone"
>;
export type PickUpdatePassword = Pick<Auth, "password">;
export type PickActiveAccount = Pick<Auth, "activateToken" | "password">;
export type PickLoginAllReady = Pick<Auth, "token">;

// extenst
export type FormLogin = Pick<Auth, "identifer" | "password">;
export type FormRegister = Pick<
  Auth,
  "identifer" | "first_name" | "last_name" | "password" | "role"
>;

export type FormForgotPassword = Pick<Auth, "identifer">;

export type FormResend = Pick<Auth, "email">;
