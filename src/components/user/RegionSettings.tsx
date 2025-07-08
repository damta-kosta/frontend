import type { UserProfile } from "@/types/User.ts";
import type { UseFormReturn } from "react-hook-form";
import EditableField from "@/components/user/EditableField.tsx";
import axios, { type AxiosError } from "axios";
import { toast } from "sonner";

type Props = {
  user: UserProfile;
  isEditState: { nickname: boolean; bio: boolean; location: boolean };
  setIsEditState: React.Dispatch<
    React.SetStateAction<{ nickname: boolean; bio: boolean; location: boolean }>
  >;
  form: UseFormReturn<{ nickname: string; bio: string; location: string }>;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | undefined>>;
};

export default function RegionSettings({
  form,
  setIsEditState,
  isEditState,
  user,
  setUser,
}: Props) {
  const { register, watch, setValue, getValues } = form;

  // 닉네임 저장 API 호출
  const saveLocation = async () => {
    const newLocation = getValues("location");
    if (newLocation === user.location) return;

    try {
      await axios.post("/api/users/me/location", { nickname: newLocation });
      setUser((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          location: newLocation,
        };
      });
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "알 수 없는 오류입니다.");
    } finally {
      setIsEditState((prev) => ({ ...prev, location: false }));
    }
  };

  return (
    <div className={"flex flex-col gap-5 px-1"}>
      {/* 이메일 */}
      <div className={"flex justify-between gap-5"}>
        <h1 className={"shrink-0 text-xl font-bold"}>지역</h1>
        <EditableField
          label="지역"
          value={user.location}
          isEditing={isEditState.location}
          onEdit={() => setIsEditState((prev) => ({ ...prev, location: true }))}
          onCancel={() => {
            setIsEditState((prev) => ({ ...prev, location: false }));
            setValue("location", user.location);
          }}
          onSave={saveLocation}
          registerField={register("location")}
          disabled={watch("location") === user.location}
        />
      </div>
    </div>
  );
}
