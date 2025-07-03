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
  room_scheduled: string;
  created_at: string;
  thumbnailBase64: string | null;
  participant_profiles: Participant[];
  participant_count: number;
  max_participants: number;
  host_nickname: string;
};

export type RoomListResponse = {
  rooms: RoomListItem[];
  hasNext: boolean;
  nextCursor: string | null;
};

// 모임 상세 정보
export type RoomListDetail = {
  room_id: string;
  title: string;
  description: string;
  room_scheduled: string;
  created_at: string;
  thumbnailBase64: string | null;
  participants: Participant[];
  participant_count: number;
  max_participants: number;
  host_nickname: string;
};
