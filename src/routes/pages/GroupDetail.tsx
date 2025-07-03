import { RiAddLine, RiArrowLeftLine, RiVipCrownFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { cn } from "@/lib/utils.ts";
import { useEffect, useState } from "react";
import axios from "axios";
import type { RoomListDetail } from "@/types/Room.ts";
import dayjs from "dayjs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";

export default function GroupDetailPage() {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [roomDetailData, setRoomDetailData] = useState<RoomListDetail>();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchGroupDetail = async () => {
      const data: RoomListDetail = await axios
        .get(`/api/roomList/rooms/${groupId}`)
        .then((res) => res.data);

      setRoomDetailData(data);
    };

    fetchGroupDetail();
  }, [groupId]);

  return (
    <>
      <div className={"relative flex h-full flex-col overflow-y-auto"}>
        {/* 상단 헤더 */}
        <div
          className={
            "bg-background sticky top-0 z-10 flex h-[50px] shrink-0 items-center border-b px-4"
          }
        >
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => navigate("/group")}
            className={"rounded-full"}
          >
            <RiArrowLeftLine className={"size-7"} />
          </Button>
        </div>

        {roomDetailData && (
          <>
            {/* 커버 이미지 */}
            <div className={"relative h-full w-full"}>
              {!loaded && (
                <Skeleton className="absolute inset-0 rounded-none" />
              )}
              <img
                src={roomDetailData.thumbnailBase64 ?? ""}
                alt={"cover-img"}
                className={cn(
                  "h-full w-full object-cover object-center transition-opacity duration-300",
                  loaded ? "opacity-100" : "opacity-0",
                )}
                onLoad={() => setLoaded(true)}
                onError={() => setLoaded(false)}
              />
            </div>
            {/* 본문 */}
            <div
              className={
                "bg-background absolute bottom-0 left-0 flex h-1/3 w-full flex-col gap-5 rounded-t-xl px-5 py-10 xl:h-1/2"
              }
            >
              <h1 className={"truncate text-3xl font-bold"}>
                {roomDetailData.title}
              </h1>
              {/* 모임 날짜 */}
              <p className={""}>
                모임일
                <span className={"pl-2"}>
                  {dayjs(roomDetailData.room_scheduled).format(
                    "YY.MM.DD(ddd) A h:mm",
                  )}
                </span>
              </p>
              {/* 모임 인원 */}
              <div className={"flex gap-4"}>
                {roomDetailData.participants.map((participant) => (
                  <div className={"flex flex-col items-center gap-1"}>
                    {participant.is_host && (
                      <RiVipCrownFill className={"bg-primary"} />
                    )}
                    <Avatar key={participant.user_id} className={"size-12"}>
                      <AvatarImage
                        src={participant.user_profile_img}
                        alt="user"
                      />
                      <AvatarFallback />
                    </Avatar>
                    <p className={"text-sm"}>
                      {participant!.user_nickname!.length > 5
                        ? participant!.user_nickname!.slice(0, 5) + "..."
                        : participant.user_nickname}
                    </p>
                  </div>
                ))}
                {[
                  ...Array(
                    roomDetailData.max_participants -
                      roomDetailData.participant_count,
                  ),
                ].map((_, i) => (
                  <Avatar
                    key={i}
                    className={
                      "flex size-10 items-center justify-center border-2 border-dashed"
                    }
                  >
                    <RiAddLine className={"size-5 text-neutral-400"} />
                  </Avatar>
                ))}
              </div>
              {/* 모임 설명 */}
              <p className={""}>{roomDetailData.description}</p>
            </div>
          </>
        )}
      </div>

      {/* 신청 버튼 */}
      <Button
        className={
          "sticky bottom-0 z-10 w-full rounded-none py-6 text-lg font-bold tracking-widest"
        }
      >
        신청하기
      </Button>
    </>
  );
}
