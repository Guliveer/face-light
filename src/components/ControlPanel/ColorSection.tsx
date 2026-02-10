/** Color picker section with hex color picker, hex input, and preset swatches. */

import React, { useCallback } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { useAppStore } from "../../store";

const PRESET_COLORS = [
  { hex: "#ffffff", label: "White" },
  { hex: "#fff5e6", label: "Warm White" },
  { hex: "#e6f0ff", label: "Cool White" },
  { hex: "#fff8dc", label: "Soft Yellow" },
  { hex: "#cce5ff", label: "Soft Blue" },
  { hex: "#ffe6f0", label: "Soft Pink" },
  { hex: "#e6ffe6", label: "Soft Green" },
] as const;

const ColorSection: React.FC = () => {
  const color = useAppStore((s) => s.color);
  const setColor = useAppStore((s) => s.setColor);

  const handlePresetClick = useCallback(
    (hex: string) => {
      setColor(hex);
    },
    [setColor],
  );

  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs text-white/60">Color</span>
      <div className="overflow-hidden rounded-lg [&_.react-colorful]:!w-full [&_.react-colorful]:!h-40">
        <HexColorPicker color={color} onChange={setColor} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-white/40">#</span>
        <HexColorInput color={color} onChange={setColor} prefixed={false} className="w-full rounded-md bg-white/5 px-2 py-1.5 text-xs text-white outline-none border border-white/10 focus:border-white/30 transition-colors duration-200" />
      </div>
      <div className="flex items-center gap-1.5">
        {PRESET_COLORS.map((preset) => (
          <button
            key={preset.hex}
            type="button"
            title={preset.label}
            onClick={() => handlePresetClick(preset.hex)}
            className="h-6 w-6 shrink-0 rounded-full border-2 transition-all duration-200 hover:scale-110"
            style={{
              backgroundColor: preset.hex,
              borderColor: color === preset.hex ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(ColorSection);
