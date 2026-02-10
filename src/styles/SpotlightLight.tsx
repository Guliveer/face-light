/** Gradient Spotlight style — creates a radial gradient spotlight at a configurable position. */

import React, { useMemo } from "react";
import type { LightRendererProps, LightStyleDefinition } from "../types";
import { hexToRgba } from "../lib/color";
import { registerLightStyle } from "../lib/registry";

const SpotlightRenderer: React.FC<LightRendererProps> = React.memo(({ color, intensity, softness, options }) => {
  const size = (options.size as number) ?? 60;
  const positionX = (options.positionX as number) ?? 50;
  const positionY = (options.positionY as number) ?? 50;

  const style = useMemo((): React.CSSProperties => {
    const rgba = hexToRgba(color, intensity / 100);
    const softnessOffset = (softness / 100) * size * 0.5;
    const innerStop = Math.max(0, size - softnessOffset);

    return {
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      background: `radial-gradient(circle at ${positionX}% ${positionY}%, ${rgba} 0%, ${hexToRgba(color, (intensity / 100) * 0.3)} ${innerStop}%, transparent ${size}%)`,
    };
  }, [color, intensity, softness, size, positionX, positionY]);

  return <div style={style} />;
});

SpotlightRenderer.displayName = "SpotlightRenderer";

const spotlightStyle: LightStyleDefinition = {
  id: "spotlight",
  name: "Spotlight",
  icon: "Sun",
  category: "effect",
  supportsSoftness: true,
  options: {
    size: {
      type: "slider",
      label: "Size",
      min: 20,
      max: 100,
      step: 1,
      defaultValue: 60,
    },
    positionX: {
      type: "slider",
      label: "Horizontal Position",
      min: 0,
      max: 100,
      step: 1,
      defaultValue: 50,
    },
    positionY: {
      type: "slider",
      label: "Vertical Position",
      min: 0,
      max: 100,
      step: 1,
      defaultValue: 50,
    },
  },
  renderer: SpotlightRenderer,
};

registerLightStyle(spotlightStyle);
