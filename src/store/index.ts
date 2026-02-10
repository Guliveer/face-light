/** Zustand store for all Face Light application state, with localStorage persistence for user settings. */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppState } from "../types";

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      color: "#ffffff",
      intensity: 80,
      softness: 50,
      activeStyleId: "full-window",
      styleOptions: {},

      isLightOn: true,
      isFullscreen: false,
      isPanelVisible: true,

      setColor: (color) => set({ color }),
      setIntensity: (intensity) => set({ intensity }),
      setSoftness: (softness) => set({ softness }),
      setActiveStyleId: (id) => set({ activeStyleId: id }),
      setStyleOption: (styleId, key, value) =>
        set((state) => ({
          styleOptions: {
            ...state.styleOptions,
            [styleId]: {
              ...state.styleOptions[styleId],
              [key]: value,
            },
          },
        })),
      toggleLight: () => set((state) => ({ isLightOn: !state.isLightOn })),
      setIsFullscreen: (value) => set({ isFullscreen: value }),
      togglePanel: () => set((state) => ({ isPanelVisible: !state.isPanelVisible })),
      setIsPanelVisible: (visible) => set({ isPanelVisible: visible }),
    }),
    {
      name: "face-light-settings",
      partialize: (state) => ({
        color: state.color,
        intensity: state.intensity,
        softness: state.softness,
        activeStyleId: state.activeStyleId,
        styleOptions: state.styleOptions,
        isLightOn: state.isLightOn,
      }),
    },
  ),
);
