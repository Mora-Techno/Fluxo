import Constants from "expo-constants";
import {
  AxiosClient,
  setBaseURLProvider,
  setTokenProvider,
} from "@repo/shared";
import { store } from "@/stores/store";

setBaseURLProvider(() => Constants.expoConfig?.extra?.BACKEND_URL);

setTokenProvider(() => {
  const state = store.getState();
  return state.auth.token ?? undefined;
});

AxiosClient.interceptors.request.use(async (config) => {
  const internalApiKey = Constants.expoConfig?.extra?.INTERNAL_API_SECRET;

  if (internalApiKey) {
    config.headers.set("x-internal-api-key", internalApiKey);
  }

  return config;
});

export default AxiosClient;
