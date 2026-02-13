import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_FAMILY } from "./constants";
import { ProgressRing } from "./ProgressRing";

export const SceneQuote2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header entrance
  const headerOpacity = spring({
    fps,
    frame: frame - 5,
    config: { damping: 80 },
  });
  const headerY = spring({
    fps,
    frame: frame - 5,
    config: { damping: 60 },
    from: 40,
    to: 0,
  });

  // Stats entrance
  const stat1Opacity = spring({ fps, frame: frame - 25, config: { damping: 80 } });
  const stat2Opacity = spring({ fps, frame: frame - 40, config: { damping: 80 } });
  const stat3Opacity = spring({ fps, frame: frame - 55, config: { damping: 80 } });

  // Bottom message
  const msgOpacity = spring({ fps, frame: frame - 70, config: { damping: 80 } });
  const msgY = spring({
    fps,
    frame: frame - 70,
    config: { damping: 60 },
    from: 30,
    to: 0,
  });

  // Fade out
  const fadeOut = interpolate(frame, [85, 105], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, #1A0A18 0%, ${COLORS.darkBg} 40%, #1A0520 100%)`,
        opacity: fadeOut,
      }}
    >
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 60px",
          gap: 50,
        }}
      >
        {/* Header */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 52,
            fontWeight: 800,
            color: COLORS.white,
            textTransform: "uppercase",
            letterSpacing: 6,
            textAlign: "center",
            opacity: headerOpacity,
            transform: `translateY(${headerY}px)`,
          }}
        >
          PROGRESS IS
          <br />
          <span style={{ color: COLORS.rose, fontSize: 64 }}>PROGRESS</span>
        </div>

        {/* 3 Progress Rings */}
        <div
          style={{
            display: "flex",
            gap: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ opacity: stat1Opacity, textAlign: "center" }}>
            <ProgressRing
              size={200}
              strokeWidth={12}
              color={COLORS.rose}
              progress={0.75}
              delay={25}
            />
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 26,
                color: COLORS.softPink,
                marginTop: 16,
                fontWeight: 500,
              }}
            >
              Consistency
            </div>
          </div>

          <div style={{ opacity: stat2Opacity, textAlign: "center" }}>
            <ProgressRing
              size={200}
              strokeWidth={12}
              color={COLORS.gold}
              progress={0.6}
              delay={40}
            />
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 26,
                color: COLORS.peach,
                marginTop: 16,
                fontWeight: 500,
              }}
            >
              Nutrition
            </div>
          </div>

          <div style={{ opacity: stat3Opacity, textAlign: "center" }}>
            <ProgressRing
              size={200}
              strokeWidth={12}
              color={COLORS.coral}
              progress={0.85}
              delay={55}
            />
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 26,
                color: COLORS.softPink,
                marginTop: 16,
                fontWeight: 500,
              }}
            >
              Mindset
            </div>
          </div>
        </div>

        {/* Bottom message */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 36,
            fontWeight: 300,
            color: COLORS.offWhite,
            textAlign: "center",
            lineHeight: 1.5,
            opacity: msgOpacity,
            transform: `translateY(${msgY}px)`,
          }}
        >
          Small steps every day
          <br />
          lead to <span style={{ color: COLORS.gold, fontWeight: 700 }}>big results</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
