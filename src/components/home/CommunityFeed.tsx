import { Avatar, AvatarImage } from "@/components/ui/avatar.tsx";
import { Link } from "react-router";
import type { CommunityItem } from "@/types/Community.ts";

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
          ></div>
          <AvatarImage
            src={
              post.imagebase64.length > 1
                ? post.imagebase64
                : "https://github.com/shadcn.png"
            }
            alt="user_profile_img"
          />
        </Avatar>
      </div>
      <div className={"flex w-full flex-col gap-1"}>
        <p className={"cursor-pointer font-bold"}>{post.writer_nickname}</p>
        <p>{post.content}</p>
      </div>
    </Link>
  );
}
