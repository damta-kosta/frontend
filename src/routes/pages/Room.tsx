import { Link } from "react-router";
import { RiUserAddLine } from "react-icons/ri";
import SortTabs from "@/components/room/SortTabs.tsx";
import Room from "@/components/room/Room.tsx";
import { Button } from "@/components/ui/button.tsx";

export default function RoomPage() {
  return (
    <>
      <div className={"bg-background sticky top-0 z-10 flex flex-col border-b"}>
        <div
          className={"flex h-[50px] w-full items-center justify-between px-5"}
        >
          <p className={"text-xl font-bold"}>모임 리스트</p>
          <Link to={"/room/create"}>
            <Button variant={"ghost"} size={"icon"} className={"rounded-full"}>
              <RiUserAddLine className={"size-6"} />
            </Button>
          </Link>
        </div>
        <SortTabs />
      </div>
      <div className={"flex flex-col gap-5 px-5 py-10"}>
        <Room />
        <Room />
        <Room />
      </div>
    </>
  );
}
