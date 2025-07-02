export type JWTToken = {
  accessToken: string;
  user: {
    user_id: string;
    provider: string;
    social_id: string;
    user_name: string;
    user_nickname: string | null;
    user_profile_img: string;
    user_role: string;
    join_state: number;
    location: string | null;
    created_at: string | Date;
    updated_at: string | Date;
    deleted: boolean;
    emblem_id: string | null;
    like_temp: number;
    user_bio: string;
  };
};
