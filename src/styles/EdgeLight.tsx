/** Edge Light style — creates glowing light strips along viewport edges using CSS gradients. */

import React, { useMemo } from "react";
import type { LightRendererProps, LightStyleDefinition } from "../types";
import { hexToRgba } from "../lib/color";
import { registerLightStyle } from "../lib/registry";

const EdgeLightRenderer: React.FC<LightRendererProps> = React.memo(({ color, intensity, softness, options }) => {
  const edges = (options.edges as string) ?? "all";
  const thickness = (options.thickness as number) ?? 15;

  const style = useMemo((): React.CSSProperties => {
    const rgba = hexToRgba(color, intensity / 100);
    const softnessSpread = (softness / 100) * thickness;
    const endStop = thickness + softnessSpread;

    const showTop = ["all", "horizontal", "top"].includes(edges);
    const showBottom = ["all", "horizontal", "bottom"].includes(edges);
    const showLeft = ["all", "vertical", "left"].includes(edges);
    const showRight = ["all", "vertical", "right"].includes(edges);

    const gradients: string[] = [];

    if (showTop) {
      gradients.push(`linear-gradient(to bottom, ${rgba} ${thickness}%, transparent ${endStop}%)`);
    }
    if (showBottom) {
      gradients.push(`linear-gradient(to top, ${rgba} ${thickness}%, transparent ${endStop}%)`);
    }
    if (showLeft) {
      gradients.push(`linear-gradient(to right, ${rgba} ${thickness}%, transparent ${endStop}%)`);
    }
    if (showRight) {
      gradients.push(`linear-gradient(to left, ${rgba} ${thickness}%, transparent ${endStop}%)`);
    }

    return {
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      background: gradients.length > 0 ? gradients.join(", ") : "none",
    };
  }, [color, intensity, softness, edges, thickness]);

  return <div style={style} />;
});

EdgeLightRenderer.displayName = "EdgeLightRenderer";

const edgeLightStyle: LightStyleDefinition = {
  id: "edge-light",
  name: "Edge Light",
  icon: "Frame",
  category: "edge",
  supportsSoftness: true,
  options: {
    edges: {
      type: "select",
      label: "Edges",
      options: [
        { value: "all", label: "All" },
        { value: "vertical", label: "Vertical (Left + Right)" },
        { value: "horizontal", label: "Horizontal (Top + Bottom)" },
        { value: "top", label: "Top" },
        { value: "bottom", label: "Bottom" },
        { value: "left", label: "Left" },
        { value: "right", label: "Right" },
      ],
      defaultValue: "all",
    },
    thickness: {
      type: "slider",
      label: "Thickness",
      min: 5,
      max: 40,
      step: 1,
      defaultValue: 15,
    },
  },
  renderer: EdgeLightRenderer,
};

registerLightStyle(edgeLightStyle);
