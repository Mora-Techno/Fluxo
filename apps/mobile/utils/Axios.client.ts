import Constants from "expo-constants";

import AxiosClient, {
  setBaseURLProvider,
  setTokenProvider,
} from "../../module/utils/axios";
import { store } from "@/stores/store";

setBaseURLProvider(() => Constants.expoConfig?.extra?.BACKEND_URL);

setTokenProvider(() => store.getState().auth.token!);

export default AxiosClient;
