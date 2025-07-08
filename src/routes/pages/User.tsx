import { useEffect, useState } from "react";
import axios from "axios";
import type { UserProfile } from "@/types/User.ts";
import { useForm } from "react-hook-form";
import ProfileSection from "@/components/user/ProfileSection.tsx";
import RegionSettings from "@/components/user/RegionSettings.tsx";

type FormData = {
  nickname: string;
  bio: string;
  location: string;
};

export default function UserPage() {
  const [isEditState, setIsEditState] = useState({
    nickname: false,
    bio: false,
    location: false,
  });
  const [user, setUser] = useState<UserProfile>();
  const form = useForm<FormData>();
  const { setValue } = form;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/users/me");
        const data: UserProfile = res.data;
        setUser(data);
        setValue("nickname", data.user_nickname);
        setValue("bio", data.user_bio);
      } catch (e) {
        console.error(e);
      }
    };
    fetchUser();
  }, [setValue]);

  return (
    <>
      {/* 상단 헤더 */}
      <div
        className={
          "sticky top-0 z-10 flex h-[50px] shrink-0 items-center justify-between border-b px-5"
        }
      >
        <p className={"text-xl font-bold"}>마이페이지</p>
      </div>
      {user && (
        <div className={"flex flex-col gap-10 divide-y px-5 pt-10 pb-15"}>
          {/* 프로필 */}
          <ProfileSection
            user={user}
            setUser={setUser}
            isEditState={isEditState}
            setIsEditState={setIsEditState}
            form={form}
          />

          {/* 그외 정보 */}
          <RegionSettings
            user={user}
            isEditState={isEditState}
            setIsEditState={setIsEditState}
            form={form}
            setUser={setUser}
          />
        </div>
      )}
    </>
  );
}
