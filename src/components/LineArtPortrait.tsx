import { useEffect, useRef, useCallback } from "react";
import portraitSrc from "@/assets/portrait.jpg";

interface EdgePoint {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  brightness: number;
  angle: number;
  phase: number;
}

const EDGE_THRESHOLD = 60;
const SAMPLE_STEP = 3;
const MOUSE_RADIUS = 100;
const RETURN_SPEED = 0.06;
const FRICTION = 0.88;

const LineArtPortrait = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<EdgePoint[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const dimensionsRef = useRef({ w: 0, h: 0 });

  const initPoints = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = portraitSrc;

    img.onload = () => {
      imgRef.current = img;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = rect.height;
      dimensionsRef.current = { w, h };

      // Draw image to sample
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

      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
      const imageData = ctx.getImageData(0, 0, w, h);
      const data = imageData.data;

      // Convert to grayscale
      const gray = new Float32Array(w * h);
      for (let i = 0; i < w * h; i++) {
        const idx = i * 4;
        gray[i] = data[idx] * 0.299 + data[idx + 1] * 0.587 + data[idx + 2] * 0.114;
      }

      // Sobel edge detection
      const edges = new Float32Array(w * h);
      const angles = new Float32Array(w * h);
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const tl = gray[(y - 1) * w + (x - 1)];
          const t = gray[(y - 1) * w + x];
          const tr = gray[(y - 1) * w + (x + 1)];
          const l = gray[y * w + (x - 1)];
          const r = gray[y * w + (x + 1)];
          const bl = gray[(y + 1) * w + (x - 1)];
          const b = gray[(y + 1) * w + x];
          const br = gray[(y + 1) * w + (x + 1)];

          const gx = -tl - 2 * l - bl + tr + 2 * r + br;
          const gy = -tl - 2 * t - tr + bl + 2 * b + br;
          edges[y * w + x] = Math.sqrt(gx * gx + gy * gy);
          angles[y * w + x] = Math.atan2(gy, gx);
        }
      }

      // Sample edge points
      const points: EdgePoint[] = [];
      for (let y = 0; y < h; y += SAMPLE_STEP) {
        for (let x = 0; x < w; x += SAMPLE_STEP) {
          const idx = y * w + x;
          if (edges[idx] > EDGE_THRESHOLD) {
            points.push({
              x, y,
              originX: x,
              originY: y,
              vx: 0, vy: 0,
              brightness: Math.min(edges[idx] / 200, 1),
              angle: angles[idx],
              phase: Math.random() * Math.PI * 2,
            });
          }
        }
      }

      pointsRef.current = points;
    };
  }, []);

  useEffect(() => {
    initPoints();
    const handleResize = () => initPoints();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initPoints]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    };
    const handleTouchEnd = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchend", handleTouchEnd);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;
      const { w, h } = dimensionsRef.current;
      if (!w) { animRef.current = requestAnimationFrame(animate); return; }

      ctx.clearRect(0, 0, w, h);

      const mouse = mouseRef.current;
      const points = pointsRef.current;

      // Scan line
      const scanY = ((t * 0.3) % 1.4 - 0.2) * h;
      const scanWidth = 40;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Mouse interaction - scatter
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 5;
          p.vy += Math.sin(angle) * force * 5;
        }

        // Return to origin with slight oscillation
        const wobble = Math.sin(t * 2 + p.phase) * 0.3;
        p.vx += (p.originX - p.x + wobble) * RETURN_SPEED;
        p.vy += (p.originY - p.y + wobble) * RETURN_SPEED;

        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x += p.vx;
        p.y += p.vy;

        // Brightness modulation
        const displacement = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const pulse = 0.6 + 0.4 * Math.sin(t * 1.5 + p.phase);
        let alpha = p.brightness * pulse;

        // Scan line boost
        const scanDist = Math.abs(p.y - scanY);
        if (scanDist < scanWidth) {
          alpha = Math.min(1, alpha + (1 - scanDist / scanWidth) * 0.6);
        }

        // Mouse proximity glow
        if (dist < MOUSE_RADIUS * 1.5) {
          const glow = 1 - dist / (MOUSE_RADIUS * 1.5);
          alpha = Math.min(1, alpha + glow * 0.4);
        }

        // Scattered particles get brighter
        if (displacement > 1) {
          alpha = Math.min(1, alpha + displacement * 0.05);
        }

        const hue = 142;
        const saturation = 72;
        const lightness = 40 + alpha * 25;

        // Draw as small oriented dash
        const len = 1.5 + p.brightness * 2 + displacement * 0.5;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle + (displacement > 1 ? Math.atan2(p.vy, p.vx) : 0));
        ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        ctx.lineWidth = 0.8 + p.brightness * 0.6;
        ctx.shadowColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha * 0.5})`;
        ctx.shadowBlur = 3 + alpha * 4;
        ctx.beginPath();
        ctx.moveTo(-len, 0);
        ctx.lineTo(len, 0);
        ctx.stroke();
        ctx.restore();
      }

      // Draw scan line
      if (scanY > -scanWidth && scanY < h + scanWidth) {
        const gradient = ctx.createLinearGradient(0, scanY - scanWidth, 0, scanY + scanWidth);
        gradient.addColorStop(0, "hsla(142, 72%, 45%, 0)");
        gradient.addColorStop(0.5, "hsla(142, 72%, 45%, 0.08)");
        gradient.addColorStop(1, "hsla(142, 72%, 45%, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, scanY - scanWidth, w, scanWidth * 2);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default LineArtPortrait;
