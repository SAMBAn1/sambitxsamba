import { useEffect, useRef, useState, useCallback } from "react";
import portraitSrc from "@/assets/portrait.jpg";

const PRIMARY_GREEN = "hsl(142, 72%, 45%)";
const DIM_GREEN = "hsl(142, 72%, 20%)";
const DARK_GREEN = "hsl(142, 72%, 10%)";
const BG_COLOR = "hsl(220, 20%, 4%)";
const GHOST_COLORS = [
  "hsl(142, 90%, 55%)",
  "hsl(160, 70%, 45%)",
  "hsl(120, 60%, 40%)",
  "hsl(180, 65%, 42%)",
];

interface Point {
  x: number;
  y: number;
}

const PacmanPortrait = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const [loading, setLoading] = useState(true);
  const [loadText, setLoadText] = useState("");
  const pathRef = useRef<Point[]>([]);
  const imageLoadedRef = useRef(false);
  const portraitDataRef = useRef<ImageData | null>(null);

  // Loading sequence
  useEffect(() => {
    const fullText = "> sambit.exe loading...";
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setLoadText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 600);
      }
    }, 70);
    return () => clearInterval(interval);
  }, []);

  const extractBoundaryPath = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = portraitSrc;

    img.onload = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Draw image to offscreen canvas to sample
      const offscreen = document.createElement("canvas");
      offscreen.width = w;
      offscreen.height = h;
      const offCtx = offscreen.getContext("2d")!;

      // Cover-fit the image
      const imgAspect = img.width / img.height;
      const canvasAspect = w / h;
      let drawW: number, drawH: number, offsetX: number, offsetY: number;
      if (imgAspect > canvasAspect) {
        drawH = h;
        drawW = h * imgAspect;
        offsetX = (w - drawW) / 2;
        offsetY = 0;
      } else {
        drawW = w;
        drawH = w / imgAspect;
        offsetX = 0;
        offsetY = (h - drawH) / 2;
      }

      offCtx.drawImage(img, offsetX, offsetY, drawW, drawH);
      const imageData = offCtx.getImageData(0, 0, w, h);
      portraitDataRef.current = imageData;

      // Create a rectangular boundary path with some maze-like indentations
      // The path follows the portrait boundary
      const margin = Math.min(w, h) * 0.06;
      const innerMargin = margin * 2.5;

      // Build outer rectangular path
      const outerPath: Point[] = [];
      const innerPath: Point[] = [];

      // Outer rectangle (clockwise)
      const steps = 120;
      const ox1 = margin, oy1 = margin;
      const ox2 = w - margin, oy2 = h - margin;

      // Top edge
      for (let i = 0; i <= steps; i++) outerPath.push({ x: ox1 + (ox2 - ox1) * (i / steps), y: oy1 });
      // Right edge
      for (let i = 1; i <= steps; i++) outerPath.push({ x: ox2, y: oy1 + (oy2 - oy1) * (i / steps) });
      // Bottom edge
      for (let i = 1; i <= steps; i++) outerPath.push({ x: ox2 - (ox2 - ox1) * (i / steps), y: oy2 });
      // Left edge
      for (let i = 1; i < steps; i++) outerPath.push({ x: ox1, y: oy2 - (oy2 - oy1) * (i / steps) });

      // Inner rectangle path (for maze feel) -- counter-clockwise
      const ix1 = innerMargin, iy1 = innerMargin;
      const ix2 = w - innerMargin, iy2 = h - innerMargin;
      const innerSteps = 80;

      for (let i = 0; i <= innerSteps; i++) innerPath.push({ x: ix1 + (ix2 - ix1) * (i / innerSteps), y: iy1 });
      for (let i = 1; i <= innerSteps; i++) innerPath.push({ x: ix2, y: iy1 + (iy2 - iy1) * (i / innerSteps) });
      for (let i = 1; i <= innerSteps; i++) innerPath.push({ x: ix2 - (ix2 - ix1) * (i / innerSteps), y: iy2 });
      for (let i = 1; i < innerSteps; i++) innerPath.push({ x: ix1, y: iy2 - (iy2 - iy1) * (i / innerSteps) });

      // Create cross corridors connecting outer to inner
      const midX = w / 2;
      const midY = h / 2;

      // Horizontal corridor (left)
      const corridorH1: Point[] = [
        { x: ox1, y: midY - 4 },
        { x: ix1, y: midY - 4 },
        { x: ix1, y: midY + 4 },
        { x: ox1, y: midY + 4 },
      ];

      // Horizontal corridor (right)
      const corridorH2: Point[] = [
        { x: ix2, y: midY - 4 },
        { x: ox2, y: midY - 4 },
        { x: ox2, y: midY + 4 },
        { x: ix2, y: midY + 4 },
      ];

      // Vertical corridor (top)
      const corridorV1: Point[] = [
        { x: midX - 4, y: oy1 },
        { x: midX - 4, y: iy1 },
        { x: midX + 4, y: iy1 },
        { x: midX + 4, y: oy1 },
      ];

      // Vertical corridor (bottom)
      const corridorV2: Point[] = [
        { x: midX - 4, y: iy2 },
        { x: midX - 4, y: oy2 },
        { x: midX + 4, y: oy2 },
        { x: midX + 4, y: iy2 },
      ];

      // Complete traversal path: outer -> corridor -> inner -> corridor -> outer (figure-8 style)
      // Outer loop → top corridor down → inner loop → bottom corridor down → back to outer
      const fullPath: Point[] = [];

      // Go around outer path
      fullPath.push(...outerPath);

      // Bridge: top middle of outer to top middle of inner
      fullPath.push({ x: midX, y: oy1 });
      fullPath.push({ x: midX, y: iy1 });

      // Go around inner path (reverse for continuous flow)
      fullPath.push(...innerPath.reverse());

      // Bridge: bottom middle of inner to bottom middle of outer
      fullPath.push({ x: midX, y: iy2 });
      fullPath.push({ x: midX, y: oy2 });

      pathRef.current = fullPath;
      imageLoadedRef.current = true;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";

    extractBoundaryPath(canvas, ctx);
  }, [extractBoundaryPath]);

  // Main animation
  useEffect(() => {
    if (loading) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    let pacmanPos = 0; // position along path (0 to path.length)
    const speed = 1.8;
    const ghostOffsets = [-30, -55, -80, -105]; // behind pacman
    let frame = 0;
    let dotsEaten = new Set<number>();
    let scanY = 0;

    const drawMazeWalls = () => {
      const path = pathRef.current;
      if (path.length < 2) return;

      ctx.strokeStyle = DIM_GREEN;
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 4;
      ctx.shadowColor = PRIMARY_GREEN;

      // Draw outer rectangle
      const margin = Math.min(w, h) * 0.06;
      const innerMargin = margin * 2.5;

      // Outer walls
      ctx.beginPath();
      ctx.rect(margin, margin, w - margin * 2, h - margin * 2);
      ctx.stroke();

      // Inner walls
      ctx.beginPath();
      ctx.rect(innerMargin, innerMargin, w - innerMargin * 2, h - innerMargin * 2);
      ctx.stroke();

      // Cross corridors
      const midX = w / 2;
      const midY = h / 2;
      const gapW = 8;

      // Top corridor
      ctx.beginPath();
      ctx.moveTo(midX - gapW, margin);
      ctx.lineTo(midX - gapW, innerMargin);
      ctx.moveTo(midX + gapW, margin);
      ctx.lineTo(midX + gapW, innerMargin);
      ctx.stroke();

      // Bottom corridor
      ctx.beginPath();
      ctx.moveTo(midX - gapW, h - innerMargin);
      ctx.lineTo(midX - gapW, h - margin);
      ctx.moveTo(midX + gapW, h - innerMargin);
      ctx.lineTo(midX + gapW, h - margin);
      ctx.stroke();

      // Left corridor
      ctx.beginPath();
      ctx.moveTo(margin, midY - gapW);
      ctx.lineTo(innerMargin, midY - gapW);
      ctx.moveTo(margin, midY + gapW);
      ctx.lineTo(innerMargin, midY + gapW);
      ctx.stroke();

      // Right corridor
      ctx.beginPath();
      ctx.moveTo(w - innerMargin, midY - gapW);
      ctx.lineTo(w - margin, midY - gapW);
      ctx.moveTo(w - innerMargin, midY + gapW);
      ctx.lineTo(w - margin, midY + gapW);
      ctx.stroke();

      ctx.shadowBlur = 0;
    };

    const drawDots = () => {
      const path = pathRef.current;
      if (path.length < 2) return;

      for (let i = 0; i < path.length; i += 8) {
        if (dotsEaten.has(i)) continue;
        const p = path[i];
        ctx.fillStyle = DIM_GREEN;
        ctx.shadowBlur = 2;
        ctx.shadowColor = PRIMARY_GREEN;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    const drawPacman = (pos: number) => {
      const path = pathRef.current;
      if (path.length < 2) return;

      const idx = Math.floor(pos) % path.length;
      const nextIdx = (idx + 1) % path.length;
      const p = path[idx];
      const next = path[nextIdx];

      const angle = Math.atan2(next.y - p.y, next.x - p.x);
      const mouthOpen = Math.abs(Math.sin(frame * 0.15)) * 0.8;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(angle);

      // Glow
      ctx.shadowBlur = 12;
      ctx.shadowColor = PRIMARY_GREEN;

      // Body
      ctx.fillStyle = PRIMARY_GREEN;
      ctx.beginPath();
      ctx.arc(0, 0, 8, mouthOpen, Math.PI * 2 - mouthOpen);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.restore();

      // Eat dots near pacman
      for (let i = 0; i < path.length; i += 8) {
        const dp = path[i];
        const dx = dp.x - p.x;
        const dy = dp.y - p.y;
        if (dx * dx + dy * dy < 100) {
          dotsEaten.add(i);
        }
      }
    };

    const drawGhost = (pos: number, colorIdx: number) => {
      const path = pathRef.current;
      if (path.length < 2) return;

      const idx = ((Math.floor(pos) % path.length) + path.length) % path.length;
      const p = path[idx];

      ctx.save();
      ctx.translate(p.x, p.y);

      ctx.shadowBlur = 8;
      ctx.shadowColor = GHOST_COLORS[colorIdx];

      // Ghost body
      ctx.fillStyle = GHOST_COLORS[colorIdx];
      ctx.beginPath();
      ctx.arc(0, -3, 7, Math.PI, 0, false);
      ctx.lineTo(7, 5);

      // Wavy bottom
      const wave = Math.sin(frame * 0.2) * 2;
      ctx.lineTo(5, 3 + wave);
      ctx.lineTo(3, 5);
      ctx.lineTo(1, 3 - wave);
      ctx.lineTo(-1, 5);
      ctx.lineTo(-3, 3 + wave);
      ctx.lineTo(-5, 5);
      ctx.lineTo(-7, 3 - wave);
      ctx.lineTo(-7, 5);
      ctx.closePath();
      ctx.fill();

      // Eyes
      ctx.fillStyle = BG_COLOR;
      ctx.beginPath();
      ctx.arc(-3, -4, 2, 0, Math.PI * 2);
      ctx.arc(3, -4, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = PRIMARY_GREEN;
      ctx.beginPath();
      ctx.arc(-2.5, -4, 1, 0, Math.PI * 2);
      ctx.arc(3.5, -4, 1, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.restore();
    };

    const drawPortraitSilhouette = () => {
      const imgData = portraitDataRef.current;
      if (!imgData) return;

      // Draw faint portrait silhouette in the center
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;

      ctx.save();
      ctx.globalAlpha = 0.06;
      const offscreen = document.createElement("canvas");
      offscreen.width = imgData.width;
      offscreen.height = imgData.height;
      const offCtx = offscreen.getContext("2d")!;
      offCtx.putImageData(imgData, 0, 0);

      // Greenify
      const tempData = offCtx.getImageData(0, 0, imgData.width, imgData.height);
      const d = tempData.data;
      for (let i = 0; i < d.length; i += 4) {
        const brightness = (d[i] + d[i + 1] + d[i + 2]) / 3;
        d[i] = 0;             // R
        d[i + 1] = Math.floor(brightness * 0.8); // G
        d[i + 2] = 0;         // B
      }
      offCtx.putImageData(tempData, 0, 0);

      ctx.drawImage(offscreen, 0, 0, cw, ch);
      ctx.globalAlpha = 1;
      ctx.restore();
    };

    const drawScanline = () => {
      scanY = (scanY + 0.5) % h;
      const gradient = ctx.createLinearGradient(0, scanY - 15, 0, scanY + 15);
      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(0.5, "hsla(142, 72%, 45%, 0.08)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 15, w, 30);
    };

    const drawOverlayText = () => {
      ctx.font = "9px 'Space Grotesk', monospace";
      ctx.fillStyle = "hsla(142, 72%, 45%, 0.5)";
      ctx.shadowBlur = 4;
      ctx.shadowColor = PRIMARY_GREEN;

      const margin = Math.min(w, h) * 0.06;
      ctx.fillText("> sambit.exe", margin + 6, h - margin - 8);

      // Score-like display
      const score = dotsEaten.size * 10;
      ctx.fillText(`SCORE: ${String(score).padStart(6, "0")}`, w - margin - 100, margin + 14);

      // Blinking cursor
      if (Math.floor(frame / 30) % 2 === 0) {
        const textW = ctx.measureText("> sambit.exe").width;
        ctx.fillRect(margin + 6 + textW + 2, h - margin - 16, 6, 10);
      }

      ctx.shadowBlur = 0;
    };

    const drawCRT = () => {
      // Scanlines
      ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
      for (let y = 0; y < h; y += 3) {
        ctx.fillRect(0, y, w, 1);
      }

      // Vignette
      const gradient = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.7);
      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.4)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    };

    const animate = () => {
      if (!imageLoadedRef.current) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      // Background
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, w, h);

      drawPortraitSilhouette();
      drawMazeWalls();
      drawDots();

      // Move pacman
      pacmanPos += speed;
      if (pacmanPos >= pathRef.current.length) {
        pacmanPos = 0;
        dotsEaten = new Set();
      }

      drawPacman(pacmanPos);

      // Draw ghosts behind pacman
      for (let i = 0; i < 4; i++) {
        drawGhost(pacmanPos + ghostOffsets[i], i);
      }

      drawScanline();
      drawOverlayText();
      drawCRT();

      frame++;
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [loading]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-end justify-start z-10 rounded-sm"
          style={{ background: BG_COLOR }}
        >
          <div className="p-4 font-body text-xs tracking-widest"
            style={{
              color: PRIMARY_GREEN,
              textShadow: `0 0 8px hsla(142, 72%, 45%, 0.5)`,
            }}
          >
            {loadText}
            <span className="inline-block w-1.5 h-3 ml-0.5 animate-pulse"
              style={{ backgroundColor: PRIMARY_GREEN }}
            />
          </div>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-sm"
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-primary opacity-60" />
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-primary opacity-60" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-primary opacity-60" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-primary opacity-60" />
    </div>
  );
};

export default PacmanPortrait;
