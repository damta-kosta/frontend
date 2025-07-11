import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { cn } from "@/lib/utils.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import type { ChatMyRoom } from "@/types/Chat.ts";
import defaultThumbnail from "@/assets/image/default-cover.jpg";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar.tsx";
import axios from "axios";
import { useCookies } from "react-cookie"; // react-cookie 임포트

type Props = {
  chat: ChatMyRoom;
};

export default function ChatRoom({ chat }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [chatParticipants, setChatParticipants] = useState<{ user_profile_img: string; user_nickname: string }[]>([]);
  const [cookies] = useCookies(["token"]);

  // 채팅방 참가자 데이터 불러오기
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const token = cookies.token; // 쿠키에서 token을 가져오기

        if (!token) {
          throw new Error("토큰이 없습니다.");
        }

        const response = await axios.get(`/api/rooms/${chat.room_id}/participants`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChatParticipants(response.data); // 참가자 정보 설정
      } catch (error) {
        console.error("참가자 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchParticipants();
  }, [chat.room_id, cookies.token]); // 쿠키 값이 변경되면 다시 실행

  return (
    <>
      <NavLink
        to={`/chat/${chat.room_id}`}
        className={({ isActive }) =>
          cn("flex items-center gap-4 p-5 hover:bg-neutral-400/10", {
            "bg-neutral-400/10": isActive,
          })
        }
      >
        <div className={"relative aspect-9/10 h-[75px] rounded-lg"}>
          {!loaded && <Skeleton className="absolute inset-0 rounded-lg" />}
          <img
            src={chat.room_thumbnail_img || defaultThumbnail}
            alt={"cover-img"}
            className={cn(
              "h-full w-full rounded-lg object-fill transition-opacity duration-300",
              loaded ? "opacity-100" : "opacity-0",
            )}
            onLoad={() => setLoaded(true)}
            onError={(e) => {
              e.currentTarget.src = defaultThumbnail;
              setLoaded(true); // ✅ 강제로 보여지게
            }}
          />
        </div>
        <div className="flex h-[75px] w-full flex-col items-start overflow-hidden">
          <p className={"line-clamp-1 font-bold"}>{chat.room_title}</p>
          <div className={"grid w-full grid-cols-3 gap-2 mt-6"}>
            {/* 참가자 이미지 표시 */}
            <div className="col-span-2 flex gap-2">
              {chatParticipants.length > 0 ? (
                chatParticipants.slice(0, 3).map((user, index) => (
                  <Avatar key={index} className="size-6">
                    <AvatarImage
                      src={user.user_profile_img || defaultThumbnail} // 프로필 이미지
                      alt={`user-${user.user_nickname}`}
                      className="w-8 h-8" // 이미지 크기 조정
                    />
                    <AvatarFallback> </AvatarFallback> {/* Fallback */}
                  </Avatar>
                ))
              ) : (
                // 참가자가 없는 경우 기본 아이콘을 표시
                <div className="flex items-center justify-center">
                  <Avatar className="size-6">
                    <AvatarFallback> </AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>
            {/* 최신 채팅 날짜 (고정형식으로 표시) */}
            <p className={"col-span-1 text-xs text-neutral-500 mt-2"}>
              {new Date().toISOString().split("T")[0]} {/* yyyy-MM-dd 형식 */}
            </p>
          </div>
        </div>
      </NavLink>
    </>
  );
}
