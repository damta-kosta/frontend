import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { RiArrowLeftLine, RiLink, RiMoreFill } from "react-icons/ri";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import type { Post } from "@/types/Community.ts";
import { formatTweetTime } from "@/lib/formatTweetTime.ts";
import CommentList from "@/components/post/CommentList.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { toast } from "sonner";
import axios, { type AxiosError } from "axios";

export default function PostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [postData, setPostData] = useState<Post>();
  const [comment, setComment] = useState<string>("");

  const [loaded, setLoaded] = useState(false);

  const handleCopyLink = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    await navigator.clipboard
      .writeText(window.location.href)
      .then(() => toast.success("복사되었습니다!"));
  };

  const handleWriteComment = async () => {
    if (!postId) return;

    try {
      await axios.post(`/api/comments/${postId}/write`, {
        comment_body: comment,
      });
      window.location.reload();
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "알 수 없는 오류입니다.");
    }
  };

  // 게시글 API 받아오기
  useEffect(() => {
    const fetchPost = async () => {
      const data: Post = await axios
        .get(`/api/community/${postId}`)
        .then((res) => res.data.post);

      setPostData(data);
    };

    fetchPost();
  }, [postId]);

  return (
    <>
      {/* 상단 헤더 */}
      <div
        className={
          "bg-background sticky top-0 z-10 flex h-[50px] shrink-0 items-center border-b px-4"
        }
      >
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => (location.state ? navigate(-1) : navigate("/"))}
          className={"rounded-full"}
        >
          <RiArrowLeftLine className={"size-7"} />
        </Button>
      </div>

      {postData && (
        <div
          className={
            "relative flex h-full flex-col gap-4 overflow-y-auto px-5 pt-5 pb-10"
          }
        >
          {/* 작성자 정보 */}
          <div className={"flex justify-between"}>
            <div className={"flex items-center gap-3"}>
              <Avatar className={"size-10"}>
                <div
                  className={
                    "absolute inset-0 cursor-pointer bg-neutral-800/20 opacity-0 transition-opacity duration-200 hover:opacity-100"
                  }
                ></div>
                <AvatarImage src={postData.writer_profile_img} alt="avatar" />
                <AvatarFallback />
              </Avatar>
              <p className={"cursor-pointer font-bold"}>
                {postData.writer_nickname}
                <span className={"text-foreground/40 pl-2 font-medium"}>
                  {formatTweetTime(postData.create_at)}
                </span>
              </p>
            </div>
            {/* 드랍다운 메뉴 */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={"h-fit rounded-full p-1.5 hover:bg-neutral-400/20"}
              >
                <RiMoreFill className={"text-foreground/50"} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className={"flex justify-between"}
                  onClick={handleCopyLink}
                >
                  <span>링크복사</span>
                  <RiLink />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/*  게시글 정보 */}
          <p>{postData.content}</p>
          {/*  이미지 정보 */}
          {postData.imagebase64.length > 10 && (
            <div className="relative aspect-5/3 w-full overflow-hidden rounded-lg">
              {!loaded && <Skeleton className="absolute inset-0 rounded-lg" />}
              <img
                src={postData.imagebase64}
                alt="img"
                className={cn(
                  "h-full w-full object-cover transition-opacity duration-300",
                  loaded ? "opacity-100" : "opacity-0",
                )}
                onLoad={() => setLoaded(true)}
              />
            </div>
          )}

          {/* 댓글 목록 */}
          <CommentList postId={postData.community_id} />
        </div>
      )}

      {/* 댓글 작성 */}
      <div className="bg-background bottom-0 z-10 flex w-full items-center gap-3 border-t px-5 py-3">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="box-border h-10 w-full rounded-full border px-5 leading-none"
        />
        <button
          onClick={handleWriteComment}
          className={
            "bg-primary text-background h-10 w-20 rounded-full font-bold"
          }
        >
          댓글
        </button>
      </div>
    </>
  );
}
