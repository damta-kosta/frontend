import { Outlet } from "react-router";
import RightSideBar from "../../components/RightSideBar.tsx";

export default function ContentSidebarLayout() {
  return (
    <>
      <div className={"grid h-screen w-full grid-cols-3"}>
        <div
          className={
            "col-span-full flex flex-col overflow-y-auto border-r lg:col-span-2"
          }
        >
          <Outlet />
        </div>

        <RightSideBar />
      </div>
    </>
  );
}
