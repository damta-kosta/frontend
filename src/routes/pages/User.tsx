import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";

export default function UserPage() {
  const [isEditState, setIsEditState] = useState({ profile: false });
  const [user, setUser] = useState({ name: "", email: "", description: "" });

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
        <div className={"flex flex-col gap-10"}>
          <div className={"flex gap-5 pb-10"}>
            <div className={"flex flex-col gap-1"}>
              <Avatar className={"mb-2 size-28"}>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Button className={"font-bold"}>이미지 업로드</Button>
              <Button
                variant={"ghost"}
                className={"text-primary hover:text-primary font-bold"}
              >
                이미지 제거
              </Button>
            </div>
            <div className={"flex w-full justify-between gap-5"}>
              <div className={"flex w-full flex-col justify-between gap-5"}>
                {/* 업적 */}
                <div className={"flex gap-2 text-sm"}>
                  <button
                    className={"rounded-full border-4 px-4 py-1 font-bold"}
                  >
                    대표 업적
                  </button>
                  <button
                    className={"rounded-full border-4 px-4 py-1 font-bold"}
                  >
                    호감도
                  </button>
                </div>
                <div className={"flex h-full w-full flex-col gap-3"}>
                  {isEditState.profile ? (
                    <>
                      <Input
                        value={user.name}
                        placeholder={"이름"}
                        className={"font-bold"}
                        onChange={(e) =>
                          setUser({ ...user, name: e.target.value })
                        }
                      />
                      <Input
                        value={user.description}
                        placeholder={"한 줄 소개"}
                        onChange={(e) =>
                          setUser({ ...user, description: e.target.value })
                        }
                      />
                    </>
                  ) : (
                    <>
                      <p className={"text-3xl font-bold"}>{user.name}</p>
                      <p>{user.description}</p>
                    </>
                  )}
                </div>
              </div>
              {isEditState.profile ? (
                <Button
                  className={"font-bold"}
                  onClick={() =>
                    setIsEditState({ ...isEditState, profile: false })
                  }
                >
                  저장
                </Button>
              ) : (
                <Button
                  variant={"link"}
                  className={"font-bold"}
                  onClick={() =>
                    setIsEditState({ ...isEditState, profile: true })
                  }
                >
                  수정
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* 그외 정보 */}
        <div className={"flex flex-col gap-5"}>
          {/* 이메일 */}
          <div className={"flex justify-between"}>
            <h1 className={"pb-5 text-xl font-bold"}>이메일</h1>
            <div className={"flex gap-3"}>
              <Input className={"w-56"} />
              <Button>설정</Button>
            </div>
          </div>
          <div className={"flex justify-between"}>
            <h1 className={"pb-5 text-xl font-bold"}>비밀번호</h1>
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
