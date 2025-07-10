import { useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";
import { toast } from "sonner";
import type { ChatInfo } from "@/types/Chat.ts";
import { useCookies } from "react-cookie";

type Props = {
  roomId: string;
  userId: string;
  onJoinRoom: ({
    status,
    room_ended,
    error,
  }: {
    status: string;
    room_ended?: boolean;
    error?: string;
  }) => void;
  onMessage: (msg: ChatInfo) => void;
  onSyncMessage: (msgList: ChatInfo[]) => void;
  onTyping?: (userId: string) => void;
  onUserList?: (list: any[]) => void;
  onUserCount?: (count: number) => void;
};

export const useChatSocket = ({
  roomId,
  userId,
  onJoinRoom,
  onMessage,
  onSyncMessage,
  onUserCount,
  onUserList,
  onTyping,
}: Props) => {
  const socketRef = useRef<Socket | null>(null);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (!roomId || !userId || !cookies.token) return;

    const socket = io(import.meta.env.VITE_API_URL, {
      auth: { token: cookies.token },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      // joinRoom 이벤트 전송
      socket.emit(
        "joinRoom",
        { roomId, userId },
        (response: {
          status: string;
          room_ended?: boolean;
          error?: string;
        }) => {
          if (response.status === "ok") {
            console.log("입장 성공");
          } else {
            console.error("입장 실패:", response.error);
          }
        },
      );

      // 초기 메세지 내역 받아오기
      socket.once(
        "syncAllChat",
        ({ roomId, chat }: { roomId: string; chat: ChatInfo[] }) => {
          onSyncMessage(chat);
        },
      );
    });

    socket.on("chatMessage", (msg: ChatInfo) => {
      onMessage(msg);
    });

    if (onTyping) {
      socket.on("typing", ({ userId }) => {
        onTyping(userId);
      });
    }

    if (onUserList) {
      socket.on("roomUserList", onUserList);
    }

    if (onUserCount) {
      socket.on("roomUserCount", onUserCount);
    }

    socket.on("errorMessage", (msg) => toast.error(msg));
    socket.on("error", (msg) => toast.error(msg));

    return () => {
      disconnect();
    };
  }, [roomId, userId, cookies.token]);

  // 메세지 전송
  const sendMessage = (message: string) => {
    if (!message.trim()) return;

    socketRef.current?.emit("chatMessage", {
      roomId,
      userId,
      message,
    });
  };

  // 타이핑 이벤트 전송
  const sendTyping = () => {
    socketRef.current?.emit("typing", { roomId, userId });
  };

  const syncChat = () => {
    socketRef.current?.emit("syncChat", {
      roomId,
      limit: 30,
    });
    socketRef.current?.on("syncChat", (messages: ChatInfo[]) => {
      messages.reverse().forEach((m) => onMessage(m));
    });
  };

  const disconnect = () => {
    socketRef.current?.emit("leaveRoom");
    socketRef.current?.disconnect();
  };

  return {
    sendMessage,
    sendTyping,
    syncChat,
    disconnect,
  };
};
