import AuthApi from "./module/auth.service";
import CategoryApi from "./module/category.service";

class Api {
  static Auth = new AuthApi();
  static Category = new CategoryApi();
}

export default Api;
