/** Corner Glow style — places radial gradient glows at selected viewport corners. */

import React, { useMemo } from "react";
import type { LightRendererProps, LightStyleDefinition } from "../types";
import { hexToRgba } from "../lib/color";
import { registerLightStyle } from "../lib/registry";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const CORNER_POSITIONS: Record<Corner, string> = {
  "top-left": "0% 0%",
  "top-right": "100% 0%",
  "bottom-left": "0% 100%",
  "bottom-right": "100% 100%",
};

function getActiveCorners(selection: string): Corner[] {
  switch (selection) {
    case "all":
      return ["top-left", "top-right", "bottom-left", "bottom-right"];
    case "top":
      return ["top-left", "top-right"];
    case "bottom":
      return ["bottom-left", "bottom-right"];
    case "diagonal-tl-br":
      return ["top-left", "bottom-right"];
    case "diagonal-tr-bl":
      return ["top-right", "bottom-left"];
    default:
      return ["top-left", "top-right", "bottom-left", "bottom-right"];
  }
}

const CornerGlowRenderer: React.FC<LightRendererProps> = React.memo(({ color, intensity, softness, options }) => {
  const corners = (options.corners as string) ?? "all";
  const size = (options.size as number) ?? 35;

  const style = useMemo((): React.CSSProperties => {
    const rgba = hexToRgba(color, intensity / 100);
    const activeCorners = getActiveCorners(corners);
    const softnessSpread = size + (softness / 100) * size * 0.5;

    const gradients = activeCorners.map((corner) => `radial-gradient(circle at ${CORNER_POSITIONS[corner]}, ${rgba} 0%, transparent ${softnessSpread}%)`);

    return {
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      background: gradients.length > 0 ? gradients.join(", ") : "none",
    };
  }, [color, intensity, softness, corners, size]);

  return <div style={style} />;
});

CornerGlowRenderer.displayName = "CornerGlowRenderer";

const cornerGlowStyle: LightStyleDefinition = {
  id: "corner-glow",
  name: "Corner Glow",
  icon: "Sparkles",
  category: "effect",
  supportsSoftness: true,
  options: {
    corners: {
      type: "select",
      label: "Corners",
      options: [
        { value: "all", label: "All Corners" },
        { value: "top", label: "Top Corners" },
        { value: "bottom", label: "Bottom Corners" },
        { value: "diagonal-tl-br", label: "Diagonal (TL + BR)" },
        { value: "diagonal-tr-bl", label: "Diagonal (TR + BL)" },
      ],
      defaultValue: "all",
    },
    size: {
      type: "slider",
      label: "Size",
      min: 15,
      max: 60,
      step: 1,
      defaultValue: 35,
    },
  },
  renderer: CornerGlowRenderer,
};

registerLightStyle(cornerGlowStyle);
