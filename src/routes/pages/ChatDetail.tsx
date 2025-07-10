import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button.tsx";
import {
  RiArrowDropDownLine,
  RiArrowLeftLine,
  RiDeleteBinLine,
  RiEditLine,
  RiLogoutBoxLine,
} from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
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
import { cn } from "@/lib/utils.ts";
import type { ChatInfo } from "@/types/Chat.ts";
import { useAuthStore } from "@/stores/useAuthStore.ts";
import { useChatSocket } from "@/hooks/useSocket.ts";
import axios from "axios";
import type { Participant } from "@/types/Room.ts";
import dayjs from "dayjs";
import ChatExitModal from "@/components/chat/ChatExitModal.tsx";

export default function ChatDetailPage() {
  const { chatId } = useParams();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [coverOpen, setCoverOpen] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [messages, setMessages] = useState<ChatInfo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [exitModalOpen, setExitModalOpen] = useState(false);

  // 채팅 업데이트 스크롤 ref
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const { sendMessage, disconnect } = useChatSocket({
    roomId: chatId!,
    userId: user!.user_id,
    onJoinRoom: (res) => {
      console.log(res);
    },
    onMessage: (msg) => {
      setMessages((prev) => [...prev, msg]);
    },
    onSyncMessage: (msgList) => {
      setMessages(msgList);
    },
    onTyping: (userId) => {
      console.log(`${userId} is typing...`);
    },
    onUserList: (list) => {
      // console.log("접속자 목록", list);
      setParticipants(list);
    },
    /*onUserCount: (count) => {
      console.log("접속자 수", count);
    },*/
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
    // syncChat();

    return () => {
      disconnect(); // ✅ 페이지 벗어날 때 연결 끊기
    };
  }, []);

  useEffect(() => {
    //   메세지 추가 시, 스크롤
    bottomRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <>
      <div className={"relative flex h-full flex-col"}>
        {/* 상단 헤더 */}
        <div
          className={
            "bg-background sticky top-0 z-10 flex h-[50px] shrink-0 items-center gap-2 px-4"
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
          <div className="flex w-full items-center justify-between">
            <p className={"text-2xl font-bold"}>모임명</p>
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className={"rounded-full"}>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                    <RiEditLine />
                    <p>수정하기</p>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant={"destructive"}
                    onClick={() => setExitModalOpen(true)}
                    className="cursor-pointer"
                  >
                    <RiLogoutBoxLine />
                    <p>나가기</p>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <ChatExitModal
          open={exitModalOpen}
          onCancel={() => setExitModalOpen(false)}
        />

        {/* 커버 이미지 */}
        {/*{coverOpen && (
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
        )}*/}
        <div className={"sticky flex flex-col gap-2 border-b px-5 py-3"}>
          {coverOpen && (
            <>
              <div className={"flex gap-1"}>
                {participants.map((user, index) => (
                  <Avatar key={index} className={"size-10"}>
                    <AvatarImage src={user.user_profile_img || ""} alt="user" />
                    <AvatarFallback />
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
        <div className={"mb-18 flex flex-col gap-3 overflow-y-auto p-5"}>
          {messages.map((msg, index) => {
            const currentDate = dayjs(msg.created_at).format("YYYY-MM-DD");
            const prevDate =
              index > 0
                ? dayjs(messages[index - 1].created_at).format("YYYY-MM-DD")
                : null;

            const showDateSeparator = currentDate !== prevDate;

            return (
              <div key={msg.chat_id}>
                {showDateSeparator && (
                  <div className="my-2 text-center text-xs text-neutral-500">
                    {dayjs(msg.created_at).format("YYYY년 M월 D일 (ddd)")}
                  </div>
                )}
                <MessageBubble
                  isMine={msg.user_id === user?.user_id}
                  chat={msg}
                />
              </div>
            );
          })}
          <div ref={bottomRef} />
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
              value={inputValue}
              className={"w-full focus:outline-0"}
              onChange={(e) => {
                setInputValue(e.target.value);
                // sendTyping(); // ✅ 타이핑 이벤트 보내기
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
