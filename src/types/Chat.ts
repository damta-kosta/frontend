export type ChatMyRoom = {
  room_id: string;
  room_title: string;
  room_scheduled: string;
  room_thumbnail_img: string;
  deleted: boolean;
  is_host: boolean;
};

export type ChatInfo = {
  chat_id: string;
  room_id: string;
  user_id: string;
  chat_msg: string;
  created_at: string;
  user_nickname: string;
  user_profile_img: string;
};

export type ChatAllInfo = {
  room_id: string;
  chat: ChatInfo[];
};
