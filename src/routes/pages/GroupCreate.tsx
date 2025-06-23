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

export default function GroupCreate() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <>
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
          <Input />
        </div>
        <div>
          <h1 className={"pb-3 text-2xl font-bold"}>설명</h1>
          <Textarea maxLength={100} className={"h-20 resize-none"} />
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
                    onSelect={(date) => {
                      setDate(date);
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
                // defaultValue={"10:30:00"}
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>
          </div>
        </div>
        <div>
          <h1 className={"pb-3 text-2xl font-bold"}>커버 이미지</h1>
          <Input
            type={"file"}
            accept={".png, .jpg, .webp"}
            className={"max-w-sm"}
          />
        </div>
        <div>
          <h1 className={"pb-3 text-2xl font-bold"}>장소</h1>
          <Input />
        </div>
      </div>
    </>
  );
}
