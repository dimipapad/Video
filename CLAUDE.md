# CLAUDE.md - Remotion Video Project

## Project Overview

This is a **Remotion** (v4) project for programmatic video creation using React and TypeScript. Videos are defined as React components and rendered frame-by-frame.

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Remotion Studio (live preview in browser) |
| `npm run build` | Bundle the project |
| `npm run lint` | Run ESLint + TypeScript checks |
| `npx remotion render src/index.ts HelloWorld out/video.mp4` | Render the HelloWorld composition to MP4 |
| `npx remotion render src/index.ts OnlyLogo out/logo.mp4` | Render the OnlyLogo composition to MP4 |
| `npx remotion still src/index.ts HelloWorld out/still.png --frame=75` | Export a single frame as image |

## Project Structure

```
src/
├── index.ts              # Entry point - registers RemotionRoot
├── Root.tsx              # Defines all <Composition> entries (sidebar items)
├── HelloWorld.tsx        # Main composition with Logo + Title + Subtitle
└── HelloWorld/
    ├── Arc.tsx           # SVG elliptical arc with gradient stroke animation
    ├── Atom.tsx          # SVG circle with gradient fill (logo center)
    ├── Logo.tsx          # Animated logo combining 3 Arcs + Atom
    ├── Subtitle.tsx      # Fade-in subtitle text
    ├── Title.tsx         # Word-by-word spring-animated title
    └── constants.ts      # Shared constants (COLOR_1, FONT_FAMILY)
remotion.config.ts        # Remotion CLI config (JPEG format, overwrite enabled)
```

## Video Generation Workflow

When asked to generate or create a video, follow this workflow:

### 1. Create the Composition Component

Create a new `.tsx` file in `src/` with your video component:

```tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence } from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

// Define a Zod schema for parametrized props
export const mySchema = z.object({
  // define your props here
});

export const MyVideo: React.FC<z.infer<typeof mySchema>> = (props) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // Use frame, interpolate(), spring() for animations
  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      {/* Video content here */}
    </AbsoluteFill>
  );
};
```

### 2. Register in Root.tsx

Add a `<Composition>` entry in `src/Root.tsx`:

```tsx
<Composition
  id="MyVideo"
  component={MyVideo}
  durationInFrames={150}   // 5 seconds at 30fps
  fps={30}
  width={1920}
  height={1080}
  schema={mySchema}
  defaultProps={{ /* ... */ }}
/>
```

### 3. Render

```bash
npx remotion render src/index.ts MyVideo out/my-video.mp4
```

## Key Remotion APIs

- **`useCurrentFrame()`** - Returns the current frame number (0-indexed)
- **`useVideoConfig()`** - Returns `{ fps, durationInFrames, width, height }`
- **`interpolate(frame, inputRange, outputRange, options?)`** - Map frame numbers to animated values
- **`spring({ frame, fps, config? })`** - Physics-based spring animation (0 to 1)
- **`<Sequence from={N}>`** - Delays children by N frames
- **`<AbsoluteFill>`** - Absolutely positioned full-size container (the building block)
- **`<Audio>`** / **`<Video>`** / **`<Img>`** - Media components
- **`<Series>`** - Play sequences one after another

## Conventions

- **Resolution**: 1920x1080 (Full HD) unless specified otherwise
- **Frame rate**: 30 FPS default
- **Duration**: Specified in frames (e.g., 150 frames = 5 seconds at 30fps)
- **Props validation**: Use Zod schemas (`z.object({...})`) with `@remotion/zod-types` for color props
- **Styling**: Inline CSS via `style` prop (no external CSS files)
- **Animation**: Prefer `spring()` for organic motion, `interpolate()` for linear/eased transitions
- **Output format**: JPEG frames, overwrite enabled (see `remotion.config.ts`)
- **Formatting**: Prettier with 2-space tabs, bracket spacing enabled
- **Linting**: ESLint with `@remotion/eslint-config-flat`
- **TypeScript**: Strict mode, no unused locals, target ES2018

## Tips for AI Video Generation

- Use `<Sequence from={N}>` to stagger element entrances
- Combine `spring()` with `interpolate()` for complex motion paths
- Use SVG for vector graphics and shape animations (see `Arc.tsx`, `Atom.tsx` for examples)
- Extract shared styles/colors into `constants.ts`
- Each `<Composition>` is independently renderable - create separate compositions for different videos
- Use `random(seed)` from remotion for deterministic randomness (important for consistent renders)
- Fade elements out near `durationInFrames` for clean endings
- Props can be overridden at render time via `--props` flag for parametrized rendering
