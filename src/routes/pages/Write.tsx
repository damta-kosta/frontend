import { useNavigate } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useRef } from "react";
import { RiCloseCircleLine, RiImage2Line } from "react-icons/ri";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import axios, { type AxiosError } from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input.tsx";
import { convertToBase64 } from "@/lib/convertToBase64.ts";

type FormData = {
  content: string;
  imageBase64: string;
};

export default function WritePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: { content: "", imageBase64: "" },
  });

  const thumbnail = watch("imageBase64");

  const handleFileInput = () => {
    fileInputRef.current?.click(); // input 클릭 트리거
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post("/api/community/write", data);
      toast.success("게시글이 등록되었습니다.");
      navigate("/");
      window.location.reload();
    } catch (e) {
      const err = e as AxiosError<{ error: string }>;
      toast.error(err.response?.data.error || "알 수 없는 오류입니다.");
    }
  });

  return (
    <Dialog defaultOpen={true} onOpenChange={() => navigate(-1)}>
      <DialogContent showCloseButton={true}>
        <form onSubmit={onSubmit}>
          <div className={"flex gap-3 pt-5"}>
            <Avatar className={"size-10"}>
              <AvatarImage src={""} alt="user" />
              <AvatarFallback />
            </Avatar>
            <div className={"flex w-full flex-col gap-3"}>
              <textarea
                {...register("content")}
                rows={8}
                className={"w-full resize-none focus:outline-none"}
              />
              <div className={"grid grid-cols-4 pb-3"}>
                {thumbnail && (
                  <div className={"relative"}>
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      className={"absolute right-0 size-1/3 rounded-full"}
                      onClick={() => setValue("imageBase64", "")}
                    >
                      <RiCloseCircleLine className={"size-3/4 text-black/50"} />
                    </Button>
                    <img
                      src={thumbnail}
                      alt="미리보기"
                      className="col-span-1 aspect-square w-full rounded border object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter className="border-t pt-5">
            <div className={"flex w-full justify-between"}>
              <Button
                variant={"ghost"}
                type={"button"}
                className={"size-10 rounded-full"}
                onClick={handleFileInput}
              >
                <RiImage2Line className={"text-primary size-6"} />
              </Button>
              <Input
                type={"file"}
                ref={fileInputRef}
                accept={".png, .jpg, .webp, .jpeg"}
                className={"hidden"}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const base64 = await convertToBase64(file);
                    setValue("imageBase64", base64);
                  }
                }}
              />
              <Button type={"submit"} className={"rounded-full font-bold"}>
                게시하기
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
