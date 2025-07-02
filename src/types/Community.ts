// 자유게시판
export type CommunityItem = {
  community_id: string;
  community_title: string | null;
  content: string;
  imagebase64: string;
  writer_nickname: string;
  create_at: string | Date;
};

export type CommunityResponse = {
  community: CommunityItem[];
  hasNext: boolean;
  nextCursor: string | Date | null;
};

// 댓글
export type CommentItem = {
  comment_id: string;
  user_id: string;
  comment_body: string;
  reply: CommentItem | null;
  create_at: string | Date;
  deleted: boolean;
  user_nickname: string;
  user_profile_img: string;
};

export type CommentResponse = {
  comments: CommentItem[];
  hasNext: boolean;
  nextCursor: string | Date | null;
};
