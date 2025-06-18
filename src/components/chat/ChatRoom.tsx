import { NavLink } from "react-router";
import { cn } from "@/lib/utils.ts";

type Props = {
  chatId: string;
};

export default function ChatRoom({ chatId }: Props) {
  return (
    <>
      <NavLink
        to={`/chat/${chatId}`}
        className={({ isActive }) =>
          cn("flex gap-5 p-5 hover:bg-gray-100", { "bg-gray-100": isActive })
        }
      >
        <img
          src={"https://picsum.photos/200"}
          alt={"cover-img"}
          className={"aspect-square w-1/6 rounded-lg"}
        />
        <div className="flex flex-col justify-between">
          <p className={"truncate font-bold"}>모임명</p>
          <p className={"truncate"}>제일 최신 채팅</p>
          <p className={"text-sm text-neutral-500"}>yyyy년 MM월 dd일</p>
        </div>
      </NavLink>
    </>
  );
}
