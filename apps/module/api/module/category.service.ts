import {
  PickCreateCategory,
  PickIDCategory,
} from "../../@types/category.types";
import AxiosClient from "../../utils/axios";
import { TResponse } from "../../utils/trespone";

class CategoryApi {
  public async Create(payload: PickCreateCategory): Promise<TResponse<any>> {
    const res = await AxiosClient.post("/api/category/", payload);
    return res.data;
  }
  public async Update(
    payload: PickCreateCategory,
    id: string,
  ): Promise<TResponse<any>> {
    const res = await AxiosClient.put(`/api/category/${id}`, payload);
    return res.data;
  }
}

export default CategoryApi;
