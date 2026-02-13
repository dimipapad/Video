import { AbsoluteFill, Sequence } from "remotion";
import { SCENES } from "./constants";
import { SceneIntro } from "./SceneIntro";
import { SceneQuote1 } from "./SceneQuote1";
import { SceneQuote2 } from "./SceneQuote2";
import { SceneTips } from "./SceneTips";
import { SceneClosing } from "./SceneClosing";

export const WeightLossReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#1A0A10" }}>
      {/* Scene 1: Opening hook (0-4s) */}
      <Sequence
        from={SCENES.intro.from}
        durationInFrames={SCENES.intro.duration}
      >
        <SceneIntro />
      </Sequence>

      {/* Scene 2: Motivational quote (4-7.5s) */}
      <Sequence
        from={SCENES.quote1.from}
        durationInFrames={SCENES.quote1.duration}
      >
        <SceneQuote1 />
      </Sequence>

      {/* Scene 3: Progress visualization (7.5-11s) */}
      <Sequence
        from={SCENES.quote2.from}
        durationInFrames={SCENES.quote2.duration}
      >
        <SceneQuote2 />
      </Sequence>

      {/* Scene 4: Daily habits (11-16s) */}
      <Sequence
        from={SCENES.tips.from}
        durationInFrames={SCENES.tips.duration}
      >
        <SceneTips />
      </Sequence>

      {/* Scene 5: Empowering close + CTA (16-20s) */}
      <Sequence
        from={SCENES.closing.from}
        durationInFrames={SCENES.closing.duration}
      >
        <SceneClosing />
      </Sequence>
    </AbsoluteFill>
  );
};
