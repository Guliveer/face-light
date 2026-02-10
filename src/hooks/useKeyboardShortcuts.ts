/** Hook to handle global keyboard shortcuts for the Face Light application. */

import { useEffect } from "react";
import { useAppStore } from "../store";

export function useKeyboardShortcuts(toggleFullscreen: () => void) {
  const toggleLight = useAppStore((s) => s.toggleLight);
  const setIntensity = useAppStore((s) => s.setIntensity);
  const intensity = useAppStore((s) => s.intensity);
  const togglePanel = useAppStore((s) => s.togglePanel);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName ?? "").toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;

      switch (e.key.toLowerCase()) {
        case "f":
          e.preventDefault();
          toggleFullscreen();
          break;
        case " ":
          e.preventDefault();
          toggleLight();
          break;
        case "[":
          e.preventDefault();
          setIntensity(Math.max(0, intensity - 5));
          break;
        case "]":
          e.preventDefault();
          setIntensity(Math.min(100, intensity + 5));
          break;
        case "h":
          e.preventDefault();
          togglePanel();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleFullscreen, toggleLight, setIntensity, intensity, togglePanel]);
}
