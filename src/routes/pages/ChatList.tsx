import { Outlet, useParams } from "react-router";
import ChatRoom from "@/components/chat/ChatRoom.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import type { ChatMyRoom } from "@/types/Chat.ts";
import { toast } from "sonner";

export default function ChatListPage() {
  const { chatId } = useParams();
  const showChatOnly = !!chatId;
  const [chatList, setChatList] = useState<ChatMyRoom[]>([]);

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        await axios
          .get("/api/chat/myRooms")
          .then((res) => setChatList(res.data));
      } catch (e) {
        console.error(e);
        toast.error("불러오는데 실패했습니다.");
      }
    };

    fetchChatList();
  }, []);

  return (
    <div className="grid w-full grid-cols-1 lg:grid-cols-5">
      {/* 채팅 목록 (모바일에선 chatId 있을 때 숨김) */}
      <div
        className={`h-screen overflow-y-auto border-r ${showChatOnly ? "hidden" : "block"} lg:col-span-2 lg:block`}
      >
        <div className="bg-background sticky top-0 z-10 flex h-[50px] items-center border-b px-5">
          <p className="text-xl font-bold">채팅</p>
        </div>

        <div className="py-5">
          {chatList.map((chat: ChatMyRoom) => (
            <ChatRoom key={chat.room_id} chat={chat} />
          ))}
        </div>
      </div>

      {/* 채팅 내역 (모바일에선 chatId 있을 때만 표시) */}
      <div
        className={`h-screen ${showChatOnly ? "block" : "hidden"} lg:col-span-3 lg:block`}
      >
        {chatId && <Outlet />}
      </div>
    </div>
  );
}
