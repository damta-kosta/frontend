import { Outlet } from "react-router";
import LeftSideBar from "@/components/LeftSideBar.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";

export default function DefaultLayout() {
  return (
    <>
      <div className={"container grid max-h-screen grid-cols-5 justify-center"}>
        <LeftSideBar />
        <div className={"col-span-4 flex"}>
          <Outlet />
        </div>
        <Toaster richColors position={"bottom-center"} />
      </div>
    </>
  );
}
