import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_FAMILY } from "./constants";
import { ParticleField } from "./ParticleField";

export const SceneQuote1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Quote mark entrance
  const quoteScale = spring({
    fps,
    frame: frame - 5,
    config: { damping: 40, mass: 0.5 },
  });

  // Main quote text - word by word
  const words = ["She", "believed", "she", "could,", "so", "she", "did."];

  // Underline grow
  const underlineWidth = spring({
    fps,
    frame: frame - 60,
    config: { damping: 60 },
    from: 0,
    to: 500,
  });

  // Bottom text
  const bottomOpacity = spring({
    fps,
    frame: frame - 70,
    config: { damping: 80 },
  });
  const bottomY = spring({
    fps,
    frame: frame - 70,
    config: { damping: 60 },
    from: 30,
    to: 0,
  });

  // Fade out at end
  const fadeOut = interpolate(frame, [85, 105], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${COLORS.darkBg} 0%, #2A0A1A 50%, ${COLORS.plum}40 100%)`,
        opacity: fadeOut,
      }}
    >
      <ParticleField count={25} color={COLORS.rose} seed="quote1" />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 80px",
        }}
      >
        {/* Large quote mark */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 200,
            color: COLORS.rose,
            opacity: 0.3,
            transform: `scale(${quoteScale})`,
            marginBottom: -60,
            lineHeight: 1,
          }}
        >
          "
        </div>

        {/* Quote text */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "8px 16px",
            maxWidth: 900,
          }}
        >
          {words.map((word, i) => {
            const delay = 15 + i * 5;
            const wordOpacity = spring({
              fps,
              frame: frame - delay,
              config: { damping: 80 },
            });
            const wordY = spring({
              fps,
              frame: frame - delay,
              config: { damping: 60, mass: 0.5 },
              from: 50,
              to: 0,
            });

            const isHighlight = word === "believed" || word === "did.";

            return (
              <span
                key={`${word}-${i}`}
                style={{
                  fontFamily: isHighlight ? "Georgia, serif" : FONT_FAMILY,
                  fontSize: 72,
                  fontWeight: isHighlight ? 400 : 300,
                  fontStyle: isHighlight ? "italic" : "normal",
                  color: isHighlight ? COLORS.gold : COLORS.white,
                  transform: `translateY(${wordY}px)`,
                  opacity: wordOpacity,
                  display: "inline-block",
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Underline */}
        <div
          style={{
            width: underlineWidth,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${COLORS.softPink}, transparent)`,
            marginTop: 40,
            marginBottom: 40,
          }}
        />

        {/* Bottom attribution */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 32,
            fontWeight: 300,
            color: COLORS.softPink,
            letterSpacing: 8,
            textTransform: "uppercase",
            opacity: bottomOpacity,
            transform: `translateY(${bottomY}px)`,
          }}
        >
          — R.S. Grey
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
