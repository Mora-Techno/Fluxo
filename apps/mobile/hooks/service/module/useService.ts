import useAuth from "./Auth/useAuth";

export function useServiceMobile() {
  return {
    auth: useAuth(),
  };
}
