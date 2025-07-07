import { Outlet } from "react-router";
import RightSideBar from "@/components/RightSideBar.tsx";
import ScrollControl from "@/components/ScrollControl.tsx";

export default function ContentSidebarLayout() {
  return (
    <>
      <ScrollControl />
      <div className={"grid h-screen w-full grid-cols-3"}>
        <div
          id="main-scroll-container"
          className={
            "relative col-span-3 flex flex-col overflow-y-auto border-r xl:col-span-2"
          }
        >
          <Outlet />
        </div>

        <div className={"hidden xl:block"}>
          <RightSideBar />
        </div>
      </div>
    </>
  );
}
