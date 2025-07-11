import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  participants: { user_id: string; user_nickname: string; is_present: boolean }[]; // 참가자 리스트
  onCheck: (userId: string, isChecked: boolean) => void; // 출석 체크 처리 함수
};

export default function AttendanceCheckModal({ open, onClose, participants, onCheck }: Props) {
  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);

  const handleCheck = (userId: string) => {
    setCheckedUsers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
    onCheck(userId, !checkedUsers.includes(userId));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>출석 체크</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {participants.map((participant) => (
            <div key={participant.user_id} className="flex items-center">
              <input
                type="checkbox"
                checked={checkedUsers.includes(participant.user_id)}
                onChange={() => handleCheck(participant.user_id)}
                id={`check-${participant.user_id}`}
                className="mr-2"
              />
              <label htmlFor={`check-${participant.user_id}`} className="text-lg">
                {participant.user_nickname}
              </label>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="mr-2">
              취소
            </Button>
          </DialogClose>
          <Button variant="primary" onClick={onClose}>
            완료
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
