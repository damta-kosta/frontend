// 참가자
export type Participant = {
  user_id: string;
  user_nickname?: string;
  user_profile_img: string;
  is_host?: boolean;
};

// 모임 리스트
export type RoomListItem = {
  room_id: string;
  title: string;
  description: string;
  room_scheduled: string | Date;
  created_at: string | Date;
  thumbnailBase64: string | null;
  participant_profiles: Participant[];
  participant_count: number;
  max_participants: number;
  host_nickname: string;
};

export type RoomListResponse = {
  rooms: RoomListItem[];
  hasNext: boolean;
  nextCursor: string | Date | null;
};
