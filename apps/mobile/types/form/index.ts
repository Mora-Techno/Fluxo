export type SelectedAuth = "phone" | "username";

export type SelectedAuthWrapper = SelectedAuth | "email";
export interface FormLogin {
  email: string;
  password: string;
}
