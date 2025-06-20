import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

const scrollPositions = new Map<string, number>();

export default function ScrollControl() {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  /*useEffect(() => {
    const prevPath = prevPathRef.current;
    const currPath = location.pathname;
    const scrollEl = document.getElementById("main-scroll-container");

    // 이전 경로 스크롤 위치 저장
    const currentScroll = scrollEl?.scrollTop ?? window.pageYOffset;
    scrollPositions.set(prevPath, currentScroll);

    // 복원 함수
    const restoreScroll = (top: number) => {
      if (scrollEl) {
        scrollEl.scrollTo({ top, behavior: "auto" });
      } else {
        window.scrollTo({ top, behavior: "auto" });
      }
    };

    // 저장된 위치 복원 or 0으로 초기화
    const savedPos = scrollPositions.get(currPath) ?? 0;
    // 만약 복원하고 싶지 않은 페이지가 있으면 조건을 추가하세요.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        restoreScroll(savedPos);
      });
    });

    prevPathRef.current = currPath;
  }, [location.pathname]);*/

  useEffect(() => {
    const scrollEl = document.getElementById("main-scroll-container");
    scrollEl?.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return null;
}
