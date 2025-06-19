import { Route, Routes, useLocation } from "react-router";
import DefaultLayout from "./layouts/Default.tsx";
import ChatListPage from "./pages/ChatList.tsx";
import HomePage from "./pages/Home.tsx";
import LoginPage from "./pages/Login.tsx";
import RoomPage from "./pages/Room.tsx";
import UserPage from "./pages/User.tsx";
import ContentSidebarLayout from "./layouts/ContentSidebar.tsx";
import { ThemeProvider } from "../components/ThemeProvider.tsx";
import PrivateRoute from "../components/PrivateRoute.tsx";
import PostPage from "./pages/Post.tsx";
import NotFoundPage from "@/routes/pages/NotFound.tsx";
import SettingPage from "@/routes/pages/Setting.tsx";
import RoomCreate from "@/routes/pages/RoomCreate.tsx";
import ChatDetailPage from "@/routes/pages/ChatDetail.tsx";

export default function App() {
  const location = useLocation();
  const state = location.state as { background?: Location };
  const background = state?.background;

  return (
    <ThemeProvider defaultTheme={"system"} storageKey={"vite-ui-theme"}>
      <Routes location={background || location}>
        <Route path={"/"} element={<DefaultLayout />}>
          <Route
            path={"chat"}
            element={
              <PrivateRoute>
                <ChatListPage />
              </PrivateRoute>
            }
          >
            <Route path={":chatId"} element={<ChatDetailPage />} />
          </Route>
          <Route element={<ContentSidebarLayout />}>
            {/* 홈 */}
            <Route index={true} element={<HomePage />} />
            {/* 게시글 조회 */}
            <Route path={"post/:postId"} element={<PostPage />} />
            {/* 모임 리스트 */}
            <Route path={"room"} element={<RoomPage />} />
            {/* 모임 생성 */}
            <Route
              path={"room/create"}
              element={
                <PrivateRoute>
                  <RoomCreate />
                </PrivateRoute>
              }
            />
            {/*  마이 페이지 */}
            <Route
              path={"user"}
              element={
                <PrivateRoute>
                  <UserPage />
                </PrivateRoute>
              }
            />
            {/*  설정 */}
            <Route path={"setting"} element={<SettingPage />} />
          </Route>
          {/* 404 Not Found */}
          <Route path={"*"} element={<NotFoundPage />} />
        </Route>
      </Routes>

      {/* 로그인 모달 */}
      {background && (
        <Routes>
          <Route path={"/login"} element={<LoginPage />} />
        </Routes>
      )}
    </ThemeProvider>
  );
}
