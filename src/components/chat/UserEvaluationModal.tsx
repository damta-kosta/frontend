import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import type { Participant } from "@/types/Room";

type Props = {
  open: boolean;
  onClose: () => void;
  targetUsers: Participant[];
  roomId: string;
  onSubmit: (targetId: string, reputation: "warm" | "cold") => void;
};

export default function UserEvaluationModal({
  open,
  onClose,
  targetUsers,
  roomId,
}: Props) {
  const [evaluatedUsers, setEvaluatedUsers] = useState<string[]>([]);
  const [errorMap, setErrorMap] = useState<Record<string, string>>({});

  const handleEvaluate = async (userId: string, reputation: "warm" | "cold") => {
    if (evaluatedUsers.includes(userId)) return;

    try {
      await axios.post(`/api/chat/${userId}/reputation`, {
        reputation,
      }, {
        params: { roomId },
      });

      setEvaluatedUsers((prev) => [...prev, userId]);
    } catch (err: any) {
      const message = err.response?.data?.error || "평판 등록 실패";
      setErrorMap((prev) => ({ ...prev, [userId]: message }));
      console.error("평판 에러:", message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>유저 평판 남기기</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4 max-h-[300px] overflow-y-auto">
          {targetUsers.map((user) => {
            const alreadyEvaluated = evaluatedUsers.includes(user.user_id);
            const errorMsg = errorMap[user.user_id];

            return (
              <div
                key={user.user_id}
                className="flex flex-col items-center justify-center"
              >
                <Avatar className="size-14">
                  <AvatarImage src={user.user_profile_img || undefined} />
                  <AvatarFallback>{user.user_nickname?.charAt(0) || "?"}</AvatarFallback>
                </Avatar>
                <p className="mt-1 text-sm">{user.user_nickname || "닉네임 없음"}</p>

                <div className="mt-2 flex gap-2">
                  <Button
                    variant="outline"
                    disabled={alreadyEvaluated}
                    onClick={() => handleEvaluate(user.user_id, "warm")}
                  >
                    <ThumbsUp className="mr-1 size-4 text-red-500" />
                    따뜻해
                  </Button>
                  <Button
                    variant="outline"
                    disabled={alreadyEvaluated}
                    onClick={() => handleEvaluate(user.user_id, "cold")}
                  >
                    <ThumbsDown className="mr-1 size-4 text-blue-500" />
                    차가워
                  </Button>
                </div>

                {alreadyEvaluated && (
                  <p className="mt-1 text-xs text-green-600">평가 완료됨</p>
                )}
                {errorMsg && (
                  <p className="mt-1 text-xs text-red-500">{errorMsg}</p>
                )}
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
