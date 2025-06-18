import { RiAddLine, RiCalendar2Line } from "react-icons/ri";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { cn } from "@/lib/utils.ts";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export default function Room() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div className={"relative flex cursor-pointer gap-5"}>
        {/* 커버 이미지 */}
        <div
          className={
            "relative aspect-3/4 w-1/4 min-w-[120px] overflow-hidden rounded-lg"
          }
        >
          {!loaded && <Skeleton className="absolute inset-0 rounded-lg" />}
          <img
            src="https://picsum.photos/300/400"
            alt="img"
            className={cn(
              "h-full w-full object-cover transition-opacity duration-300",
              loaded ? "opacity-100" : "opacity-0",
            )}
            onLoad={() => setLoaded(true)}
          />
        </div>
        <div className={"flex w-full flex-col justify-between"}>
          {/* 모임 정보 */}
          <div>
            <p className={"text-2xl font-bold"}>제목</p>
            <p className={""}>설명</p>
            <div className={"flex items-center gap-2 text-neutral-500"}>
              <RiCalendar2Line className={"size-5"} />
              <p className={""}>yyyy-MM-dd HH:mm</p>
            </div>
          </div>
          {/* 참가 인원 현황 */}
          <div className="flex gap-1">
            <Avatar className={"size-10"}>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className={"size-10"}>
              <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar className={"size-10"}>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <Avatar
              className={
                "flex size-10 items-center justify-center border-2 border-dashed"
              }
            >
              <RiAddLine className={"size-5 text-neutral-400"} />
            </Avatar>
          </div>
        </div>
      </div>
    </>
  );
}
