import { Link } from "react-router";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar.tsx";
import { RiChat3Line } from "react-icons/ri";

const postData = [
  { user: "사람이름1", content: "내용", reply: 1 },
  { user: "사람이름2", content: "내용", reply: 2 },
  { user: "사람이름3", content: "내용", reply: 3 },
  { user: "사람이름4", content: "내용", reply: 4 },
  { user: "사람이름5", content: "내용", reply: 6 },
  { user: "사람이름6", content: "내용", reply: 7 },
];

export default function HomePage() {
  const { ref, inView } = useInView({ threshold: 0.5, delay: 500 });

  // 무한 스크롤 감지
  useEffect(() => {
    if (inView) {
      //   함수 실행
    }
  }, [inView]);

  return (
    <>
      <div className={"flex flex-col gap-4 p-5"}>
        {/* 캐러셀 */}
        <div className={"bg-primary/30 h-72 shrink-0 rounded-xl p-5"}>
          캐러셀 영역
        </div>

        {/* 피드 */}
        {postData.map((item, index) => (
          <Link
            to={`/post/${index}`}
            state={{ from: location.pathname }}
            className={
              "flex cursor-pointer gap-3 rounded-xl border p-5 hover:bg-neutral-400/10"
            }
          >
            <div>
              <Avatar className={"size-10"}>
                <div
                  className={
                    "absolute inset-0 cursor-pointer bg-neutral-800/20 opacity-0 transition-opacity duration-200 hover:opacity-100"
                  }
                ></div>
                <AvatarImage
                  src={"https://github.com/shadcn.png"}
                  alt="@shadcn"
                />
              </Avatar>
            </div>
            <div className={"flex w-full flex-col gap-1"}>
              <p className={"cursor-pointer font-bold"}>{item.user}</p>
              <p>{item.content}</p>
              <p className={"flex items-center gap-1 text-neutral-500"}>
                <RiChat3Line /> {item.reply}
              </p>
            </div>
          </Link>
        ))}

        {/* 무한 스크롤 감지 */}
        <div className={"bg-primary h-20 w-full touch-none"} ref={ref}></div>
      </div>
    </>
  );
}
