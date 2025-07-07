import { create } from "zustand/react";

type User = {
  user_id: string;
  provider: string;
  social_id: string;
  user_name: string;
  user_nickname: string | null;
  user_profile_img: string;
  user_role: string;
  join_state: number;
  location: string | null;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  emblem_id: string | null;
  like_temp: number;
  user_bio: string;
};

type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  login: (user: User) => set(() => ({ user: user, isLoggedIn: true })),
  logout: () => set(() => ({ user: null, isLoggedIn: false })),
}));
