import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

export default function UserPage() {
  return (
    <>
      {/* 상단 헤더 */}
      <div
        className={
          "sticky top-0 z-10 flex h-[50px] shrink-0 items-center justify-between border-b px-5"
        }
      >
        <p className={"text-xl font-bold"}>마이페이지</p>
      </div>
      <div className={"flex flex-col gap-10 divide-y px-5 pt-10 pb-15"}>
        {/* 프로필 */}
        <div className={"flex gap-5 pb-10"}>
          <Avatar className={"size-25"}>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className={"flex w-full justify-between gap-5"}>
            <div className={"flex flex-col justify-between"}>
              {/* 업적 */}
              <div className={"flex w-full gap-2 text-sm"}>
                <button className={"rounded-full border-4 px-4 py-1 font-bold"}>
                  대표 업적
                </button>
                <button className={"rounded-full border-4 px-4 py-1 font-bold"}>
                  호감도
                </button>
              </div>
              <p className={"text-3xl font-bold"}>[ 닉네임 ]</p>
            </div>
            <button
              className={
                "border-primary text-primary hover:bg-primary/10 h-fit rounded-md border-3 px-4 py-1 font-bold"
              }
            >
              설정
            </button>
          </div>
        </div>
        <div>
          <h1 className={"text-2xl font-bold"}>기본 정보</h1>
          <div className={"flex justify-between"}>
            <p>이메일</p>
            <div className={"flex gap-3"}>
              <Input className={"w-56"} />
              <Button>설정</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
