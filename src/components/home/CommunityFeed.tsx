import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Link } from "react-router";
import type { CommunityItem } from "@/types/Community.ts";
import { formatTweetTime } from "@/lib/formatTweetTime.ts";
import { cn } from "@/lib/utils.ts";

type Props = {
  post: CommunityItem;
};

export default function CommunityFeed({ post }: Props) {
  return (
    <Link
      key={post.community_id}
      to={`/post/${post.community_id}`}
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
          />
          <AvatarImage src={post.imagebase64} alt="user_profile_img" />
          <AvatarFallback />
        </Avatar>
      </div>
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
    </Link>
  );
}
