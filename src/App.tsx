/** App shell — composes LightLayer and ControlPanel, initializes global hooks. */

import { useFullscreen } from "./hooks/useFullscreen";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { useAutoHidePanel } from "./hooks/useAutoHidePanel";
import { LightLayer } from "./components/LightLayer";
import { ControlPanel } from "./components/ControlPanel";

function App() {
  const { toggleFullscreen } = useFullscreen();
  useKeyboardShortcuts(toggleFullscreen);
  useAutoHidePanel();

  return (
    <div className="relative h-full min-h-screen bg-black overflow-hidden">
      <LightLayer />
      <ControlPanel toggleFullscreen={toggleFullscreen} />
    </div>
  );
}

export default App;
