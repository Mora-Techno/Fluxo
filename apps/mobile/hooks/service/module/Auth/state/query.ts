import { useDebounce } from "@/hooks/debounce/useDebounce";
import { useAuthRepo } from "@repo/shared";
export function useGetUsernameService(username: string) {
  const module = useAuthRepo();
  const debounced = useDebounce(username, 2000);
  return module.query.getUsername(debounced);
}
