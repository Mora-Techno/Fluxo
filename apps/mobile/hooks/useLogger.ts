import { useCallback } from "react";

export function useLogger(tag: string) {
  const log = useCallback(
    (...args: any[]) => {
      console.log(`[${tag}]`, ...args);
    },
    [tag],
  );

  const error = useCallback(
    (...args: any[]) => {
      console.error(`[${tag} ERROR]`, ...args);
    },
    [tag],
  );

  return { log, error };
}
