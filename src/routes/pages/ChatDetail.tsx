import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button.tsx";
import { RiArrowDropDownLine, RiArrowLeftLine } from "react-icons/ri";
import { useEffect, useState } from "react";
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
import type { ChatInfo } from "@/types/Chat.ts";
import { useAuthStore } from "@/stores/useAuthStore.ts";
import { useChatSocket } from "@/hooks/useSocket.ts";
import axios from "axios";

export default function ChatDetailPage() {
  const { chatId } = useParams();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [coverOpen, setCoverOpen] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [messages, setMessages] = useState<ChatInfo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const { sendMessage, sendTyping, syncChat } = useChatSocket({
    roomId: chatId!,
    userId: user!.user_id,
    onMessage: (msg) => {
      setMessages((prev) => [...prev, msg]);
    },
    onTyping: (userId) => {
      console.log(`${userId} is typing...`);
    },
    onUserList: (list) => {
      console.log("접속자 목록", list);
    },
    onUserCount: (count) => {
      console.log("접속자 수", count);
    },
  });

  const handleSendMessage = () => {
    sendMessage(inputValue.trim()); // ✅ 입력값 전달
    setInputValue(""); // 입력창 비우기
  };

  // 엔터 입력 -> 메세지 보내기
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      sendMessage(inputValue.trim()); // ✅ 입력값 전달
      setInputValue(""); // 입력창 비우기
    }
  };

  // 채팅 스크롤 올렸을 때 과거 메시지 가져오기
  useEffect(() => {
    syncChat();

    const fetchAllChat = async () => {
      await axios
        .get(`/api/chat/${chatId}/allChat`)
        .then((res) => setMessages(res.data.chat));
    };

    fetchAllChat();
  }, []);

  return (
    <>
      <div className={"relative flex h-full flex-col"}>
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
        {coverOpen && (
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
        )}
        <div className={"sticky flex flex-col gap-2 border-b px-5 py-3"}>
          {coverOpen && (
            <>
              <div className="flex justify-between">
                <p className={"text-3xl font-bold"}>모임명</p>
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={"rounded-full"}
                    >
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
                  <Avatar key={i} className={"size-10"}>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </>
          )}
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => setCoverOpen((prev) => !prev)}
            className={"self-center rounded-full"}
          >
            <RiArrowDropDownLine
              className={cn("size-7 rotate-0 transition", {
                "rotate-180": coverOpen,
              })}
            />
          </Button>
        </div>

        {/* 채팅 내역 */}
        <div className={"mb-18 flex flex-col gap-5 overflow-y-auto p-5"}>
          {messages.map((msg) => (
            <MessageBubble
              key={msg.chat_id}
              isMine={msg.user_id === user?.user_id}
              message={msg.chat_msg}
            />
          ))}
        </div>

        {/*  채팅 입력 */}
        <div
          className={
            "bg-background absolute bottom-0 z-10 w-full border-t px-4 py-2"
          }
        >
          <div
            className={
              "flex w-full gap-2 rounded-full bg-neutral-100 py-1 pr-1 pl-4"
            }
          >
            <input
              maxLength={255}
              placeholder={"작성하기"}
              className={"w-full focus:outline-0"}
              onChange={(e) => {
                setInputValue(e.target.value);
                sendTyping(); // ✅ 타이핑 이벤트 보내기
              }}
              onKeyDown={onKeyDown}
            />
            <Button
              variant={"ghost"}
              size={"icon"}
              className={"hover:bg-primary/20 rounded-full"}
              onClick={handleSendMessage}
            >
              <LuSend className={"text-primary size-5 -translate-x-0.5"} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
