

# Silhouette Portrait with Interactive Effects

Replace the current GlitchPortrait with a canvas-based **silhouette portrait** that extracts your outline from the photo and renders it with stunning interactive effects.

## Concept

Your portrait will be processed into a **glowing green silhouette** -- like a hacker terminal scan. The silhouette will be composed of:

- **Edge-detected outline** drawn with bright green strokes
- **Interior filled with a subtle dark green wash** 
- **Floating digital rain particles** falling inside the silhouette boundary
- **Mouse proximity distortion** -- edges ripple/displace near the cursor
- **Periodic scan line** sweeping top-to-bottom, briefly revealing the real photo underneath

## How It Works

1. **Load the portrait onto a hidden canvas** and extract brightness data per pixel
2. **Edge detection**: Use a Sobel filter to find the silhouette contour, then render those edges as bright green dots/lines
3. **Matrix rain inside the silhouette**: Small green characters fall within the body boundary, creating a "digital body" feel
4. **Mouse interaction**: As the cursor moves, nearby edge particles scatter and reform, and a radial "reveal" shows a glimpse of the real photo underneath
5. **Scan effect**: A horizontal green line sweeps down periodically, momentarily brightening the silhouette edges it passes

## Technical Plan

### 1. Rewrite `GlitchPortrait.tsx` as a canvas-based `SilhouettePortrait.tsx`

- Use `useRef` for a `<canvas>` element and a hidden `<img>` for source data
- On image load:
  - Draw image to an offscreen canvas
  - Extract pixel data via `getImageData`
  - Compute a brightness map (grayscale per pixel)
  - Run edge detection (Sobel) to get contour points
  - Sample interior points where brightness is below a threshold (inside the body)
- Store two arrays: `edgePoints[]` and `interiorPoints[]`

### 2. Render loop (`requestAnimationFrame`)

- **Background**: Fully transparent/dark
- **Edge points**: Render as small bright green circles (`hsl(142, 72%, 45%)`) with a subtle glow (`shadowBlur`)
- **Interior rain**: A set of "raindrop" characters (katakana or 0/1) that fall downward, constrained to interior points, recycling to the top when they reach the bottom
- **Mouse interaction**: Track mouse position; edge points within a radius get displaced outward; a circular area around the cursor briefly reveals the original image using `clip()` + `drawImage`
- **Scan line**: A horizontal band that moves top-to-bottom every few seconds, intensifying edge glow as it passes

### 3. Update `Hero.tsx`

- Replace `GlitchPortrait` import with `SilhouettePortrait`
- Keep the same `className` and layout props

### Files Changed

| File | Action |
|------|--------|
| `src/components/SilhouettePortrait.tsx` | Create -- canvas-based silhouette with edge detection, matrix rain, mouse reveal |
| `src/components/GlitchPortrait.tsx` | Can be kept or removed (no longer imported) |
| `src/components/Hero.tsx` | Update import to use `SilhouettePortrait` |

