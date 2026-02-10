/** Split Lighting style — divides the viewport into two halves with independent light intensity. */

import React, { useMemo } from "react";
import type { LightRendererProps, LightStyleDefinition } from "../types";
import { hexToRgba } from "../lib/color";
import { registerLightStyle } from "../lib/registry";

const SplitLightRenderer: React.FC<LightRendererProps> = React.memo(({ color, intensity, softness, options }) => {
  const orientation = (options.orientation as string) ?? "vertical";
  const position = (options.position as number) ?? 50;
  const useSecondHalf = (options.useSecondHalf as boolean) ?? true;

  const style = useMemo((): React.CSSProperties => {
    const primaryRgba = hexToRgba(color, intensity / 100);
    const secondaryRgba = useSecondHalf ? hexToRgba(color, (intensity / 100) * 0.5) : "transparent";
    const transitionWidth = (softness / 100) * 20;
    const startFade = Math.max(0, position - transitionWidth / 2);
    const endFade = Math.min(100, position + transitionWidth / 2);

    const direction = orientation === "vertical" ? "to right" : "to bottom";

    return {
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      background: `linear-gradient(${direction}, ${primaryRgba} ${startFade}%, ${secondaryRgba} ${endFade}%)`,
    };
  }, [color, intensity, softness, orientation, position, useSecondHalf]);

  return <div style={style} />;
});

SplitLightRenderer.displayName = "SplitLightRenderer";

const splitLightStyle: LightStyleDefinition = {
  id: "split-light",
  name: "Split Light",
  icon: "Columns2",
  category: "effect",
  supportsSoftness: true,
  options: {
    orientation: {
      type: "select",
      label: "Orientation",
      options: [
        { value: "vertical", label: "Vertical (Left / Right)" },
        { value: "horizontal", label: "Horizontal (Top / Bottom)" },
      ],
      defaultValue: "vertical",
    },
    position: {
      type: "slider",
      label: "Split Position",
      min: 10,
      max: 90,
      step: 1,
      defaultValue: 50,
    },
    useSecondHalf: {
      type: "toggle",
      label: "Light Both Halves",
      defaultValue: true,
    },
  },
  renderer: SplitLightRenderer,
};

registerLightStyle(splitLightStyle);
