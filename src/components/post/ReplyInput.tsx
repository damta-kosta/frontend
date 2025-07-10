import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import axios, { type AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  parentCommentId: string;
};

type FormData = { reply_body: string };

export default function ReplyInput({ parentCommentId }: Props) {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: { reply_body: "" },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    if (!data.reply_body.trim()) return;

    setLoading(true);
    try {
      await axios.post(`/api/comments/reply/${parentCommentId}`, {
        reply_body: data.reply_body,
      });
      window.location.reload();
    } catch (e) {
      const err = e as AxiosError<{ error: string }>;
      toast.error(err.response?.data.error || "알 수 없는 오류입니다.");
    } finally {
      setLoading(false);
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <input
        {...register("reply_body", { required: true })}
        className="flex-1 rounded-full border px-4 py-2 text-sm"
        placeholder="답글을 입력하세요"
      />
      <Button disabled={loading} className={"rounded-full"}>
        등록
      </Button>
    </form>
  );
}
