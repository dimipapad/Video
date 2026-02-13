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

export const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heartbeat-style pulse for the flame emoji
  const pulse = spring({
    fps,
    frame: frame % 30,
    config: { damping: 5, mass: 0.3 },
  });
  const pulseScale = interpolate(pulse, [0, 1], [0.9, 1.15]);

  // Staggered text entrance
  const line1Y = spring({
    fps,
    frame: frame - 15,
    config: { damping: 60, mass: 0.7 },
    from: 80,
    to: 0,
  });
  const line1Opacity = spring({
    fps,
    frame: frame - 15,
    config: { damping: 80 },
  });

  const line2Y = spring({
    fps,
    frame: frame - 30,
    config: { damping: 60, mass: 0.7 },
    from: 80,
    to: 0,
  });
  const line2Opacity = spring({
    fps,
    frame: frame - 30,
    config: { damping: 80 },
  });

  const line3Scale = spring({
    fps,
    frame: frame - 50,
    config: { damping: 40, mass: 0.5 },
  });
  const line3Opacity = spring({
    fps,
    frame: frame - 50,
    config: { damping: 80 },
  });

  // Decorative line
  const lineWidth = spring({
    fps,
    frame: frame - 70,
    config: { damping: 60 },
    from: 0,
    to: 400,
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 30%, ${COLORS.plum} 0%, ${COLORS.darkBg} 70%)`,
      }}
    >
      <ParticleField count={40} color={COLORS.softPink} seed="intro" />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 60px",
        }}
      >
        {/* Flame icon */}
        <div
          style={{
            fontSize: 120,
            marginBottom: 40,
            transform: `scale(${pulseScale})`,
          }}
        >
          🔥
        </div>

        {/* YOUR */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 90,
            fontWeight: 300,
            color: COLORS.softPink,
            letterSpacing: 20,
            textTransform: "uppercase",
            transform: `translateY(${line1Y}px)`,
            opacity: line1Opacity,
          }}
        >
          YOUR
        </div>

        {/* TRANSFORMATION */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 82,
            fontWeight: 900,
            color: COLORS.white,
            letterSpacing: 4,
            textTransform: "uppercase",
            lineHeight: 1.1,
            transform: `translateY(${line2Y}px)`,
            opacity: line2Opacity,
            textAlign: "center",
          }}
        >
          TRANSFORMATION
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: lineWidth,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
            marginTop: 25,
            marginBottom: 25,
          }}
        />

        {/* STARTS TODAY */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 78,
            fontWeight: 800,
            color: COLORS.gold,
            letterSpacing: 6,
            textTransform: "uppercase",
            transform: `scale(${line3Scale})`,
            opacity: line3Opacity,
            textShadow: `0 0 40px ${COLORS.gold}40`,
          }}
        >
          STARTS TODAY
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
