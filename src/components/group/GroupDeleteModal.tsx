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
import { toast } from "sonner";
import axios from "axios";

type Props = {
  open: boolean;
  onCancel: () => void;
};

export default function GroupDeleteModal({ open, onCancel }: Props) {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/rooms/${groupId}/deactivate`);
      toast.success("모임이 성공적으로 삭제되었습니다!");
      navigate(`/group`, { replace: true });
    } catch (e) {
      console.error(e);
      toast.error("모임 삭제에 실패했습니다.");
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
