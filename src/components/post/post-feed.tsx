import FallBack from "../fallback";
import Loader from "../loader";
import PostItem from "./post-item";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useInfinitePostsData } from "@/hooks/queries/use-infinite-posts-data";

export default function PostFeed() {
  const { data, error, isPending, fetchNextPage, isFetchingNextPage } =
    useInfinitePostsData();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      // 데이터 추가
      fetchNextPage();
    }
  }, [inView]);

  // 오류 상태 처리
  if (error) return <FallBack />;
  // 로딩 상태 처리
  if (isPending) return <Loader />;

  return (
    <div className="flex flex-col gap-10">
      {data.pages.map((page) =>
        page.map((post) => <PostItem key={post.id} {...post} />),
      )}
      {isFetchingNextPage && <Loader />}
      {/* 최하단 감지를 위한 div */}
      <div ref={ref}></div>
    </div>
  );
}
