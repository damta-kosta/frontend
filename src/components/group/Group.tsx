import { RiAddLine, RiCalendar2Line } from "react-icons/ri";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { cn } from "@/lib/utils.ts";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Link, useLocation } from "react-router";
import type { RoomListItem } from "@/types/Room.ts";
import dayjs from "dayjs";

type Props = {
  room: RoomListItem;
};

export default function Group({ room }: Props) {
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Link
        to={`/group/${room.room_id}`}
        state={{ from: location.pathname }}
        className={"relative flex cursor-pointer gap-5"}
      >
        {/* 커버 이미지 */}
        <div
          className={
            "relative aspect-3/4 w-1/4 min-w-[120px] overflow-hidden rounded-lg"
          }
        >
          {!loaded && <Skeleton className="absolute inset-0 rounded-lg" />}
          <img
            src={room.thumbnailBase64 || `https://picsum.photos/seed/${room.room_id}/600/300`}
            alt="img"
            className={cn(
              "h-full w-full object-fill transition-opacity duration-300",
              loaded ? "opacity-100" : "opacity-0",
            )}
            onLoad={() => setLoaded(true)}
          />
        </div>
        <div className={"flex w-full flex-col justify-between"}>
          {/* 모임 정보 */}
          <div className={"flex flex-col gap-2"}>
            <p className={"line-clamp-1 text-2xl font-bold"}>{room.title}</p>
            <p className={"line-clamp-1"}>{room.description}</p>
            <div className={"flex items-center gap-2 text-neutral-500"}>
              <RiCalendar2Line className={"size-5"} />
              <p className={""}>
                {dayjs(room.room_scheduled).format("M.D(ddd) A h:mm")}
              </p>
            </div>
          </div>
          {/* 참가 인원 현황 */}
          <div className="flex gap-1">
            {room.participant_profiles.map((participant) => (
              <Avatar key={participant.user_id} className={"size-10"}>
                <AvatarImage src={participant.user_profile_img} alt="@shadcn" />
                <AvatarFallback />
              </Avatar>
            ))}
            {/* 남아있는 자리만큼 렌더링 */}
            {[...Array(room.max_participants - room.participant_count)].map(
              (_, i) => (
                <Avatar
                  key={i}
                  className={
                    "flex size-10 items-center justify-center border-2 border-dashed"
                  }
                >
                  <RiAddLine className={"size-5 text-neutral-400"} />
                </Avatar>
              ),
            )}
          </div>
        </div>
      </Link>
    </>
  );
}
