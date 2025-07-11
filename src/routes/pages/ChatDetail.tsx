import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button.tsx";
import {
  RiArrowDropDownLine,
  RiArrowLeftLine,
  RiLogoutBoxLine,
} from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Skeleton } from "@/components/ui/skeleton";

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
  const [roomData, setRoomData] = useState<{ room_title: string; room_thumbnail: string }>({
    room_title: "",
    room_thumbnail: "",
  });

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
      setParticipants(list);
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

  // 방 데이터 가져오기
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(`/api/roomList/rooms/${chatId}`);
        setRoomData({
          room_title: response.data.title,
          room_thumbnail: response.data.thumbnailBase64 || "https://picsum.photos/600/300", // 썸네일 기본값 설정
        });
      } catch (error) {
        console.error("Room data fetch error:", error);
      }
    };

    fetchRoomData();

    return () => {
      disconnect(); // ✅ 페이지 벗어날 때 연결 끊기
    };
  }, [chatId]);

  useEffect(() => {
    // 메세지 추가 시, 스크롤
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
            <p className={"text-2xl font-bold"}>{roomData.room_title || "기본 제목"}</p> {/* room_title 동적 표시 */}
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className={"rounded-full"}>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem
                  variant={"destructive"}
                  onClick={() => setExitModalOpen(true)}
                  className="cursor-pointer"
                >
                  <RiLogoutBoxLine />
                  <p>나가기</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <ChatExitModal
          open={exitModalOpen}
          onCancel={() => setExitModalOpen(false)}
        />

        {/* 커버 이미지 */}
        {coverOpen && (
          <div className={"relative aspect-[3/1] overflow-hidden"}>
            {!loaded && <Skeleton className="absolute inset-0" />}
            <img
              src={roomData.room_thumbnail || "https://picsum.photos/600/300"}
              alt={"cover-img"}
              className={cn(
                "aspect-[3/1] h-full w-full object-fill transition-opacity duration-300", // object-fill 사용
                loaded ? "opacity-100" : "opacity-0",
              )}
              onLoad={() => setLoaded(true)}
            />
          </div>
        )}
        
        <div className={"sticky flex flex-col gap-2 border-b px-5 py-3"}>
          {coverOpen && (
            <>
              <div className={"flex gap-1"}>
                {participants.map((user, index) => (
                  <Avatar key={index} className={"size-10"}>
                    <AvatarImage src={user.user_profile_img} alt="user" />
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

        {/* 채팅 입력 */}
        <div
          className={"bg-background absolute bottom-0 z-10 w-full border-t px-4 py-2"}
        >
          <div
            className={"flex w-full gap-2 rounded-full bg-neutral-100 py-1 pr-1 pl-4"}
          >
            <input
              maxLength={255}
              placeholder={"작성하기"}
              value={inputValue}
              className={"w-full focus:outline-0"}
              onChange={(e) => {
                setInputValue(e.target.value);
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
