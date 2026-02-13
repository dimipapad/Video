// Color palette - warm, empowering feminine tones
export const COLORS = {
  rose: "#E8436D",
  softPink: "#F7A8B8",
  coral: "#FF6B6B",
  gold: "#FFD700",
  peach: "#FFDAB9",
  plum: "#9B2335",
  darkBg: "#1A0A10",
  white: "#FFFFFF",
  offWhite: "#FFF5F5",
  warmGray: "#2D1F2D",
};

export const FONT_FAMILY =
  "SF Pro Display, Helvetica Neue, Helvetica, Arial, sans-serif";

// Instagram Reel: 1080x1920, 30fps, 20s = 600 frames
export const FPS = 30;
export const DURATION = 600;
export const WIDTH = 1080;
export const HEIGHT = 1920;

// Scene timing (in frames)
export const SCENES = {
  intro: { from: 0, duration: 120 }, // 0-4s
  quote1: { from: 120, duration: 105 }, // 4-7.5s
  quote2: { from: 225, duration: 105 }, // 7.5-11s
  tips: { from: 330, duration: 150 }, // 11-16s
  closing: { from: 480, duration: 120 }, // 16-20s
};
