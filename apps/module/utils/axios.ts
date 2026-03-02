import axios, { AxiosError } from "axios";

type TokenProvider = () => string | undefined | Promise<string | undefined>;
type BaseURLProvider = () => string | undefined | Promise<string | undefined>;
type OnUnauthorized = () => void | Promise<void>;

let _tokenProvider: TokenProvider | null = null;
let _baseURLProvider: BaseURLProvider | null = null;
let _onUnauthorized: OnUnauthorized | null = null;

export const setTokenProvider = (provider: TokenProvider) => {
  _tokenProvider = provider;
};

export const setBaseURLProvider = (provider: BaseURLProvider) => {
  _baseURLProvider = provider;
};

export const setOnUnauthorized = (handler: OnUnauthorized) => {
  _onUnauthorized = handler;
};

const isDev =
  typeof __DEV__ !== "undefined"
    ? __DEV__
    : process.env.NODE_ENV === "development";

const getBaseURL = async (): Promise<string | undefined> => {
  if (_baseURLProvider) return _baseURLProvider();
  return undefined;
};

const getToken = async (): Promise<string | undefined> => {
  if (_tokenProvider) return _tokenProvider();
  return undefined;
};

const AxiosClient = axios.create();

AxiosClient.interceptors.request.use(async (config) => {
  if (!config.baseURL) {
    const baseURL = await getBaseURL();
    if (baseURL) config.baseURL = baseURL;
  }

  const token = await getToken();
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

AxiosClient.interceptors.response.use(
  (res) => {
    if (isDev) console.log("[API RES]", res.status, res.config.url, res.data);
    return res;
  },
  async (error: AxiosError) => {
    if (isDev)
      console.log(
        "[API ERR]",
        error.response?.status,
        error.config?.url,
        error.message,
      );

    if (error.response?.status === 401 && _onUnauthorized) {
      await _onUnauthorized();
    }

    return Promise.reject(error);
  },
);

export default AxiosClient;
