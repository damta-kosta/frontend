import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore.ts";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["token"]);
  const { login, isLoggedIn } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = new URLSearchParams(window.location.search).get("token");

        if (token) {
          setCookie("token", token, {
            maxAge: 60 * 60 * 24 * 3,
            sameSite: "lax",
          });
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          await axios.get("/api/users/me").then((res) => login(res.data));
        }

        navigate("/", { replace: true });
      } catch (err) {
        console.error(err);
        navigate("/login", { replace: true });
      }
    };

    if (!isLoggedIn) {
      fetchUser();
    }
  }, []);

  return <></>;
}
