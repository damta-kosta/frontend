import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { useEffect, useState } from "react";
import type { CommentResponse } from "@/types/Community.ts";
import axios from "axios";
import { useInView } from "react-intersection-observer";

type Props = {
  postId: string;
};

export default function CommentList({ postId }: Props) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    delay: 500,
    initialInView: false,
  });

  const [commentData, setCommentData] = useState<CommentResponse>({
    comments: [],
    hasNext: false,
    nextCursor: null,
  });

  useEffect(() => {
    const fetchCommentData = async () => {
      if (!postId) return;

      const data: CommentResponse = await axios
        .get(`/api/${postId}/comments`)
        .then((res) => res.data);
      setCommentData(data);
    };

    fetchCommentData();
  }, [postId]);

  useEffect(() => {
    const fetchMoreComment = async () => {
      if (!postId || !commentData.hasNext || !commentData.nextCursor || !inView)
        return;

      const data: CommentResponse = await axios
        .get(
          `/api/${postId}/comments?cursor=${commentData.nextCursor}&limit=10`,
        )
        .then((res) => res.data);
      setCommentData(data);
    };

    fetchMoreComment();
  }, [inView, commentData.hasNext, commentData.nextCursor]);

  return (
    <div className={"flex flex-col gap-5 border-t"}>
      {commentData?.comments.map((comment) => (
        <div className={"mt-10 flex gap-3 py-5"}>
          <Avatar className={"size-10"}>
            <div
              className={
                "absolute inset-0 cursor-pointer bg-neutral-800/20 opacity-0 transition-opacity duration-200 hover:opacity-100"
              }
            ></div>
            <AvatarImage src={comment.user_profile_img} alt="user" />
            <AvatarFallback />
          </Avatar>
          <div className={"flex w-full flex-col"}>
            <p className={"cursor-pointer font-bold"}>
              {comment.user_nickname}
            </p>
            <p>{comment.comment_body}</p>
          </div>
        </div>
      ))}

      {/* 무한 스크롤 감지 */}
      <div ref={ref} className={"h-20 w-full touch-none"} />
    </div>
  );
}
