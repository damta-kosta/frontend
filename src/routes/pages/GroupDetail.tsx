import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { cn } from "@/lib/utils.ts";
import { useState } from "react";

export default function GroupDetailPage() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div className={"flex h-full flex-col overflow-y-auto"}>
        {/* 상단 헤더 */}
        <div
          className={
            "bg-background sticky top-0 z-10 flex h-[50px] shrink-0 items-center border-b px-4"
          }
        >
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => navigate("/group")}
            className={"rounded-full"}
          >
            <RiCloseLine className={"size-7"} />
          </Button>
        </div>

        {/* 커버 이미지 */}
        <div className={"relative aspect-2/1"}>
          {!loaded && <Skeleton className="absolute inset-0" />}
          <img
            src={"https://picsum.photos/600/300"}
            alt={"cover-img"}
            className={cn(
              "aspect-2/1 h-full w-full object-cover object-center transition-opacity duration-300",
              loaded ? "opacity-100" : "opacity-0",
            )}
            onLoad={() => setLoaded(true)}
          />
        </div>
        {/* 본문 */}
        <div className={"flex flex-col gap-5 px-5 py-10"}>
          <h1 className={"truncate text-2xl"}>제목</h1>
          <p className={""}>개설일</p>
          <p className={""}>모임 설명</p>
        </div>
      </div>
    </>
  );
}
