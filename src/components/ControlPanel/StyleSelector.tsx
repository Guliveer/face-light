/** Style selector grid — displays all registered light styles grouped by category. */

import React, { useCallback } from "react";
import { Monitor, Frame, Circle, Sun, Columns2, Sparkles } from "lucide-react";
import type { LightStyleDefinition } from "../../types";
import { getAllLightStyles, getDefaultOptions } from "../../lib/registry";
import { useAppStore } from "../../store";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Monitor,
  Frame,
  Circle,
  Sun,
  Columns2,
  Sparkles,
};

const CATEGORY_LABELS: Record<string, string> = {
  fill: "Fill",
  edge: "Edge",
  shape: "Shape",
  effect: "Effect",
};

const CATEGORY_ORDER = ["fill", "edge", "shape", "effect"];

function groupByCategory(styles: LightStyleDefinition[]): Record<string, LightStyleDefinition[]> {
  const groups: Record<string, LightStyleDefinition[]> = {};
  for (const style of styles) {
    if (!groups[style.category]) {
      groups[style.category] = [];
    }
    groups[style.category].push(style);
  }
  return groups;
}

const StyleSelector: React.FC = () => {
  const activeStyleId = useAppStore((s) => s.activeStyleId);
  const setActiveStyleId = useAppStore((s) => s.setActiveStyleId);
  const styleOptions = useAppStore((s) => s.styleOptions);
  const setStyleOption = useAppStore((s) => s.setStyleOption);

  const handleStyleSelect = useCallback(
    (styleId: string) => {
      setActiveStyleId(styleId);
      if (!styleOptions[styleId]) {
        const defaults = getDefaultOptions(styleId);
        for (const [key, value] of Object.entries(defaults)) {
          setStyleOption(styleId, key, value);
        }
      }
    },
    [setActiveStyleId, styleOptions, setStyleOption],
  );

  const allStyles = getAllLightStyles();
  const grouped = groupByCategory(allStyles);

  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs text-white/60">Style</span>
      {CATEGORY_ORDER.filter((cat) => grouped[cat]).map((category) => (
        <div key={category} className="flex flex-col gap-1.5">
          <span className="text-[10px] uppercase tracking-wider text-white/30">{CATEGORY_LABELS[category] ?? category}</span>
          <div className="grid grid-cols-3 gap-1.5">
            {grouped[category].map((style) => {
              const IconComponent = iconMap[style.icon];
              const isActive = style.id === activeStyleId;

              return (
                <button key={style.id} type="button" onClick={() => handleStyleSelect(style.id)} className={`flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-center transition-all duration-200 ${isActive ? "bg-white/20 border border-white/30 text-white" : "bg-white/5 border border-transparent text-white/60 hover:bg-white/10 hover:text-white/80"}`}>
                  {IconComponent && <IconComponent size={16} />}
                  <span className="text-[10px] leading-tight">{style.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(StyleSelector);
