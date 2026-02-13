import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const GradientBackground: React.FC<{
  colors: [string, string, string];
}> = ({ colors }) => {
  const frame = useCurrentFrame();

  // Slowly shift the gradient angle for subtle motion
  const angle = interpolate(frame, [0, 600], [135, 180]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${angle}deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`,
      }}
    />
  );
};
