export const queryKey = {
  auth: {
    query: {
      username: (username: string) => [`auth:username:${username}`],
    },
  },
};
