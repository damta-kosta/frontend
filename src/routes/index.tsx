import { createBrowserRouter, RouterProvider } from "react-router";
import DefaultLayout from "./layouts/Default.tsx";
import ChatListPage from "./pages/ChatList.tsx";
import HomePage from "./pages/Home.tsx";
import LoginPage from "./pages/Login.tsx";
import SignupPage from "./pages/Signup.tsx";
import RoomPage from "./pages/Room.tsx";
import UserPage from "./pages/User.tsx";
import ContentSidebarLayout from "./layouts/ContentSidebar.tsx";
import { ThemeProvider } from "../components/ThemeProvider.tsx";
import PrivateRoute from "../components/PrivateRoute.tsx";
import PostPage from "./pages/Post.tsx";
import NotFoundPage from "@/routes/pages/NotFound.tsx";
import SettingPage from "@/routes/pages/Setting.tsx";
import RoomCreate from "@/routes/pages/RoomCreate.tsx";
import ChatDetailPage from "@/routes/pages/Chat.tsx";

const router = createBrowserRouter([
  // { path: "/login", element: <LoginPage /> },
  // { path: "/signup", element: <SignupPage /> },
  {
    element: <DefaultLayout />,
    children: [
      // 채팅
      {
        path: "/chat",
        element: (
          <PrivateRoute>
            <ChatListPage />
          </PrivateRoute>
        ),
        children: [{ path: ":chatId", element: <ChatDetailPage /> }],
      },
      {
        element: <ContentSidebarLayout />,
        children: [
          // 홈
          { index: true, element: <HomePage /> },
          // 게시글 조회
          { path: "post/:postId", element: <PostPage /> },
          // 모임 리스트
          { path: "room", element: <RoomPage /> },
          // 모임 생성
          {
            path: "room/create",
            element: (
              <PrivateRoute>
                <RoomCreate />
              </PrivateRoute>
            ),
          },
          // 마이 페이지
          {
            path: "user",
            element: (
              <PrivateRoute>
                <UserPage />
              </PrivateRoute>
            ),
          },
          // 설정
          { path: "setting", element: <SettingPage /> },
        ],
      },
      // 404 페이지
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default function Router() {
  return (
    <ThemeProvider defaultTheme={"system"} storageKey={"vite-ui-theme"}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
