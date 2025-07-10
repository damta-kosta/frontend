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
import { useNavigate, useParams } from "react-router";

type Props = {
  open: boolean;
  onCancel: () => void;
};

export default function ChatExitModal({ open, onCancel }: Props) {
  const { chatId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.post(`/api/rooms/${chatId}/leaveRoom`).then((res) => {
        toast.success(res.data.message);
      });
      navigate(`/chat`, { replace: true });
    } catch (e) {
      const err = e as AxiosError<{ error: string }>;
      toast.error(err.response?.data.error || "알 수 없는 오류입니다.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>정말 퇴장하시겠습니까?</DialogTitle>
          <DialogDescription>이 작업은 되돌릴 수 없습니다.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>취소</Button>
          </DialogClose>
          <Button variant={"destructive"} onClick={handleDelete}>
            퇴장하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
