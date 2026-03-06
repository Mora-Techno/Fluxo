import { useMutation } from "@tanstack/react-query";
import { TResponse } from "../../../utils/trespone";
import { PickCreateCategory } from "../../../@types/category.types";
import Api from "../../../api/useApi";

export function useCreate() {
  return useMutation<TResponse<any>, Error, PickCreateCategory>({
    mutationFn: (payload) => Api.Category.Create(payload),
  });
}

export function useUpdate() {
  return useMutation<
    TResponse<any>,
    Error,
    { id: string; payload: PickCreateCategory }
  >({
    mutationFn: ({ id, payload }) => Api.Category.Update(payload, id),
  });
}
