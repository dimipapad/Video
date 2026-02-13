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

const tips = [
  { icon: "💧", text: "Drink more water" },
  { icon: "🥗", text: "Eat whole foods" },
  { icon: "🏃‍♀️", text: "Move your body daily" },
  { icon: "😴", text: "Prioritize sleep" },
  { icon: "💜", text: "Be kind to yourself" },
];

export const SceneTips: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header
  const headerScale = spring({
    fps,
    frame: frame - 5,
    config: { damping: 50, mass: 0.5 },
  });
  const headerOpacity = spring({
    fps,
    frame: frame - 5,
    config: { damping: 80 },
  });

  // Fade out
  const fadeOut = interpolate(frame, [130, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.darkBg} 0%, #1A0A1A 50%, #2A0A20 100%)`,
        opacity: fadeOut,
      }}
    >
      <ParticleField count={20} color={COLORS.gold} seed="tips" />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 70px",
        }}
      >
        {/* Header */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 56,
            fontWeight: 800,
            color: COLORS.white,
            textTransform: "uppercase",
            letterSpacing: 4,
            textAlign: "center",
            marginBottom: 60,
            transform: `scale(${headerScale})`,
            opacity: headerOpacity,
          }}
        >
          5 Daily Habits
          <div
            style={{
              fontSize: 30,
              fontWeight: 300,
              color: COLORS.softPink,
              letterSpacing: 8,
              marginTop: 8,
            }}
          >
            THAT CHANGE EVERYTHING
          </div>
        </div>

        {/* Tips list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
            width: "100%",
            maxWidth: 850,
          }}
        >
          {tips.map((tip, i) => {
            const delay = 20 + i * 15;

            const tipOpacity = spring({
              fps,
              frame: frame - delay,
              config: { damping: 80 },
            });
            const tipX = spring({
              fps,
              frame: frame - delay,
              config: { damping: 60, mass: 0.5 },
              from: -120,
              to: 0,
            });

            // Animated bar fill behind each tip
            const barWidth = spring({
              fps,
              frame: frame - delay - 5,
              config: { damping: 80, mass: 0.8 },
              from: 0,
              to: 100,
            });

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  opacity: tipOpacity,
                  transform: `translateX(${tipX}px)`,
                  position: "relative",
                }}
              >
                {/* Background bar */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${barWidth}%`,
                    background: `linear-gradient(90deg, ${COLORS.rose}15, transparent)`,
                    borderRadius: 16,
                  }}
                />

                {/* Icon */}
                <div
                  style={{
                    fontSize: 52,
                    width: 80,
                    height: 80,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: 20,
                    border: `1px solid ${COLORS.rose}30`,
                    flexShrink: 0,
                  }}
                >
                  {tip.icon}
                </div>

                {/* Text */}
                <div
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 42,
                    fontWeight: 500,
                    color: COLORS.white,
                  }}
                >
                  {tip.text}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
