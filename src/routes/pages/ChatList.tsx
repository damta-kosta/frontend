import { Outlet, useParams } from "react-router";
import ChatRoom from "@/components/chat/ChatRoom.tsx";

export default function ChatListPage() {
  const { chatId } = useParams();
  const showChatOnly = !!chatId;

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
          {Array.from({ length: 8 }).map((_, i) => (
            <ChatRoom key={i} chatId={(i + 1).toString()} />
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
