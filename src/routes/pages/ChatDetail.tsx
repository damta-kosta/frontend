import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button.tsx";
import { RiArrowLeftLine } from "react-icons/ri";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { MoreHorizontal } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { LuSend } from "react-icons/lu";
import MessageBubble from "@/components/chat/MessageBubble.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { cn } from "@/lib/utils.ts";

export default function ChatDetailPage() {
  const { chatId } = useParams();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className={"flex h-full flex-col overflow-y-auto"}>
        {/* 상단 헤더 */}
        <div
          className={
            "bg-background sticky top-0 z-10 flex h-[50px] shrink-0 items-center border-b px-4"
          }
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/chat")}
            className={"rounded-full p-1 hover:bg-neutral-100"}
          >
            <RiArrowLeftLine className={"size-7"} />
          </Button>
        </div>
        <div className={"relative aspect-3/1"}>
          {!loaded && <Skeleton className="absolute inset-0" />}
          <img
            src={"https://picsum.photos/600/300"}
            alt={"cover-img"}
            className={cn(
              "aspect-3/1 h-full w-full object-cover object-center transition-opacity duration-300",
              loaded ? "opacity-100" : "opacity-0",
            )}
            onLoad={() => setLoaded(true)}
          />
        </div>
        <div className={"sticky flex flex-col gap-2 border-b p-5"}>
          <div className="flex justify-between">
            <p className={"text-3xl font-bold"}>모임명</p>
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className={"rounded-full"}>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                    SUB1
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    SUB2
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-600">
                    나가기
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className={"line-clamp-2"}>설명({chatId})</p>
          <div className={"flex gap-1"}>
            {[...Array(4)].map((_, i) => (
              <Avatar className={"size-10"}>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>

        {/* 채팅 내역 */}
        <div className={"flex flex-col gap-5 p-5"}>
          {[...Array(4)].map((_, i) => (
            <MessageBubble
              key={i}
              isMine={i % 2 === 0}
              message={`message${i}`}
            />
          ))}
        </div>

        {/*  채팅 입력 */}
        <div className={"bg-background sticky bottom-0 border-t px-4 py-2"}>
          <div
            className={
              "flex w-full gap-2 rounded-full bg-neutral-100 py-1 pr-1 pl-4"
            }
          >
            <input
              maxLength={255}
              placeholder={"작성하기"}
              className={"w-full focus:outline-0"}
            />
            <Button
              variant={"ghost"}
              size={"icon"}
              className={"hover:bg-primary/20 rounded-full"}
            >
              <LuSend className={"text-primary size-5 -translate-x-0.5"} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
