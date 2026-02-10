/** Full Window light style — fills the entire viewport with a solid color overlay. */

import React, { useMemo } from "react";
import type { LightRendererProps, LightStyleDefinition } from "../types";
import { hexToRgba } from "../lib/color";
import { registerLightStyle } from "../lib/registry";

const FullWindowRenderer: React.FC<LightRendererProps> = React.memo(({ color, intensity }) => {
  const style = useMemo(
    (): React.CSSProperties => ({
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      backgroundColor: hexToRgba(color, intensity / 100),
    }),
    [color, intensity],
  );

  return <div style={style} />;
});

FullWindowRenderer.displayName = "FullWindowRenderer";

const fullWindowStyle: LightStyleDefinition = {
  id: "full-window",
  name: "Full Window",
  icon: "Monitor",
  category: "fill",
  supportsSoftness: false,
  options: {},
  renderer: FullWindowRenderer,
};

registerLightStyle(fullWindowStyle);
