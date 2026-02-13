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

export const SceneClosing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Glow pulse
  const glowPulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.3, 0.7]);

  // Heart entrance
  const heartScale = spring({
    fps,
    frame: frame - 5,
    config: { damping: 30, mass: 0.4 },
  });

  // Main text
  const mainOpacity = spring({ fps, frame: frame - 15, config: { damping: 80 } });
  const mainY = spring({
    fps,
    frame: frame - 15,
    config: { damping: 60 },
    from: 60,
    to: 0,
  });

  // Subtext
  const subOpacity = spring({ fps, frame: frame - 35, config: { damping: 80 } });
  const subY = spring({
    fps,
    frame: frame - 35,
    config: { damping: 60 },
    from: 40,
    to: 0,
  });

  // CTA button
  const ctaScale = spring({
    fps,
    frame: frame - 55,
    config: { damping: 40, mass: 0.5 },
  });
  const ctaOpacity = spring({ fps, frame: frame - 55, config: { damping: 80 } });

  // Follow text
  const followOpacity = spring({ fps, frame: frame - 70, config: { damping: 80 } });

  // Final fade
  const fadeOut = interpolate(frame, [105, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.plum}80 0%, ${COLORS.darkBg} 70%)`,
        opacity: fadeOut,
      }}
    >
      <ParticleField count={50} color={COLORS.gold} seed="closing" />

      {/* Center glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.rose}${Math.round(glowPulse * 30).toString().padStart(2, "0")} 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 80px",
          gap: 30,
        }}
      >
        {/* Heart */}
        <div
          style={{
            fontSize: 100,
            transform: `scale(${heartScale})`,
            marginBottom: 10,
          }}
        >
          💪
        </div>

        {/* Main text */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 72,
            fontWeight: 900,
            color: COLORS.white,
            textAlign: "center",
            lineHeight: 1.2,
            textTransform: "uppercase",
            opacity: mainOpacity,
            transform: `translateY(${mainY}px)`,
          }}
        >
          YOU ARE
          <br />
          <span
            style={{
              color: COLORS.gold,
              textShadow: `0 0 30px ${COLORS.gold}50`,
            }}
          >
            STRONGER
          </span>
          <br />
          THAN YOU THINK
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: 300,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
            opacity: subOpacity,
          }}
        />

        {/* Sub text */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 34,
            fontWeight: 300,
            color: COLORS.softPink,
            textAlign: "center",
            lineHeight: 1.6,
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
          }}
        >
          Every day is a new chance
          <br />
          to become who you want to be
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: 30,
            padding: "22px 70px",
            borderRadius: 50,
            background: `linear-gradient(135deg, ${COLORS.rose}, ${COLORS.coral})`,
            fontFamily: FONT_FAMILY,
            fontSize: 34,
            fontWeight: 700,
            color: COLORS.white,
            textTransform: "uppercase",
            letterSpacing: 4,
            transform: `scale(${ctaScale})`,
            opacity: ctaOpacity,
            boxShadow: `0 8px 30px ${COLORS.rose}60`,
          }}
        >
          SAVE & SHARE
        </div>

        {/* Follow text */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 28,
            fontWeight: 400,
            color: COLORS.softPink,
            opacity: followOpacity,
            letterSpacing: 3,
            marginTop: 10,
          }}
        >
          Follow for daily motivation ✨
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
