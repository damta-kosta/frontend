import { Link, useSearchParams } from "react-router";
import { cn } from "@/lib/utils.ts";
import { useEffect } from "react";

export default function SortTabs() {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");
  const isLatest = sort === "latest" || !sort;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // 부드럽게 스크롤
  }, [sort]);

  return (
    <div className={"relative grid h-[50px] grid-cols-2 font-bold"}>
      <Link
        to="?sort=latest"
        className="flex h-full w-full flex-col items-center justify-center hover:bg-neutral-400/10"
      >
        <p className={cn({ "text-neutral-400": !isLatest })}>최신순</p>
        <div
          className={cn(
            "bg-primary absolute bottom-0 h-1 w-1/2 rounded-full opacity-0",
            { "opacity-100": isLatest },
          )}
        />
      </Link>
      <Link
        to="?sort=scheduled"
        className="flex h-full w-full flex-col items-center justify-center hover:bg-neutral-400/10"
      >
        <p className={cn({ "text-neutral-400": isLatest })}>마감순</p>
        <div
          className={cn(
            "bg-primary absolute bottom-0 h-1 w-1/2 rounded-full opacity-0",
            { "opacity-100": !isLatest },
          )}
        />
      </Link>
    </div>
  );
}
