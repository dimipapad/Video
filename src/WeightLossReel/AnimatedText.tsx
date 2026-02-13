import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export const AnimatedText: React.FC<{
  text: string;
  fontSize: number;
  color: string;
  fontWeight?: string;
  delay?: number;
  letterSpacing?: number;
  lineHeight?: number;
  textTransform?: React.CSSProperties["textTransform"];
  fontFamily?: string;
}> = ({
  text,
  fontSize,
  color,
  fontWeight = "bold",
  delay = 0,
  letterSpacing = 0,
  lineHeight = 1.2,
  textTransform = "none",
  fontFamily = "SF Pro Display, Helvetica Neue, Helvetica, Arial, sans-serif",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0 18px",
      }}
    >
      {words.map((word, i) => {
        const wordDelay = delay + i * 4;

        const scale = spring({
          fps,
          frame: frame - wordDelay,
          config: { damping: 80, mass: 0.6 },
        });

        const opacity = spring({
          fps,
          frame: frame - wordDelay,
          config: { damping: 100, mass: 0.5 },
        });

        const y = spring({
          fps,
          frame: frame - wordDelay,
          config: { damping: 80, mass: 0.5 },
          from: 40,
          to: 0,
        });

        return (
          <span
            key={`${word}-${i}`}
            style={{
              fontFamily,
              fontSize,
              fontWeight,
              color,
              letterSpacing,
              lineHeight,
              textTransform,
              textAlign: "center",
              display: "inline-block",
              transform: `translateY(${y}px) scale(${scale})`,
              opacity,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
