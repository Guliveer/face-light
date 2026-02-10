/** ControlPanel — main control panel container with dark glass-morphism aesthetic. */

import React, { useCallback } from "react";
import { Power, Maximize, Minimize } from "lucide-react";
import { useAppStore } from "../../store";
import { getLightStyle } from "../../lib/registry";
import ColorSection from "./ColorSection";
import LabeledSlider from "./LabeledSlider";
import StyleSelector from "./StyleSelector";
import StyleOptions from "./StyleOptions";

interface ControlPanelProps {
  toggleFullscreen: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ toggleFullscreen }) => {
  const isLightOn = useAppStore((s) => s.isLightOn);
  const toggleLight = useAppStore((s) => s.toggleLight);
  const isPanelVisible = useAppStore((s) => s.isPanelVisible);
  const isFullscreen = useAppStore((s) => s.isFullscreen);

  const intensity = useAppStore((s) => s.intensity);
  const setIntensity = useAppStore((s) => s.setIntensity);
  const softness = useAppStore((s) => s.softness);
  const setSoftness = useAppStore((s) => s.setSoftness);
  const activeStyleId = useAppStore((s) => s.activeStyleId);

  const activeStyle = getLightStyle(activeStyleId);
  const showSoftness = activeStyle?.supportsSoftness ?? false;

  const formatPercent = useCallback((v: number) => `${v}%`, []);

  return (
    <div className={`fixed bottom-4 right-4 z-50 w-80 max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl pointer-events-auto transition-all duration-300 ${isPanelVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-semibold text-white">Face Light</h1>
          <div className="flex items-center gap-1">
            <button type="button" onClick={toggleFullscreen} title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"} className="flex h-7 w-7 items-center justify-center rounded-lg text-white/60 transition-colors duration-200 hover:bg-white/10 hover:text-white">
              {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
            </button>
            <button type="button" onClick={toggleLight} title={isLightOn ? "Turn Off" : "Turn On"} className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors duration-200 ${isLightOn ? "bg-white/20 text-white hover:bg-white/30" : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60"}`}>
              <Power size={14} />
            </button>
          </div>
        </div>

        <div className="h-px bg-white/10" />

        <ColorSection />

        <div className="h-px bg-white/10" />

        <LabeledSlider label="Intensity" value={intensity} min={0} max={100} step={1} onChange={setIntensity} formatValue={formatPercent} />

        <div className="h-px bg-white/10" />

        <StyleSelector />

        {showSoftness && (
          <>
            <div className="h-px bg-white/10" />
            <LabeledSlider label="Softness" value={softness} min={0} max={100} step={1} onChange={setSoftness} formatValue={formatPercent} />
          </>
        )}

        <StyleOptions />
      </div>
    </div>
  );
};

export default React.memo(ControlPanel);
