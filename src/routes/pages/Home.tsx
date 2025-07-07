import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import type { CommunityResponse } from "@/types/Community.ts";
import CommunityFeed from "@/components/home/CommunityFeed.tsx";
import { CgSpinner } from "react-icons/cg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel.tsx";
import Autoplay from "embla-carousel-autoplay";

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

  const [isLoading, setIsLoading] = useState<boolean>(true); // 초기 로딩
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false); // 무한 스크롤 로딩
  const isFetchingRef = useRef<boolean>(false); // 중복 요청 방지용 ref

  // 초기 로딩
  useEffect(() => {
    const fetchInitialPosts = async () => {
      try {
        const res = await axios.get("/api/community");
        setPostData(res.data);
        setIsLoading(false); // 최초 로딩 이후만 무한스크롤 허용
      } catch (err) {
        console.error("피드 로딩 실패: ", err);
        setIsLoading(false);
      }
    };

    fetchInitialPosts();
  }, []);

  // 무한 스크롤
  useEffect(() => {
    const fetchMorePosts = async () => {
      if (
        isFetchingRef.current ||
        isLoading ||
        !postData.hasNext ||
        !inView ||
        !postData.nextCursor
      )
        return;

      isFetchingRef.current = true;
      setIsFetchingMore(true);

      try {
        const data: CommunityResponse = await axios
          .get(`/api/community?cursor=${postData.nextCursor}&limit=10`)
          .then((res) => res.data);

        setPostData((prev) => ({
          community: [...prev.community, ...data.community],
          hasNext: data.hasNext,
          nextCursor: data.nextCursor,
        }));
      } catch (err) {
        console.error("피드 추가 로딩 실패: ", err);
        setPostData((prev) => ({
          ...prev,
          hasNext: false,
          nextCursor: null,
        }));
      } finally {
        isFetchingRef.current = false;
        setIsFetchingMore(false);
      }
    };

    fetchMorePosts();
  }, [inView, postData.hasNext, postData.nextCursor]);

  return (
    <>
      <div className={"flex flex-col gap-4 p-5"}>
        {/* 캐러셀 */}
        <Carousel
          className="w-full"
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 4000 })]}
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="bg-primary/30 flex h-72 items-center justify-center rounded-xl p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className={"top-full left-full -translate-x-24 -translate-y-12"}
          />
          <CarouselNext className={"top-full right-4 -translate-y-12"} />
        </Carousel>

        {/* 🟡 초기 로딩 중일 때 로딩 스피너 */}
        {isLoading ? (
          <div className="flex h-40 items-center justify-center">
            <CgSpinner className="text-primary/60 size-12 animate-spin" />
          </div>
        ) : (
          <>
            {/* 피드 */}
            {postData.community.map((post, index) => (
              <CommunityFeed
                key={`${post.community_id}-${index}`}
                post={post}
              />
            ))}

            {/* 스크롤 감지 중 로딩 */}
            {isFetchingMore && (
              <div className="flex items-center justify-center py-5">
                <CgSpinner className="text-primary/60 size-10 animate-spin" />
              </div>
            )}
          </>
        )}

        {/* 무한 스크롤 감지 */}
        <div ref={ref} className={"h-20 w-full touch-none"}></div>
      </div>
    </>
  );
}
