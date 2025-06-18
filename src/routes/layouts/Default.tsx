import { Outlet } from "react-router";
import LeftSideBar from "@/components/LeftSideBar.tsx";

export default function DefaultLayout() {
  return (
    <>
      <div className={"container grid max-h-screen grid-cols-5 justify-center"}>
        <LeftSideBar />
        <div className={"col-span-4 flex"}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
