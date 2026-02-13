import React from "react";
import { random, useCurrentFrame } from "remotion";

export const ParticleField: React.FC<{
  count: number;
  color: string;
  seed: string;
}> = ({ count, color, seed }) => {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: count }, (_, i) => {
    const x = random(`${seed}-x-${i}`) * 1080;
    const baseY = random(`${seed}-y-${i}`) * 1920;
    const size = random(`${seed}-s-${i}`) * 6 + 2;
    const speed = random(`${seed}-sp-${i}`) * 1.5 + 0.3;
    const opacity = random(`${seed}-o-${i}`) * 0.4 + 0.1;

    const y = (baseY - frame * speed) % 1920;
    const adjustedY = y < 0 ? y + 1920 : y;

    return { x, y: adjustedY, size, opacity };
  });

  return (
    <svg
      width={1080}
      height={1920}
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      {particles.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={p.size}
          fill={color}
          opacity={p.opacity}
        />
      ))}
    </svg>
  );
};
