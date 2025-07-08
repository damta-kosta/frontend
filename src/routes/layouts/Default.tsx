import { Outlet } from "react-router";
import LeftSideBar from "@/components/LeftSideBar.tsx";
import { useEffect } from "react";
import type { User } from "@/types/User.ts";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useAuthStore } from "@/stores/useAuthStore.ts";

export default function DefaultLayout() {
  const [cookies] = useCookies(["token"]);
  const { login, isLoggedIn } = useAuthStore();

  useEffect(() => {
    const token = cookies.token;
    const fetchLogin = async () => {
      try {
        const data: User = await axios
          .get("/api/users/me")
          .then((res) => res.data);
        login(data);
      } catch (e) {
        console.error(e);
      }
    };

    if (!isLoggedIn && token != null) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchLogin();
    }
  }, []);

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
