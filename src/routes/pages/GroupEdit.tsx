import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar.tsx";
import { useForm } from "react-hook-form";
import { convertToBase64 } from "@/lib/convertToBase64.ts";
import axios from "axios";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import type { RoomListDetail } from "@/types/Room.ts";

type FormData = {
  roomTitle: string;
  roomDescription: string;
  roomScheduled: Date;
  roomThumbnailImg: string | null;
  maxParticipants: number;
};

export default function GroupEdit() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const thumbnail = watch("roomThumbnailImg");

  const combineDateTime = (date: Date, time: string) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    const combined = new Date(date);
    combined.setHours(hours);
    combined.setMinutes(minutes);
    combined.setSeconds(seconds || 0);
    return combined;
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.patch(`/api/rooms/${groupId}/modify`, data);
      toast.success("모임이 성공적으로 수정되었습니다!");
      navigate(`/group/${groupId}`, { replace: true });
    } catch (error) {
      console.error("모임 수정 실패:", error);
      toast.error("모임 수정에 실패했습니다.");
    }
  });

  useEffect(() => {
    const fetchGroupDetail = async () => {
      const data: RoomListDetail = await axios
        .get(`/api/roomList/rooms/${groupId}`)
        .then((res) => res.data);

      const scheduledDate = new Date(data.room_scheduled);

      setValue("roomTitle", data.title);
      setValue("roomDescription", data.description);
      setValue("roomThumbnailImg", data.thumbnailBase64);
      setValue("roomScheduled", scheduledDate);
      setValue("maxParticipants", data.max_participants);

      // 🔽 날짜/시간 분해해서 상태 세팅
      setDate(scheduledDate);

      const hours = String(scheduledDate.getHours()).padStart(2, "0");
      const minutes = String(scheduledDate.getMinutes()).padStart(2, "0");
      const seconds = String(scheduledDate.getSeconds()).padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    fetchGroupDetail();
  }, [groupId]);

  return (
    <>
      <form onSubmit={onSubmit}>
        {/* 상단 헤더 */}
        <div
          className={
            "bg-background sticky top-0 z-10 flex h-[50px] shrink-0 items-center justify-between border-b px-4"
          }
        >
          <Button
            variant={"ghost"}
            type={"button"}
            size={"icon"}
            className={"rounded-full"}
            onClick={() => navigate(-1)}
          >
            <RiArrowLeftLine className={"size-6"} />
          </Button>
          <Button size={"sm"} type={"submit"} className={"rounded-full px-5"}>
            수정하기
          </Button>
        </div>

        {/* 모임 생성 폼 */}

        <div className={"flex flex-col gap-15 px-5 pt-10 pb-15"}>
          <div>
            <h1 className={"pb-3 text-2xl font-bold"}>모임 이름</h1>
            <Input
              {...register("roomTitle", {
                required: "모임 이름을 입력해주세요",
              })}
              aria-invalid={errors.roomTitle ? "true" : "false"}
            />
            {errors.roomTitle?.type === "required" && (
              <p role="alert" className={"text-destructive pt-2 text-sm"}>
                {errors.roomTitle.message}
              </p>
            )}
          </div>
          <div>
            <h1 className={"pb-3 text-2xl font-bold"}>설명</h1>
            <Textarea
              {...register("roomDescription", {
                required: "모임 설명을 입력해주세요",
              })}
              aria-invalid={errors.roomDescription ? "true" : "false"}
              maxLength={100}
              className={"h-24 resize-none"}
            />
            {errors.roomDescription?.type === "required" && (
              <p role="alert" className={"text-destructive pt-2 text-sm"}>
                {errors.roomDescription.message}
              </p>
            )}
          </div>
          <div>
            <h1 className={"pb-3 text-2xl font-bold"}>모임 일정</h1>
            <div className={"flex gap-5"}>
              {/* 날짜 */}
              <div className="flex flex-col gap-3">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date-picker"
                      className="w-[240px] justify-between font-normal"
                    >
                      {date ? date.toLocaleDateString() : "날짜 선택"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        if (selectedDate && time) {
                          const combined = combineDateTime(selectedDate, time);
                          setValue("roomScheduled", combined);
                        }
                        setOpen(false);
                      }}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {/*  시간 */}
              <div className="flex flex-col gap-3">
                <Input
                  type="time"
                  id="time-picker"
                  step="1"
                  value={time}
                  onChange={(e) => {
                    const newTime = e.target.value;
                    setTime(newTime);
                    if (date) {
                      const combined = combineDateTime(date, newTime);
                      setValue("roomScheduled", combined);
                    }
                  }}
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </div>
            </div>
          </div>
          <div>
            <h1 className={"pb-3 text-2xl font-bold"}>커버 이미지</h1>
            <div className={"grid grid-cols-1 gap-5 md:grid-cols-2"}>
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt="미리보기"
                  className="aspect-[16/9] w-full rounded border object-cover"
                />
              ) : (
                <Skeleton className={"aspect-[16/9] w-full"} />
              )}
              <Input
                type={"file"}
                accept={".png, .jpg, .webp, .jpeg"}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const base64 = await convertToBase64(file);
                    setValue("roomThumbnailImg", base64);
                  }
                }}
                className={"place-self-end"}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
