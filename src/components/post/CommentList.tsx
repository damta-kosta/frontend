import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { useEffect, useState } from "react";
import type { CommentResponse } from "@/types/Community.ts";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button.tsx";
import { RiDeleteBinLine } from "react-icons/ri";
import { formatTweetTime } from "@/lib/formatTweetTime.ts";
import { useAuthStore } from "@/stores/useAuthStore.ts";
import CommentDeleteModal from "@/components/post/CommentDeleteModal.tsx";
import ReplyInput from "@/components/post/ReplyInput.tsx";

type Props = {
  postId: string;
};

export default function CommentList({ postId }: Props) {
  const { user } = useAuthStore();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [activeReplyCommentId, setActiveReplyCommentId] = useState<
    string | null
  >(null);

  const [commentData, setCommentData] = useState<CommentResponse>({
    comments: [],
    hasNext: false,
    nextCursor: null,
  });
  const { ref, inView } = useInView({
    threshold: 0.5,
    delay: 500,
    initialInView: false,
  });

  useEffect(() => {
    const getCommentData = async () => {
      if (!postId) return;

      const data: CommentResponse = await axios
        .get(`/api/comments/${postId}/comments`)
        .then((res) => res.data);
      setCommentData(data);
    };

    getCommentData();
  }, [postId]);

  useEffect(() => {
    const fetchMoreComment = async () => {
      if (!postId || !commentData.hasNext || !commentData.nextCursor || !inView)
        return;

      const data: CommentResponse = await axios
        .get(
          `/api/comments/${postId}/comments?curosr=${commentData.nextCursor}&limit=10`,
        )
        .then((res) => res.data);
      setCommentData(data);
    };

    fetchMoreComment();
  }, [inView, commentData.hasNext, commentData.nextCursor]);

  return (
    <div className={"mt-10 flex flex-col gap-1 border-t pt-5"}>
      {commentData?.comments.map((comment) => (
        <div className={"flex gap-3 py-3"}>
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
            <div className={"flex w-full justify-between gap-2"}>
              <div
                className={"flex w-full cursor-pointer flex-col"}
                onClick={() =>
                  setActiveReplyCommentId(
                    activeReplyCommentId === comment.comment_id
                      ? null
                      : comment.comment_id,
                  )
                }
              >
                <p className={"cursor-pointer font-bold"}>
                  {comment.user_nickname}
                  <span className={"text-foreground/40 pl-2 font-medium"}>
                    {formatTweetTime(comment.create_at)}
                  </span>
                </p>
                <p>{comment.comment_body}</p>
              </div>
              {comment.user_id === user?.user_id && (
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className={
                    "text-destructive hover:text-destructive rounded-full"
                  }
                  onClick={() => {
                    setActiveCommentId(comment.comment_id);
                    setDeleteModalOpen(true);
                  }}
                >
                  <RiDeleteBinLine />
                </Button>
              )}
            </div>
            {activeReplyCommentId === comment.comment_id && (
              <div className="mt-2 ml-8">
                <ReplyInput parentCommentId={comment.comment_id} />
              </div>
            )}
          </div>
        </div>
      ))}
      <CommentDeleteModal
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        commentId={activeCommentId}
      />

      {/* 무한 스크롤 감지 */}
      <div ref={ref} className={"h-20 w-full touch-none"} />
    </div>
  );
}
