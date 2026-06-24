import { fetchPosts } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 5;

export function useInfinitePostsData() {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.post.list,
    queryFn: async ({ pageParam }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const posts = await fetchPosts({ from, to });
      return posts;
    },

    initialPageParam: 0,

    // 새 페이지의 데이터를 불러와야할때
    // querFn보다 먼저 호출되어 다음 페이지 번호 계산에 사용
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      // 마지막으로 불러온 페이지를 기준으로 다음 pageParam을 계산..
      return allPages.length;
    },
  });
}
