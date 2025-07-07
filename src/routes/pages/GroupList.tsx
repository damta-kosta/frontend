import { Link, useSearchParams } from "react-router";
import { RiUserAddLine } from "react-icons/ri";
import SortTabs from "@/components/group/SortTabs.tsx";
import Group from "@/components/group/Group.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useEffect, useRef, useState } from "react";
import type { RoomListResponse } from "@/types/Room.ts";
import axios from "axios";

export default function GroupPage() {
  const [searchParams] = useSearchParams();

  const [roomData, setRoomData] = useState<RoomListResponse>({
    rooms: [],
    hasNext: true,
    nextCursor: null,
  });
  const sort = searchParams.get("sort");

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async (isInitial: boolean) => {
      try {
        if (isCancelled) return;

        const data: RoomListResponse = await axios
          .get(
            `/api/roomList/rooms?sort=${sort == "scheduled" ? "scheduled" : "latest"}&limit5`,
          )
          .then((res) => res.data);

        setRoomData((prev) => {
          if (isInitial) return data;
          else {
            return {
              rooms: [...prev.rooms, ...data.rooms],
              hasNext: data.hasNext,
              nextCursor: data.nextCursor,
            };
          }
        });
      } catch (err) {
        console.error("Fetch Error: ", err);
      }
    };

    fetchData(true);

    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }

    return () => {
      isCancelled = true;
    };
  }, [sort]);

  return (
    <>
      <div className={"bg-background sticky top-0 z-10 flex flex-col border-b"}>
        <div
          className={"flex h-[50px] w-full items-center justify-between px-5"}
        >
          <p className={"text-xl font-bold"}>모임 리스트</p>
          <Link to={"/group/create"}>
            <Button variant={"ghost"} size={"icon"} className={"rounded-full"}>
              <RiUserAddLine className={"size-6"} />
            </Button>
          </Link>
        </div>
        <SortTabs />
      </div>
      <div
        ref={scrollRef}
        className={"flex flex-col gap-5 overflow-y-auto px-5 py-10"}
      >
        {roomData?.rooms?.length > 0 &&
          roomData?.rooms?.map((room) => (
            <Group key={room.room_id} room={room} />
          ))}
      </div>
    </>
  );
}
