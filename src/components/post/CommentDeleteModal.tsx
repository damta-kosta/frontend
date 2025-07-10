import axios, { type AxiosError } from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";

type Props = {
  open: boolean;
  onCancel: () => void;
  commentId: string | null;
};

export default function CommentDeleteModal({
  open,
  onCancel,
  commentId,
}: Props) {
  const handleDelete = async () => {
    if (!commentId) return;

    try {
      await axios.delete(`/api/comments/comment/${commentId}/delete`);
      toast.success("모임이 성공적으로 삭제되었습니다!");
      window.location.reload();
    } catch (e) {
      const err = e as AxiosError<{ error: string }>;
      toast.error(err.response?.data.error || "알 수 없는 오류입니다.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
          <DialogDescription>이 작업은 되돌릴 수 없습니다.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>취소</Button>
          </DialogClose>
          <Button variant={"destructive"} onClick={handleDelete}>
            삭제하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
