/** Dynamic style-specific options renderer — renders controls based on the active style's option definitions. */

import React, { useCallback } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { getLightStyle, getDefaultOptions } from "../../lib/registry";
import { useAppStore } from "../../store";
import type { SliderOption, SelectOption, ToggleOption } from "../../types";
import LabeledSlider from "./LabeledSlider";

const StyleOptions: React.FC = () => {
  const activeStyleId = useAppStore((s) => s.activeStyleId);
  const styleOptions = useAppStore((s) => s.styleOptions);
  const setStyleOption = useAppStore((s) => s.setStyleOption);

  const style = getLightStyle(activeStyleId);
  if (!style || Object.keys(style.options).length === 0) return null;

  const defaults = getDefaultOptions(activeStyleId);
  const currentOptions = { ...defaults, ...styleOptions[activeStyleId] };

  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs text-white/60">Style Options</span>
      {Object.entries(style.options).map(([key, def]) => {
        switch (def.type) {
          case "slider":
            return <SliderOptionControl key={key} optionKey={key} definition={def} value={currentOptions[key] as number} styleId={activeStyleId} setStyleOption={setStyleOption} />;
          case "select":
            return <SelectOptionControl key={key} optionKey={key} definition={def} value={currentOptions[key] as string} styleId={activeStyleId} setStyleOption={setStyleOption} />;
          case "toggle":
            return <ToggleOptionControl key={key} optionKey={key} definition={def} value={currentOptions[key] as boolean} styleId={activeStyleId} setStyleOption={setStyleOption} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

interface SliderControlProps {
  optionKey: string;
  definition: SliderOption;
  value: number;
  styleId: string;
  setStyleOption: (styleId: string, key: string, value: number | string | boolean) => void;
}

const SliderOptionControl: React.FC<SliderControlProps> = React.memo(({ optionKey, definition, value, styleId, setStyleOption }) => {
  const handleChange = useCallback((v: number) => setStyleOption(styleId, optionKey, v), [styleId, optionKey, setStyleOption]);

  return <LabeledSlider label={definition.label} value={value} min={definition.min} max={definition.max} step={definition.step} onChange={handleChange} />;
});

interface SelectControlProps {
  optionKey: string;
  definition: SelectOption;
  value: string;
  styleId: string;
  setStyleOption: (styleId: string, key: string, value: number | string | boolean) => void;
}

const SelectOptionControl: React.FC<SelectControlProps> = React.memo(({ optionKey, definition, value, styleId, setStyleOption }) => {
  const handleChange = useCallback(
    (v: string) => {
      if (v) setStyleOption(styleId, optionKey, v);
    },
    [styleId, optionKey, setStyleOption],
  );

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs text-white/60">{definition.label}</span>
      <ToggleGroup.Root type="single" value={value} onValueChange={handleChange} className="flex flex-wrap gap-1">
        {definition.options.map((opt) => (
          <ToggleGroup.Item key={opt.value} value={opt.value} className={`rounded-md px-2.5 py-1 text-[10px] transition-all duration-200 ${value === opt.value ? "bg-white/20 text-white border border-white/30" : "bg-white/5 text-white/60 border border-transparent hover:bg-white/10"}`}>
            {opt.label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </div>
  );
});

interface ToggleControlProps {
  optionKey: string;
  definition: ToggleOption;
  value: boolean;
  styleId: string;
  setStyleOption: (styleId: string, key: string, value: number | string | boolean) => void;
}

const ToggleOptionControl: React.FC<ToggleControlProps> = React.memo(({ optionKey, definition, value, styleId, setStyleOption }) => {
  const handleToggle = useCallback(() => {
    setStyleOption(styleId, optionKey, !value);
  }, [styleId, optionKey, value, setStyleOption]);

  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-white/60">{definition.label}</span>
      <button type="button" onClick={handleToggle} className={`relative h-5 w-9 rounded-full transition-colors duration-200 ${value ? "bg-white/30" : "bg-white/10"}`}>
        <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${value ? "translate-x-4" : "translate-x-0"}`} />
      </button>
    </div>
  );
});

export default React.memo(StyleOptions);
