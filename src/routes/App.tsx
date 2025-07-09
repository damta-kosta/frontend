import { type Location, Route, Routes, useLocation } from "react-router";
import DefaultLayout from "@/routes/layouts/Default.tsx";
import ChatListPage from "@/routes/pages/ChatList.tsx";
import HomePage from "@/routes/pages/Home.tsx";
import LoginPage from "@/routes/pages/Login.tsx";
import UserPage from "@/routes/pages/User.tsx";
import ContentSidebarLayout from "@/routes/layouts/ContentSidebar.tsx";
import { ThemeProvider } from "@/components/ThemeProvider.tsx";
import PrivateRoute from "@/components/PrivateRoute.tsx";
import PostPage from "@/routes/pages/Post.tsx";
import NotFoundPage from "@/routes/pages/NotFound.tsx";
import SettingPage from "@/routes/pages/Setting.tsx";
import GroupCreate from "@/routes/pages/GroupCreate.tsx";
import ChatDetailPage from "@/routes/pages/ChatDetail.tsx";
import GroupPage from "@/routes/pages/GroupList.tsx";
import GroupDetailPage from "@/routes/pages/GroupDetail.tsx";
import dayjs from "dayjs";
import "dayjs/locale/ko.js";
import relativeTime from "dayjs/plugin/relativeTime";
import WritePage from "@/routes/pages/Write.tsx";
import AuthCallback from "@/routes/pages/AuthCallback.tsx";
import GroupEdit from "@/routes/pages/GroupEdit.tsx";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function App() {
  const location = useLocation();
  const state = location.state as { background?: Location };
  const background = state?.background;

  const isModalPath =
    location.pathname === "/login" || location.pathname === "/write";

  const fallbackBackground: Location = {
    pathname: "/",
    search: "",
    hash: "",
    state: null,
    key: "fallback-home",
  };

  const effectiveBackground =
    background || (isModalPath ? fallbackBackground : undefined);

  return (
    <ThemeProvider defaultTheme={"system"} storageKey={"vite-ui-theme"}>
      <Routes location={effectiveBackground || location}>
        {/* 카카오 로그인 콜백 */}
        <Route path={"/auth/kakao/callback"} element={<AuthCallback />} />

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
            {/* 모임 수정 */}
            <Route
              path={"group/edit/:groupId"}
              element={
                <PrivateRoute>
                  <GroupEdit />
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

      {effectiveBackground && (
        <Routes>
          {/* 로그인 모달 */}
          <Route path={"/login"} element={<LoginPage />} />
          {/* 글쓰기 모달 */}
          <Route
            path={"/write"}
            element={
              <PrivateRoute>
                <WritePage />
              </PrivateRoute>
            }
          />
        </Routes>
      )}
    </ThemeProvider>
  );
}
