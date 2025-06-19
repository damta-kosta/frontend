import { useTheme } from "@/components/ThemeProvider.tsx";

export default function SettingPage() {
  const { setTheme } = useTheme();

  return (
    <>
      <div
        className={
          "sticky top-0 z-10 flex h-[50px] items-center justify-between border-b px-5"
        }
      >
        <p className={"text-xl font-bold"}>설정</p>
      </div>
      <div className={"px-5 pt-10 pb-15"}>
        <div>
          <h1 className={"pb-3 text-2xl font-bold"}>테마</h1>
          <div className={"grid grid-cols-3 gap-3"}>
            <button
              onClick={() => setTheme("system")}
              className={"rounded border py-2"}
            >
              시스템
            </button>
            <button
              onClick={() => setTheme("light")}
              className={"rounded border bg-white py-2 text-black"}
            >
              라이트
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={
                "bg-background dark text-foreground rounded border py-2"
              }
            >
              다크
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
