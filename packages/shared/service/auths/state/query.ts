import Api from "@/api/props.service";
import { queryKey } from "@/utils";
import { useQuery } from "@tanstack/react-query";
export function useGetUsername(username: string) {
  return useQuery({
    queryFn: () => Api.Auth.GetUsername(username),
    queryKey: queryKey.auth.query.username(username),
    enabled: !!username && username.length > 1,
  });
}
