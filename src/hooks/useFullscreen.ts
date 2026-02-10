/** Hook to manage the browser Fullscreen API, syncing state with the Zustand store. */

import { useCallback, useEffect, useState } from "react";
import { useAppStore } from "../store";

export function useFullscreen() {
  const setIsFullscreen = useAppStore((s) => s.setIsFullscreen);
  const [isFullscreen, setLocalFullscreen] = useState(() => !!document.fullscreenElement);

  useEffect(() => {
    const handleChange = () => {
      const fs = !!document.fullscreenElement;
      setLocalFullscreen(fs);
      setIsFullscreen(fs);
    };

    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, [setIsFullscreen]);

  const enterFullscreen = useCallback(() => {
    document.documentElement.requestFullscreen?.();
  }, []);

  const exitFullscreen = useCallback(() => {
    document.exitFullscreen?.();
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  }, [enterFullscreen, exitFullscreen]);

  return { isFullscreen, enterFullscreen, exitFullscreen, toggleFullscreen };
}
