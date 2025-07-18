import { Link, NavLink, useLocation } from "react-router";
import { cn } from "../lib/utils.ts";
import {
  RiGroupFill,
  RiGroupLine,
  RiHome3Fill,
  RiHome3Line,
  RiLoginBoxLine,
  RiLogoutBoxLine,
  RiMessage3Fill,
  RiMessage3Line,
  RiSettings4Fill,
  RiSettings4Line,
  RiUser3Fill,
  RiUser3Line,
} from "react-icons/ri";
import LogoIcon from "@/assets/icon.svg?react";
import style from "@/styles/LeftSideBar.module.css";
import { LuPencil } from "react-icons/lu";
import { useAuthStore } from "@/stores/useAuthStore.ts";
import { useLogout } from "@/hooks/useLogout.ts";

const navigations = [
  {
    to: "/",
    label: "홈",
    icon: RiHome3Line,
    iconActive: RiHome3Fill,
    private: false,
  },
  {
    to: "/group",
    label: "모임 리스트",
    icon: RiGroupLine,
    iconActive: RiGroupFill,
    private: false,
  },
  {
    to: "/chat",
    label: "채팅",
    icon: RiMessage3Line,
    iconActive: RiMessage3Fill,
    private: true,
  },
  {
    to: "/user",
    label: "마이페이지",
    icon: RiUser3Line,
    iconActive: RiUser3Fill,
    private: true,
  },
  {
    to: "/setting",
    label: "설정",
    icon: RiSettings4Line,
    iconActive: RiSettings4Fill,
    private: false,
  },
];

export default function LeftSideBar() {
  const location = useLocation();
  const handleLogout = useLogout();
  const { isLoggedIn } = useAuthStore();

  return (
    <div
      className={`${style.nodrag} sticky top-0 col-span-1 h-screen border-r p-1 sm:p-5`}
    >
      <nav className={"flex h-full flex-col gap-1 text-lg"}>
        {/* 로고 */}
        <Link to={"/"} className={"text-primary pb-3"}>
          <button
            className={
              "hover:bg-primary/10 hover:text-primary flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 xl:justify-start"
            }
          >
            <LogoIcon className="size-8" />
            <span
              className={`text-foreground ${style.logo} hidden text-2xl font-bold tracking-widest xl:block`}
            >
              DAMTA
            </span>
          </button>
        </Link>

        <div className={"flex h-full flex-col justify-between"}>
          <div className={"flex flex-col gap-1"}>
            {navigations
              .filter((item) => {
                return item.private ? isLoggedIn : true;
              })
              .map((nav) => (
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
                        <span className={"hidden xl:block"}>{nav.label}</span>
                      </>
                    );
                  }}
                </NavLink>
              ))}
            {isLoggedIn && (
              <NavLink
                to={"/write"}
                state={{ background: location }}
                className={
                  "bg-primary text-background mt-2 flex items-center justify-center gap-3 rounded-full px-5 py-3 text-start"
                }
              >
                <LuPencil className={"size-6"} />
                <span className={"hidden font-bold xl:block"}>글쓰기</span>
              </NavLink>
            )}
          </div>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className={
                "hover:bg-primary/10 flex items-center justify-center gap-3 rounded-full px-5 py-3 text-start hover:font-bold xl:justify-start"
              }
            >
              <RiLogoutBoxLine className="size-7" />
              <span className={"hidden xl:block"}>로그아웃</span>
            </button>
          ) : (
            <NavLink
              to={"/login"}
              state={{ background: location }}
              className={
                "hover:bg-primary/10 flex items-center justify-center gap-3 rounded-full px-5 py-3 text-start hover:font-bold xl:justify-start"
              }
            >
              <RiLoginBoxLine className="size-7" />
              <span className={"hidden xl:block"}>로그인</span>
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
}
