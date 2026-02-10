/** Ring Light style — renders a centered circular ring with glow effect using box-shadow and blur. */

import React, { useMemo } from "react";
import type { LightRendererProps, LightStyleDefinition } from "../types";
import { hexToRgba } from "../lib/color";
import { registerLightStyle } from "../lib/registry";

const RingLightRenderer: React.FC<LightRendererProps> = React.memo(({ color, intensity, softness, options }) => {
  const size = (options.size as number) ?? 60;
  const thickness = (options.thickness as number) ?? 8;

  const containerStyle = useMemo(
    (): React.CSSProperties => ({
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
    [],
  );

  const ringStyle = useMemo((): React.CSSProperties => {
    const rgba = hexToRgba(color, intensity / 100);
    const rgbaGlow = hexToRgba(color, (intensity / 100) * 0.6);
    const ringDimension = `min(${size}vw, ${size}vh)`;
    const borderWidth = `calc(min(${size}vw, ${size}vh) * ${thickness / 100})`;
    const blurAmount = (softness / 100) * 40;
    const shadowSpread = (softness / 100) * 30;

    return {
      width: ringDimension,
      height: ringDimension,
      borderRadius: "50%",
      border: `${borderWidth} solid ${rgba}`,
      boxShadow: [`0 0 ${shadowSpread}px ${shadowSpread * 0.5}px ${rgbaGlow}`, `inset 0 0 ${shadowSpread}px ${shadowSpread * 0.5}px ${rgbaGlow}`].join(", "),
      filter: blurAmount > 0 ? `blur(${blurAmount}px)` : undefined,
    };
  }, [color, intensity, softness, size, thickness]);

  return (
    <div style={containerStyle}>
      <div style={ringStyle} />
    </div>
  );
});

RingLightRenderer.displayName = "RingLightRenderer";

const ringLightStyle: LightStyleDefinition = {
  id: "ring-light",
  name: "Ring Light",
  icon: "Circle",
  category: "shape",
  supportsSoftness: true,
  options: {
    size: {
      type: "slider",
      label: "Size",
      min: 20,
      max: 90,
      step: 1,
      defaultValue: 60,
    },
    thickness: {
      type: "slider",
      label: "Thickness",
      min: 2,
      max: 30,
      step: 1,
      defaultValue: 8,
    },
  },
  renderer: RingLightRenderer,
};

registerLightStyle(ringLightStyle);
