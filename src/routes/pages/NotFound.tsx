import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className={"flex w-full flex-col items-center justify-center gap-3"}>
      <p className={"text-7xl font-black"}>404</p>
      <p>요청하신 페이지를 찾을 수 없습니다</p>
      <Link to={"/"}>
        <Button className={"rounded-full"}>홈으로 가기</Button>
      </Link>
    </div>
  );
}
