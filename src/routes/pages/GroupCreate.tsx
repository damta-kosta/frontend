import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar.tsx";
import { useForm } from "react-hook-form";
import { convertToBase64 } from "@/lib/convertToBase64.ts";
import axios from "axios";
import { toast } from "sonner";

type FormData = {
  title: string;
  description: string;
  room_scheduled: Date;
  thumbnailBase64: string | null;
};

export default function GroupCreate() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("");
  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      room_scheduled: new Date(),
      thumbnailBase64: null,
    },
  });
  const thumbnail = watch("thumbnailBase64");

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
      await axios.post("/api/rooms", data);
      toast.success("모임이 성공적으로 생성되었습니다!");
      navigate("/group"); // 예: 생성 후 이동
    } catch (error) {
      console.error("모임 생성 실패:", error);
      toast.error("모임 생성에 실패했습니다.");
    }
  });

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
            size={"icon"}
            className={"rounded-full"}
            onClick={() => navigate(-1)}
          >
            <RiArrowLeftLine className={"size-6"} />
          </Button>
          <Button size={"sm"} type={"submit"} className={"rounded-full px-5"}>
            결정
          </Button>
        </div>

        {/* 모임 생성 폼 */}

        <div className={"flex flex-col gap-15 px-5 pt-10 pb-15"}>
          <div>
            <h1 className={"pb-3 text-2xl font-bold"}>모임 이름</h1>
            <Input {...register("title")} />
          </div>
          <div>
            <h1 className={"pb-3 text-2xl font-bold"}>설명</h1>
            <Textarea
              {...register("description")}
              maxLength={100}
              className={"h-20 resize-none"}
            />
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
                          setValue("room_scheduled", combined);
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
                      setValue("room_scheduled", combined);
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
              {thumbnail && (
                <img
                  src={thumbnail}
                  alt="미리보기"
                  className="w-full rounded border"
                />
              )}
              <Input
                type={"file"}
                accept={".png, .jpg, .webp, .jpeg"}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const base64 = await convertToBase64(file);
                    setValue("thumbnailBase64", base64);
                  }
                }}
                className={"place-self-end"}
              />
            </div>
          </div>
          {/*<div>
          <h1 className={"pb-3 text-2xl font-bold"}>장소</h1>
          <Input />
        </div>*/}
        </div>
      </form>
    </>
  );
}
