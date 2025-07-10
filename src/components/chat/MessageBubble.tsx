import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import type { ChatInfo } from "@/types/Chat.ts";
import dayjs from "dayjs";

type Props = { isMine: boolean; chat: ChatInfo };

export default function MessageBubble({ isMine, chat }: Props) {
  // 내 메세지 (오른쪽)
  if (isMine) {
    return (
      <div className="flex w-full justify-end">
        <div className={"flex w-full justify-end gap-2"}>
          <p className={"self-end text-xs text-nowrap text-neutral-500"}>
            {dayjs(chat.created_at).format("A HH:mm")}
          </p>
          <p
            className={
              "bg-primary/20 w-fit max-w-[60%] rounded-tl-lg rounded-b-lg px-3 py-2 break-words"
            }
          >
            {chat.chat_msg}
          </p>
        </div>
      </div>
    );
  }
  // 타인 메세지 (왼쪽)
  else {
    return (
      <div className="flex gap-2">
        <Avatar className={"size-10"}>
          <AvatarImage src={chat.user_profile_img || ""} alt="user" />
          <AvatarFallback />
        </Avatar>
        <div className="flex w-full flex-col gap-1">
          <p className={"font-bold"}>{chat.user_nickname}</p>
          <div className={"flex w-full gap-2"}>
            {/* 메세지 */}
            <p
              className={
                "w-fit max-w-[60%] rounded-tr-lg rounded-b-lg bg-neutral-300/20 px-3 py-2 break-words"
              }
            >
              {chat.chat_msg}
            </p>
            <p className={"self-end text-xs text-nowrap text-neutral-500"}>
              {dayjs(chat.created_at).format("A HH:mm")}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
