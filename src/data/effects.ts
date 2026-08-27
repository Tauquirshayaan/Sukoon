import { MoodKey } from "./surahMoods";

/**
 * The foreground atmosphere layer used to be rain-only (see the comment
 * history in AtmosphereCanvas.tsx). This is the small type system that lets
 * it host more than one effect: each mood gets a natural-feeling default
 * effect (see MOOD_TO_EFFECT below), and EffectPicker.tsx lets a person
 * override that choice manually — mirroring VibePicker.tsx's
 * auto-vs-manual pattern exactly, so the two controls feel like one family.
 */
export type EffectKey = "rain" | "wind" | "stars" | "rays";

export const EFFECT_LABELS: Record<EffectKey, string> = {
  rain: "Rain",
  wind: "Wind & Sand",
  stars: "Stars",
  rays: "Light Rays",
};

export const EFFECT_ICONS: Record<EffectKey, string> = {
  rain: "🌧️",
  wind: "🍃",
  stars: "✨",
  rays: "🌤️",
};

export const EFFECT_ORDER: EffectKey[] = ["rain", "wind", "stars", "rays"];

// The "natural" pairing between a background mood and a foreground
// atmosphere effect — water calls for rain, dunes for a dry wind carrying
// sand, a dawn sky for soft light rays and dust, and the plain night mood
// for a quiet field of stars. This is what the "Auto" option in
// EffectPicker follows.
export const MOOD_TO_EFFECT: Record<MoodKey, EffectKey> = {
  water: "rain",
  dunes: "wind",
  dawn: "rays",
  default: "stars",
};

export function resolveAutoEffect(mood: MoodKey): EffectKey {
  return MOOD_TO_EFFECT[mood] ?? "stars";
}
