import { Navigate } from "react-router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog.tsx";
import { useState } from "react";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = true;
  const [homeRedirect, setHomeRedirect] = useState(false);
  const [loginRedirect, setLoginRedirect] = useState(false);

  if (!isAuth) {
    if (homeRedirect) {
      return <Navigate to="/" replace />;
    } else if (loginRedirect) {
      return <Navigate to="/login" replace />;
    }

    return (
      <AlertDialog open>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>로그인이 필요합니다</AlertDialogTitle>
            <AlertDialogDescription>
              이 페이지에 접근하려면 로그인이 필요합니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setHomeRedirect(true)}>
              홈으로
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => setLoginRedirect(true)}>
              로그인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return <>{children}</>;
}
