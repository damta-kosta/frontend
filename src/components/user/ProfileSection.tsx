import type { UseFormReturn } from "react-hook-form";
import type { UserProfile } from "@/types/User.ts";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import EditableField from "@/components/user/EditableField.tsx";
import axios, { type AxiosError } from "axios";
import { toast } from "sonner";
import { convertToBase64 } from "@/lib/convertToBase64.ts";
import { Input } from "@/components/ui/input.tsx";
import { useRef } from "react";

type Props = {
  user: UserProfile;
  isEditState: { nickname: boolean; bio: boolean; location: boolean };
  setIsEditState: React.Dispatch<
    React.SetStateAction<{ nickname: boolean; bio: boolean; location: boolean }>
  >;
  form: UseFormReturn<{
    nickname: string;
    bio: string;
    location: string;
    profile_img: string;
  }>;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | undefined>>;
};

export default function ProfileSection({
  user,
  isEditState,
  setIsEditState,
  form,
  setUser,
}: Props) {
  const { register, watch, getValues, setValue } = form;

  const thumbnail = watch("profile_img");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileInput = () => {
    fileInputRef.current?.click(); // input 클릭 트리거
  };

  // 닉네임 저장 API 호출
  const saveNickname = async () => {
    const newNickname = getValues("nickname");
    if (newNickname === user.user_nickname) return;

    try {
      await axios.put("/api/users/me/nickname", {
        nickname: newNickname,
      });
      setUser((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          user_nickname: newNickname,
        };
      });
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "알 수 없는 오류입니다.");

      setValue("nickname", user.user_nickname);
    } finally {
      setIsEditState((prev) => ({ ...prev, nickname: false }));
    }
  };

  // bio 저장 API 호출
  const saveBio = async () => {
    const newBio = getValues("bio");
    if (newBio === user.user_bio) return;

    try {
      await axios.put("/api/users/me/user_bio", { user_bio: newBio });
      setUser((prev) => {
        if (!prev) return prev;

        return { ...prev, user_bio: newBio };
      });
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "알 수 없는 오류입니다.");
    } finally {
      setIsEditState((prev) => ({ ...prev, bio: false }));
    }
  };

  // 프로필 이미지 저장 API
  const saveProfileImg = async () => {
    const newProfileImg = getValues("profile_img");
    if (newProfileImg === user.user_profile_img) return;

    try {
      await axios
        .put("/api/users/me/profileImg", {
          user_profile_img: newProfileImg,
        })
        .then(() =>
          setUser((prev) => {
            if (!prev) return prev;
            return { ...prev, user_profile_img: newProfileImg };
          }),
        );
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "알 수 없는 오류입니다.");
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-5 pb-10">
        <div className="flex flex-col gap-2">
          <Avatar className="mb-2 size-28">
            <AvatarImage src={thumbnail || user.user_profile_img} alt="user" />
            <AvatarFallback />
          </Avatar>
          <Button onClick={handleFileInput} className="font-bold">
            이미지 업로드
          </Button>
          <Input
            type={"file"}
            ref={fileInputRef}
            accept={".png, .jpg, .webp, .jpeg"}
            className={"hidden"}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                const base64 = await convertToBase64(file);
                setValue("profile_img", base64);
                saveProfileImg();
              }
            }}
          />
        </div>

        <div className="flex w-full flex-col gap-5">
          <div className="flex gap-2 text-sm">
            <button className="rounded-full border-4 px-4 py-1 font-bold">
              {user.emblem.emblem_name}
            </button>
            <button className="rounded-full border-4 px-4 py-1 font-bold">
              {user.like_temp}
            </button>
          </div>

          <EditableField
            label="이름"
            value={user.user_nickname}
            isEditing={isEditState.nickname}
            onEdit={() =>
              setIsEditState((prev) => ({ ...prev, nickname: true }))
            }
            onCancel={() => {
              setIsEditState((prev) => ({ ...prev, nickname: false }));
              setValue("nickname", user.user_nickname);
            }}
            onSave={saveNickname}
            registerField={register("nickname")}
            disabled={watch("nickname") === user.user_nickname}
          />

          <EditableField
            label="한 줄 소개"
            value={user.user_bio}
            isEditing={isEditState.bio}
            onEdit={() => setIsEditState((prev) => ({ ...prev, bio: true }))}
            onCancel={() => {
              setIsEditState((prev) => ({ ...prev, bio: false }));
              setValue("bio", user.user_bio);
            }}
            onSave={saveBio}
            registerField={register("bio")}
            disabled={watch("bio") === user.user_bio}
          />
        </div>
      </div>
    </div>
  );
}
