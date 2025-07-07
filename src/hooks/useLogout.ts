import { useNavigate } from "react-router";
import { useAuthStore } from "@/stores/useAuthStore.ts";
import axios from "axios";
import { useCookies } from "react-cookie";

export const useLogout = () => {
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["token"]);
  const { logout } = useAuthStore();

  return async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      logout();
      removeCookie("token");
      navigate("/", { replace: true });
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };
};
