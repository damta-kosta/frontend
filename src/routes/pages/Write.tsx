import { useNavigate } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useRef } from "react";
import { RiImage2Line } from "react-icons/ri";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";

export default function WritePage() {
  const navigate = useNavigate();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleResizeHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const MAX_HEIGHT = 240;
    textarea.style.height = "auto"; // 높이 초기화
    const newHeight = Math.min(textarea.scrollHeight, MAX_HEIGHT);
    textarea.style.height = `${newHeight}px`;
    textarea.style.height = newHeight + "px";
    textarea.style.overflowY =
      textarea.scrollHeight > MAX_HEIGHT ? "auto" : "hidden";
  };

  return (
    <Dialog defaultOpen={true} onOpenChange={() => navigate(-1)}>
      <DialogContent showCloseButton={true}>
        <div className={"flex gap-3 pt-5"}>
          <Avatar className={"size-10"}>
            <AvatarImage src={""} alt="user" />
            <AvatarFallback />
          </Avatar>
          <textarea
            rows={1}
            ref={textareaRef}
            onChange={handleResizeHeight}
            className={"w-full resize-none focus:outline-none"}
          />
        </div>
        <DialogFooter className="border-t pt-5">
          <div className={"flex w-full justify-between"}>
            <Button variant={"ghost"} className={"size-10 rounded-full"}>
              <RiImage2Line className={"text-primary size-6"} />
            </Button>
            <Button className={"rounded-full font-bold"}>게시하기</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
