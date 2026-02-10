/** LightLayer — Renders the active light style by looking up the registry and passing store state as props. */

import React from "react";
import { useAppStore } from "../../store";
import { getLightStyle, getDefaultOptions } from "../../lib/registry";
import "../../styles";

const LightLayer: React.FC = React.memo(function LightLayer() {
  const activeStyleId = useAppStore((s) => s.activeStyleId);
  const color = useAppStore((s) => s.color);
  const intensity = useAppStore((s) => s.intensity);
  const softness = useAppStore((s) => s.softness);
  const styleOptions = useAppStore((s) => s.styleOptions);
  const isLightOn = useAppStore((s) => s.isLightOn);

  if (!isLightOn) return null;

  const style = getLightStyle(activeStyleId);
  if (!style) return null;

  const defaults = getDefaultOptions(activeStyleId);
  const overrides = styleOptions[activeStyleId] ?? {};
  const mergedOptions = { ...defaults, ...overrides };

  const Renderer = style.renderer;

  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      <Renderer color={color} intensity={intensity} softness={softness} options={mergedOptions} />
    </div>
  );
});

export default LightLayer;
