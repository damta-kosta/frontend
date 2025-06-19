import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";

type Props = { isMine: boolean; message: string };

export default function MessageBubble({ isMine, message }: Props) {
  // 내 메세지 (오른쪽)
  if (isMine) {
    return (
      <div className="flex w-full justify-end">
        <div className={"flex gap-1"}>
          <p className={"self-end text-xs text-nowrap text-neutral-500"}>
            오전 HH:mm
          </p>
          <p
            className={
              "bg-primary/20 w-fit max-w-[60%] rounded-tl-lg rounded-b-lg px-3 py-2 break-all"
            }
          >
            {message}
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
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex w-full flex-col gap-1">
          <p className={"font-bold"}>이름</p>
          <div className={"flex gap-1"}>
            {/* 메세지 */}
            <p
              className={
                "w-fit max-w-[60%] rounded-tr-lg rounded-b-lg bg-gray-100 px-3 py-2 break-all"
              }
            >
              {message}
            </p>
            <p className={"self-end text-xs text-nowrap text-neutral-500"}>
              오전 HH:mm
            </p>
          </div>
        </div>
      </div>
    );
  }
}
