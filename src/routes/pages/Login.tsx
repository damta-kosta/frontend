import { useNavigate } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <>
      <Dialog defaultOpen={true} onOpenChange={() => navigate(-1)}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>로그인</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
