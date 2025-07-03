// 자유게시판
export type CommunityItem = {
  community_id: string;
  community_title: string | null;
  content: string;
  imagebase64: string;
  writer_nickname: string;
  create_at: string;
};

export type CommunityResponse = {
  community: CommunityItem[];
  hasNext: boolean;
  nextCursor: string | Date | null;
};

// 상세 조회
export type Post = {
  community_id: string;
  community_title: string;
  content: string;
  imagebase64: string;
  writer_nickname: string;
  writer_profile_img: string;
  create_at: string;
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
