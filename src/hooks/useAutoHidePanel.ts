/** Hook that auto-hides the control panel after 3 seconds of mouse inactivity in fullscreen mode. */

import { useEffect, useRef } from "react";
import { useAppStore } from "../store";

export function useAutoHidePanel() {
  const isFullscreen = useAppStore((s) => s.isFullscreen);
  const setIsPanelVisible = useAppStore((s) => s.setIsPanelVisible);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isFullscreen) {
      setIsPanelVisible(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const handleMouseMove = () => {
      setIsPanelVisible(true);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setIsPanelVisible(false);
      }, 3000);
    };

    handleMouseMove();

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isFullscreen, setIsPanelVisible]);
}
