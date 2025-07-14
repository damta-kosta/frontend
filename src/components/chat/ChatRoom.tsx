import { useState } from "react";
import { NavLink } from "react-router";
import { cn } from "@/lib/utils.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import type { ChatMyRoom } from "@/types/Chat.ts";
import defaultThumbnail from "@/assets/image/default-cover.jpg";

type Props = {
  chat: ChatMyRoom;
};

export default function ChatRoom({ chat }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <NavLink
        to={`/chat/${chat.room_id}`}
        className={({ isActive }) =>
          cn("flex items-center gap-4 p-5 hover:bg-neutral-400/10", {
            "bg-neutral-400/10": isActive,
          })
        }
      >
        <div className={"relative aspect-9/10 h-[75px] rounded-lg"}>
          {!loaded && <Skeleton className="absolute inset-0 rounded-lg" />}
          <img
            src={chat.room_thumbnail_img || defaultThumbnail}
            alt={"cover-img"}
            className={cn(
              "h-full w-full rounded-lg object-fill transition-opacity duration-300",
              loaded ? "opacity-100" : "opacity-0",
            )}
            onLoad={() => setLoaded(true)}
            onError={(e) => {
              e.currentTarget.src = defaultThumbnail;
              setLoaded(true); // ✅ 강제로 보여지게
            }}
          />
        </div>
        <div className="flex h-[75px] w-full flex-col items-start overflow-hidden">
          <p className={"line-clamp-1 font-bold"}>{chat.room_title}</p>
          <div className={"grid w-full grid-cols-3 gap-2 mt-6"}>
            <p className={"col-span-2 line-clamp-2 w-full"}>최신 채팅 내역</p>
            {/* 최신 채팅 날짜 (고정형식으로 표시) */}
            <p className={"col-span-1 text-xs text-neutral-500 mt-2"}>
              {new Date().toISOString().split("T")[0]} {/* yyyy-MM-dd 형식 */}
            </p>
          </div>
        </div>
      </NavLink>
    </>
  );
}
