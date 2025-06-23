import { NavLink } from "react-router";
import { cn } from "@/lib/utils.ts";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton.tsx";

type Props = {
  chatId: string;
};

export default function ChatRoom({ chatId }: Props) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <NavLink
        to={`/chat/${chatId}`}
        className={({ isActive }) =>
          cn("flex items-center gap-4 p-5 hover:bg-neutral-400/10", {
            "bg-neutral-400/10": isActive,
          })
        }
      >
        <div className={"relative aspect-9/10 h-[75px] rounded-lg"}>
          {!loaded && <Skeleton className="absolute inset-0 rounded-lg" />}
          <img
            src={"https://picsum.photos/200"}
            alt={"cover-img"}
            className={cn(
              "h-full w-full rounded-lg object-cover transition-opacity duration-300",
              loaded ? "opacity-100" : "opacity-0",
            )}
            onLoad={() => setLoaded(true)}
          />
        </div>
        <div className="flex w-full flex-col">
          <p className={"truncate font-bold"}>모임명</p>
          <div className={"grid w-full grid-cols-3 gap-2"}>
            <p className={"col-span-2 line-clamp-2 w-full"}>
              제일 최신 채팅 제일 최신 채팅제일 최신 채팅제일 최신 채팅제일 최신
              채팅제일 최신 채팅제일 최신 채팅
            </p>
            <p className={"col-span-1 text-xs text-neutral-500"}>yyyy-MM-dd</p>
          </div>
        </div>
      </NavLink>
    </>
  );
}
