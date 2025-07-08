import type { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

type Props = {
  label: string;
  value: string;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  registerField: UseFormRegisterReturn;
  disabled?: boolean;
};

export default function EditableField({
  label,
  value,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  registerField,
  disabled,
}: Props) {
  return (
    <div className="flex w-full items-center justify-between gap-3">
      {isEditing ? (
        <div className="flex w-full flex-col gap-2">
          <Input {...registerField} placeholder={label} />
          <div className="flex gap-2 place-self-end">
            <Button variant="ghost" className="h-9" onClick={onCancel}>
              취소
            </Button>
            <Button
              variant="outline"
              className="h-9"
              disabled={disabled}
              onClick={onSave}
            >
              저장
            </Button>
          </div>
        </div>
      ) : (
        <>
          <p className={label === "이름" ? "text-2xl font-bold" : ""}>
            {value || `${label}를 입력해주세요`}
          </p>
          <Button onClick={onEdit}>수정</Button>
        </>
      )}
    </div>
  );
}
