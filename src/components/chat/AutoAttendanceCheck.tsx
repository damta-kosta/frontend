import { useEffect } from "react";
import { Button } from "@/components/ui/button.tsx";

type Props = {
  participants: { user_id: string; user_nickname: string }[];
  onAutoCheck: (userId: string) => void; // 자동 출석 체크 처리 함수
};

export default function AutoAttendanceCheck({ participants, onAutoCheck }: Props) {
  useEffect(() => {
    // 예: 모임 시작 시간에 자동 출석 체크
    participants.forEach((participant) => {
      onAutoCheck(participant.user_id);
    });
  }, [participants, onAutoCheck]);

  return (
    <div className="flex justify-center mt-4">
      <Button variant="outline" onClick={() => participants.forEach((p) => onAutoCheck(p.user_id))}>
        자동 출석 체크
      </Button>
    </div>
  );
}
