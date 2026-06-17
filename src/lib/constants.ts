export const QUERY_KEYS = {
  profile: {
    all: ["profile"],
    list: ["profile", "list"],
    byId: (userId: string) => ["profile", "byId", userId],
  },
  // post를 위한 querykey
  post: {
    all: ["post"],
    list: ["post", "list"],
    byId: (postId: number) => ["post", "byId", postId],
  },
};

export const BUCKET_NAME = "uploads";
