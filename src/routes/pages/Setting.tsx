import { useTheme } from "@/components/ThemeProvider.tsx";
import { cn } from "@/lib/utils.ts";

export default function SettingPage() {
  const { theme, setTheme } = useTheme();

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
              className={cn("relative rounded border-2 py-2 font-bold", {
                "border-primary text-primary":
                  theme === "system" || theme === undefined,
              })}
            >
              시스템
              {(theme === "system" || theme === undefined) && (
                <div
                  className={
                    "bg-primary absolute top-1/2 right-3 h-3 w-3 -translate-y-1/2 rounded-full"
                  }
                />
              )}
            </button>
            <button
              onClick={() => setTheme("light")}
              className={cn(
                "relative rounded border-2 bg-white py-2 font-bold text-black",
                { "border-primary text-primary": theme === "light" },
              )}
            >
              라이트
              {theme === "light" && (
                <div
                  className={
                    "bg-primary absolute top-1/2 right-3 h-3 w-3 -translate-y-1/2 rounded-full"
                  }
                />
              )}
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={cn(
                "bg-background dark text-foreground relative rounded border-2 py-2 font-bold",
                { "border-primary text-primary": theme === "dark" },
              )}
            >
              다크
              {theme === "dark" && (
                <div
                  className={
                    "bg-primary absolute top-1/2 right-3 h-3 w-3 -translate-y-1/2 rounded-full"
                  }
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
