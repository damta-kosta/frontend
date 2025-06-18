import { Outlet, useParams } from "react-router";
import DefaultChat from "@/components/chat/DefaultChat.tsx";
import ChatRoom from "@/components/chat/ChatRoom.tsx";

export default function ChatListPage() {
  const { chatId } = useParams();

  return (
    <>
      <div className={"grid w-full grid-cols-5"}>
        <div className={"col-span-2 h-screen overflow-y-auto border-r"}>
          {/* 상단 헤더 */}
          <div
            className={
              "bg-background sticky top-0 z-10 flex h-[50px] items-center border-b px-4"
            }
          >
            <p className={"text-xl font-bold"}>채팅</p>
          </div>

          {/* 채팅 목록 */}
          <div className={"py-5"}>
            <ChatRoom chatId={"1"} />
            <ChatRoom chatId={"2"} />
            <ChatRoom chatId={"3"} />
            <ChatRoom chatId={"4"} />
            <ChatRoom chatId={"5"} />
            <ChatRoom chatId={"6"} />
            <ChatRoom chatId={"7"} />
            <ChatRoom chatId={"8"} />
          </div>
        </div>

        {/* 채팅 내역 */}
        <div className={"col-span-3"}>
          {chatId ? <Outlet /> : <DefaultChat />}
        </div>
      </div>
    </>
  );
}
