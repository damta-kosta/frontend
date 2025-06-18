import { Link, NavLink } from "react-router";
import { cn } from "../lib/utils.ts";
import {
  RiGroupFill,
  RiGroupLine,
  RiHome3Fill,
  RiHome3Line,
  RiLoginBoxLine,
  RiMessage3Fill,
  RiMessage3Line,
  RiSettings4Fill,
  RiSettings4Line,
  RiSkull2Fill,
  RiUser3Fill,
  RiUser3Line,
} from "react-icons/ri";

const navigations = [
  { to: "/", label: "홈", icon: RiHome3Line, iconActive: RiHome3Fill },
  {
    to: "/room",
    label: "모임 리스트",
    icon: RiGroupLine,
    iconActive: RiGroupFill,
  },
  {
    to: "/chat",
    label: "채팅",
    icon: RiMessage3Line,
    iconActive: RiMessage3Fill,
  },
  {
    to: "/user",
    label: "마이페이지",
    icon: RiUser3Line,
    iconActive: RiUser3Fill,
  },
  {
    to: "/setting",
    label: "설정",
    icon: RiSettings4Line,
    iconActive: RiSettings4Fill,
  },
];

export default function LeftSideBar() {
  return (
    <div className={"sticky top-0 col-span-1 h-screen border-r p-5"}>
      <nav className={"flex h-full flex-col gap-1 text-lg"}>
        <Link to={"/"} className={"text-primary px-5 pb-4 font-black"}>
          <RiSkull2Fill className={"size-8"} />
        </Link>
        <div className={"flex h-full flex-col justify-between"}>
          <div className={"flex flex-col gap-1"}>
            {navigations.map((nav) => (
              <NavLink
                key={nav.to}
                to={nav.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center justify-center gap-3 rounded-full px-5 py-3 text-start xl:justify-start",
                    isActive
                      ? "bg-primary/10 font-bold"
                      : "hover:bg-primary/10 hover:font-bold",
                  )
                }
              >
                {({ isActive }) => {
                  const Icon = isActive ? nav.iconActive : nav.icon;
                  return (
                    <>
                      <Icon className="size-7" />
                      <span className={"hidden 2xl:block"}>{nav.label}</span>
                    </>
                  );
                }}
              </NavLink>
            ))}
          </div>
          <NavLink
            to={"/login"}
            className={
              "hover:bg-primary/10 flex items-center gap-3 rounded-full px-5 py-3 text-start hover:font-bold"
            }
          >
            <RiLoginBoxLine className="size-7" />
            <span className={"hidden xl:block"}>로그인</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
