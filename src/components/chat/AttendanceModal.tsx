import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { CheckCircle, Circle } from "lucide-react";
import type { Participant } from "@/types/Room";

type AttendanceCheckModalProps = {
  open: boolean;
  onClose: () => void;
  participants: Participant[];
  onSubmit: (selectedUserIds: string[]) => void;
  mode: "manual" | "auto";
};

export default function AttendanceCheckModal({
  open,
  onClose,
  participants,
  onSubmit,
  mode,
}: AttendanceCheckModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (userId: string) => {
    setSelectedIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleConfirm = () => {
    onSubmit(selectedIds);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "manual" ? "출석 체크 (수동)" : "출석 체크 (자동)"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 py-4 max-h-[300px] overflow-y-auto">
          {participants.map((user) => {
            const isSelected = selectedIds.includes(user.user_id);
            return (
              <div
                key={user.user_id}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => toggleSelect(user.user_id)}
              >
                <Avatar className="size-14">
                  <AvatarImage src={user.user_profile_img || undefined} />
                  <AvatarFallback>
                    {user.user_nickname?.charAt(0) || "?"}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm mt-1">{user.user_nickname || "닉네임 없음"}</p>
                <div className="mt-1">
                  {isSelected ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <Circle className="text-gray-400" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <DialogFooter>
          <Button onClick={handleConfirm} disabled={selectedIds.length === 0}>
            출석 완료
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
