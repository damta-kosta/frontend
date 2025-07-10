import axios, { type AxiosError } from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

type Props = {
  postId: string;
};

type FormData = {
  comment: string;
};

export default function CommentWrite({ postId }: Props) {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: { comment: "" },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!postId) return;

    try {
      await axios.post(`/api/comments/${postId}/write`, {
        comment_body: data.comment,
      });
      window.location.reload();
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "알 수 없는 오류입니다.");
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="bg-background bottom-0 z-10 flex w-full items-center gap-3 border-t px-5 py-3"
    >
      <input
        {...register("comment")}
        className="box-border h-10 w-full rounded-full border px-5 leading-none"
      />
      <button
        className={
          "bg-primary text-background h-10 w-20 rounded-full font-bold"
        }
      >
        댓글
      </button>
    </form>
  );
}
