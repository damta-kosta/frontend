export type User = {
  user_id: string;
  user_name: string;
  user_nickname: string;
  user_profile_img: string;
  user_role: string;
  join_state: number;
  location: string;
  user_bio: string;
  like_temp: number;
  emblem: {
    emblem_id: string;
    emblem_name: string;
    emblem_description: string;
  };
};

// 유저가 참여하고 있는 모임
export type UserRooms = {
  room_id: string;
  room_title: string;
  room_scheduled: string | Date;
  room_thumbnail_img: string;
  deleted: boolean;
  is_host: boolean;
}[];
