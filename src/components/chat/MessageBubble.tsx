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
              "bg-primary/20 w-fit max-w-[60%] rounded-tl-lg rounded-b-lg p-3 break-all"
            }
          >
            {message}
          </p>
        </div>
      </div>
    );
  }
  // 다른 사람이 보낸 메세지
  else {
    return (
      <div className="flex gap-2">
        <Avatar className={"size-10"}>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex w-full max-w-[60%] flex-col gap-1">
          <p className={"font-bold"}>이름</p>
          <div className={"flex gap-1"}>
            {/* 메세지 */}
            <p
              className={
                "w-fit rounded-tr-lg rounded-b-lg bg-gray-100 p-3 break-all"
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
