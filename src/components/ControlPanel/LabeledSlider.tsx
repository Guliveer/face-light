/** Reusable labeled slider component built on Radix UI Slider primitive. */

import React from "react";
import * as Slider from "@radix-ui/react-slider";

interface LabeledSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
}

const LabeledSlider: React.FC<LabeledSliderProps> = ({ label, value, min, max, step, onChange, formatValue }) => {
  const displayValue = formatValue ? formatValue(value) : String(value);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/60">{label}</span>
        <span className="text-xs text-white/60 tabular-nums">{displayValue}</span>
      </div>
      <Slider.Root className="relative flex h-4 w-full touch-none items-center select-none" value={[value]} min={min} max={max} step={step} onValueChange={([v]) => onChange(v)}>
        <Slider.Track className="relative h-2 w-full grow rounded-full bg-white/10">
          <Slider.Range className="absolute h-full rounded-full bg-white/30" />
        </Slider.Track>
        <Slider.Thumb className="block h-4 w-4 rounded-full bg-white shadow-lg transition-transform duration-150 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/40" />
      </Slider.Root>
    </div>
  );
};

export default React.memo(LabeledSlider);
