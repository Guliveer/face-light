/** Light style registry — central map of all light style definitions. Styles self-register by calling registerLightStyle(). */

import type { LightStyleDefinition } from "../types";

const registry = new Map<string, LightStyleDefinition>();

export function registerLightStyle(style: LightStyleDefinition): void {
  registry.set(style.id, style);
}

export function getLightStyle(id: string): LightStyleDefinition | undefined {
  return registry.get(id);
}

export function getAllLightStyles(): LightStyleDefinition[] {
  return Array.from(registry.values());
}

export function getLightStylesByCategory(category: string): LightStyleDefinition[] {
  return getAllLightStyles().filter((s) => s.category === category);
}

export function getDefaultOptions(styleId: string): Record<string, number | string | boolean> {
  const style = registry.get(styleId);
  if (!style) return {};

  const defaults: Record<string, number | string | boolean> = {};
  for (const [key, def] of Object.entries(style.options)) {
    defaults[key] = def.defaultValue;
  }
  return defaults;
}
