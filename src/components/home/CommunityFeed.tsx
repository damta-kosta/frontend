import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Link } from "react-router";
import type { CommunityItem } from "@/types/Community.ts";
import { formatTweetTime } from "@/lib/formatTweetTime.ts";
import { cn } from "@/lib/utils.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { RiLink, RiMoreFill } from "react-icons/ri";

type Props = {
  post: CommunityItem;
};

export default function CommunityFeed({ post }: Props) {
  const handleCopyLink = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(
      `${window.location.href}post/${post.community_id}`,
    );
  };

  return (
    <Link
      key={post.community_id}
      to={`/post/${post.community_id}`}
      state={{ from: location.pathname }}
      className={
        "flex cursor-pointer justify-between gap-3 rounded-xl border p-5 hover:bg-neutral-400/10"
      }
    >
      <div className="flex gap-3">
        <Avatar className={"size-10"}>
          <div
            className={
              "absolute inset-0 cursor-pointer bg-neutral-800/20 opacity-0 transition-opacity duration-200 hover:opacity-100"
            }
          />
          <AvatarImage src={post.imagebase64} alt="user_profile_img" />
          <AvatarFallback />
        </Avatar>
        <div className={"flex w-full flex-col gap-1"}>
          <p className={"cursor-pointer font-bold"}>
            {post.writer_nickname}
            <span className={"text-foreground/40 pl-2 font-medium"}>
              {formatTweetTime(post.create_at)}
            </span>
          </p>
          <p className={"line-clamp-[8]"}>{post.content}</p>
          {post.imagebase64.length > 10 && (
            <div className="relative aspect-5/3 w-full overflow-hidden rounded-lg">
              <img
                src={post.imagebase64}
                alt="img"
                className={cn(
                  "h-40 w-full object-cover transition-opacity duration-300",
                )}
              />
            </div>
          )}
        </div>
      </div>

      {/* 드랍다운 메뉴 */}
      <DropdownMenu>
        <DropdownMenuTrigger
          className={"h-fit rounded-full p-1.5 hover:bg-neutral-400/20"}
        >
          <RiMoreFill className={"text-foreground/50"} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className={"flex justify-between"}
            onClick={handleCopyLink}
          >
            <span>링크복사</span>
            <RiLink />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Link>
  );
}
