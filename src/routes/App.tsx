import { Route, Routes, useLocation } from "react-router";
import DefaultLayout from "./layouts/Default.tsx";
import ChatListPage from "./pages/ChatList.tsx";
import HomePage from "./pages/Home.tsx";
import LoginPage from "./pages/Login.tsx";
import UserPage from "./pages/User.tsx";
import ContentSidebarLayout from "./layouts/ContentSidebar.tsx";
import { ThemeProvider } from "../components/ThemeProvider.tsx";
import PrivateRoute from "../components/PrivateRoute.tsx";
import PostPage from "./pages/Post.tsx";
import NotFoundPage from "@/routes/pages/NotFound.tsx";
import SettingPage from "@/routes/pages/Setting.tsx";
import GroupCreate from "@/routes/pages/GroupCreate.tsx";
import ChatDetailPage from "@/routes/pages/ChatDetail.tsx";
import GroupPage from "@/routes/pages/GroupList.tsx";
import GroupDetailPage from "@/routes/pages/GroupDetail.tsx";

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
            <Route path={"group"} element={<GroupPage />} />
            {/* 모임 조회 */}
            <Route path={"group/:groupId"} element={<GroupDetailPage />} />
            {/* 모임 생성 */}
            <Route
              path={"group/create"}
              element={
                <PrivateRoute>
                  <GroupCreate />
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
