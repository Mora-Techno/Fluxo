import { getCookie, deleteCookie } from 'cookies-next';

import AxiosClient, {
  setBaseURLProvider,
  setOnUnauthorized,
  setTokenProvider,
} from '../../../module/utils/axios';
import { APP_SESSION_COOKIE_KEY } from '@/configs/cookies.config';

setBaseURLProvider(() => process.env.NEXT_PUBLIC_BACKEND_URL);

setTokenProvider(() => getCookie(APP_SESSION_COOKIE_KEY) as string | undefined);

setOnUnauthorized(() => {
  deleteCookie(APP_SESSION_COOKIE_KEY);
  window.location.href = '/login';
});

export default AxiosClient;
