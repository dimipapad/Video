import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const ProgressRing: React.FC<{
  size: number;
  strokeWidth: number;
  color: string;
  progress: number;
  delay?: number;
}> = ({ size, strokeWidth, color, progress, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const animatedProgress = spring({
    fps,
    frame: frame - delay,
    config: { damping: 60, mass: 1 },
    from: 0,
    to: progress,
  });

  const scale = spring({
    fps,
    frame: frame - delay,
    config: { damping: 80, mass: 0.5 },
  });

  const rotation = interpolate(frame, [delay, delay + 30], [-90, -90]);

  const offset = circumference - animatedProgress * circumference;

  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `scale(${scale})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width={size} height={size} style={{ transform: `rotate(${rotation}deg)` }}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          fontSize: size * 0.28,
          fontWeight: "bold",
          color: "#FFFFFF",
          fontFamily: "SF Pro Display, Helvetica Neue, Arial, sans-serif",
        }}
      >
        {Math.round(animatedProgress * 100)}%
      </div>
    </div>
  );
};
