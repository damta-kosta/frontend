import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router";

export default function RoomCreate() {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={
          "bg-background sticky top-0 z-10 flex h-[50px] items-center border-b px-4"
        }
      >
        <button
          onClick={() => navigate(-1)}
          className={"rounded-full p-1 hover:bg-neutral-100"}
        >
          <RiArrowLeftLine className={"size-6"} />
        </button>
      </div>
    </>
  );
}
