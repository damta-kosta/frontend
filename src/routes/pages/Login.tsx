import { useNavigate } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <>
      <Dialog defaultOpen={true} onOpenChange={() => navigate(-1)}>
        <DialogContent showCloseButton={true}>
          <DialogHeader>
            <DialogTitle className={"text-center text-2xl"}>로그인</DialogTitle>
          </DialogHeader>

          <div className={"flex flex-col items-center gap-7"}>
            <div
              className={"flex flex-col items-center gap-3 py-3 text-center"}
            >
              <img src={"src/assets/lock.png"} alt="lock" className={"h-40"} />
              <p className={"text-lg"}>
                회원가입 없이
                <br /> 카카오 계정으로 바로 시작하세요
              </p>
            </div>

            {/* 로그인 버튼 */}
            <Button
              className={
                "w-full max-w-[240px] rounded-lg py-6 text-lg text-black"
              }
              style={{ background: "#FEE500" }}
            >
              <img
                src={"src/assets/kakao.svg"}
                alt="kakao"
                className={"h-[20px]"}
              />
              카카오 로그인
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
