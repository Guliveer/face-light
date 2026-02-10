/** Core type definitions for the Face Light application. */

import type React from "react";

export interface SliderOption {
  type: "slider";
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

export interface SelectOption {
  type: "select";
  label: string;
  options: { value: string; label: string }[];
  defaultValue: string;
}

export interface ToggleOption {
  type: "toggle";
  label: string;
  defaultValue: boolean;
}

export type StyleOptionDefinition = SliderOption | SelectOption | ToggleOption;

export interface LightStyleDefinition {
  id: string;
  name: string;
  icon: string;
  category: "fill" | "edge" | "shape" | "effect";
  supportsSoftness: boolean;
  options: Record<string, StyleOptionDefinition>;
  renderer: React.ComponentType<LightRendererProps>;
}

export interface LightRendererProps {
  color: string;
  intensity: number;
  softness: number;
  options: Record<string, number | string | boolean>;
}

export interface AppState {
  color: string;
  intensity: number;
  softness: number;
  activeStyleId: string;
  styleOptions: Record<string, Record<string, number | string | boolean>>;

  isLightOn: boolean;
  isFullscreen: boolean;
  isPanelVisible: boolean;

  setColor: (color: string) => void;
  setIntensity: (intensity: number) => void;
  setSoftness: (softness: number) => void;
  setActiveStyleId: (id: string) => void;
  setStyleOption: (styleId: string, key: string, value: number | string | boolean) => void;
  toggleLight: () => void;
  setIsFullscreen: (value: boolean) => void;
  togglePanel: () => void;
  setIsPanelVisible: (visible: boolean) => void;
}
