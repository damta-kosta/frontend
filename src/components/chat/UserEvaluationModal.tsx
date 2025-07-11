import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  participants: { user_id: string; user_nickname: string }[]; // 참가자 리스트
  onEvaluate: (userId: string, rating: number) => void; // 평가 처리 함수
};

export default function UserEvaluationModal({ open, onClose, participants, onEvaluate }: Props) {
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});

  const handleRatingChange = (userId: string, rating: number) => {
    setRatings((prev) => ({
      ...prev,
      [userId]: rating,
    }));
  };

  const handleSubmit = () => {
    participants.forEach((participant) => {
      if (ratings[participant.user_id]) {
        onEvaluate(participant.user_id, ratings[participant.user_id]);
      }
    });
    onClose(); // 평가 완료 후 모달 닫기
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>모임 종료 후 유저 평가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {participants.map((participant) => (
            <div key={participant.user_id} className="flex items-center">
              <span className="mr-2">{participant.user_nickname}</span>
              <select
                value={ratings[participant.user_id] || 0}
                onChange={(e) => handleRatingChange(participant.user_id, Number(e.target.value))}
                className="ml-2 p-1 border rounded"
              >
                <option value={0}>선택</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="mr-2">
              취소
            </Button>
          </DialogClose>
          <Button variant="primary" onClick={handleSubmit}>
            제출
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
