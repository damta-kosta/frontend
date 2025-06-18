import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { Avatar, AvatarImage } from "../../components/ui/avatar.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { cn } from "@/lib/utils.ts";

export default function PostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  // 게시글 API 받아오기
  useEffect(() => {}, [postId]);

  return (
    <>
      {/* 상단 헤더 */}
      <div
        className={
          "bg-background sticky top-0 z-10 flex h-[50px] shrink-0 items-center border-b px-4"
        }
      >
        <button
          onClick={() => navigate(-1)}
          className={"rounded-full p-1 hover:bg-neutral-100"}
        >
          <RiArrowLeftLine className={"size-7"} />
        </button>
      </div>

      <div className={"relative flex h-full flex-col gap-4 px-5 pt-5 pb-10"}>
        {/* 작성자 정보 */}
        <div className={"flex items-center gap-3"}>
          <Avatar className={"size-10"}>
            <div
              className={
                "absolute inset-0 cursor-pointer bg-neutral-800/20 opacity-0 transition-opacity duration-200 hover:opacity-100"
              }
            ></div>
            <AvatarImage src={"https://github.com/shadcn.png"} alt="@shadcn" />
            {/*<AvatarFallback></AvatarFallback>*/}
          </Avatar>
          <p className={"cursor-pointer font-bold"}>NAME</p>
        </div>
        {/*  게시글 정보 */}
        <p>게시글 내용</p>
        {/*  이미지 정보 */}
        <div className="relative aspect-5/3 w-full overflow-hidden rounded-lg">
          {!loaded && <Skeleton className="absolute inset-0 rounded-lg" />}
          <img
            src="https://picsum.photos/500/300"
            alt="img"
            className={cn(
              "h-full w-full object-cover transition-opacity duration-300",
              loaded ? "opacity-100" : "opacity-0",
            )}
            onLoad={() => setLoaded(true)}
          />
        </div>

        {/* 댓글 목록 */}
        <div className={"mt-10 flex gap-3 border-t py-5"}>
          <div>
            <Avatar className={"size-10"}>
              <div
                className={
                  "absolute inset-0 cursor-pointer bg-neutral-800/20 opacity-0 transition-opacity duration-200 hover:opacity-100"
                }
              ></div>
              <AvatarImage
                src={"https://github.com/shadcn.png"}
                alt="@shadcn"
              />
            </Avatar>
          </div>
          <div className={"flex w-full flex-col"}>
            <p className={"cursor-pointer font-bold"}>NAME</p>
            <p>내용</p>
          </div>
        </div>
      </div>

      {/* 댓글 작성 */}
      <div className="sticky bottom-0 z-10 flex items-center gap-3 border-t bg-white px-5 py-3">
        <input className="box-border h-[40px] w-full rounded-full border px-5 leading-none" />
        <button
          className={
            "bg-primary text-background h-full w-20 rounded-full font-bold"
          }
        >
          댓글
        </button>
      </div>
    </>
  );
}
