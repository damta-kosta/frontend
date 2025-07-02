import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import axios from "axios";
import type { CommunityResponse } from "@/types/Community.ts";
import CommunityFeed from "@/components/home/CommunityFeed.tsx";

export default function HomePage() {
  const { ref, inView } = useInView({
    threshold: 0.5,
    delay: 500,
    initialInView: false,
  });
  const [postData, setPostData] = useState<CommunityResponse>({
    community: [],
    hasNext: true,
    nextCursor: null,
  });

  // 처음 로딩
  useEffect(() => {
    const fetchPosts = async () => {
      await axios
        .get("/api/community")
        .then((res) => setPostData(res.data))
        .catch((err) => console.error(err));
    };

    fetchPosts();
  }, []);

  // 무한 스크롤 감지
  useEffect(() => {
    const fetchPosts = async () => {
      await axios
        .get(`/api/community?cursor=${postData.nextCursor}&limit=10`)
        .then((res) => res.data)
        .then((data: CommunityResponse) => {
          setPostData((prev) => ({
            community: [...prev.community, ...data.community],
            hasNext: data.hasNext,
            nextCursor: data.nextCursor,
          }));
        })
        .catch((err) => {
          setPostData((prev) => ({
            ...prev,
            hasNext: false,
            nextCursor: null,
          }));
        });
    };

    if (inView && postData.hasNext) {
      //   함수 실행
      fetchPosts();
    }
  }, [inView, postData.hasNext]);

  return (
    <>
      <div className={"flex flex-col gap-4 p-5"}>
        {/* 캐러셀 */}
        <div className={"bg-primary/30 h-72 shrink-0 rounded-xl p-5"}>
          캐러셀 영역
        </div>

        {/* 피드 */}
        {postData?.community?.length > 0 &&
          postData?.community?.map((post) => <CommunityFeed post={post} />)}

        {/* 무한 스크롤 감지 */}
        <div className={"h-20 w-full touch-none"} ref={ref}></div>
      </div>
    </>
  );
}
