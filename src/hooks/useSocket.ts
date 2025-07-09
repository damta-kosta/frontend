import { useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";
import { toast } from "sonner";
import type { ChatInfo } from "@/types/Chat.ts";
import { useCookies } from "react-cookie";

type Props = {
  roomId: string;
  userId: string;
  onMessage: (msg: ChatInfo) => void;
  onTyping?: (userId: string) => void;
  onUserList?: (list: any[]) => void;
  onUserCount?: (count: number) => void;
};

export const useChatSocket = ({
  roomId,
  userId,
  onMessage,
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

    // joinRoom 이벤트 전송
    socket.on("connect", () => {
      socket.emit("joinRoom", { roomId, userId });
    });

    socket.on("chatMessage", (msg: ChatInfo) => onMessage(msg));

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
      socket.emit("leaveRoom");
      socket.disconnect();
    };
  }, [
    roomId,
    userId,
    cookies.token,
    onTyping,
    onUserList,
    onUserCount,
    onMessage,
  ]);

  const sendMessage = (message: string) => {
    if (!message.trim()) return;

    socketRef.current?.emit("chatMessage", {
      roomId,
      userId,
      message,
    });
  };

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

  return {
    sendMessage,
    sendTyping,
    syncChat,
  };
};
