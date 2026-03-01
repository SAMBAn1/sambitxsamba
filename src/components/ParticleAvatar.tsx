import { useEffect, useRef, useCallback } from "react";
import portraitSrc from "@/assets/portrait.jpg";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

const PARTICLE_GAP = 5;
const MOUSE_RADIUS = 80;
const RETURN_SPEED = 0.08;
const FRICTION = 0.85;

const ParticleAvatar = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animFrameRef = useRef<number>(0);
  const initializedRef = useRef(false);

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = portraitSrc;

    img.onload = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = rect.height;

      // Draw the image to sample pixels
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

      const particles: Particle[] = [];
      // Use primary amber color for particles like the inspiration site uses teal
      const primaryHue = 32;

      for (let y = 0; y < h; y += PARTICLE_GAP) {
        for (let x = 0; x < w; x += PARTICLE_GAP) {
          const i = (Math.floor(y) * w + Math.floor(x)) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          if (a < 128) continue;

          // Calculate brightness
          const brightness = (r + g + b) / 3;

          // Skip very dark pixels (background)
          if (brightness < 30) continue;

          // Map brightness to opacity and saturation
          const normalizedBrightness = brightness / 255;
          const alpha = 0.3 + normalizedBrightness * 0.7;
          const saturation = 70 + normalizedBrightness * 20;
          const lightness = 45 + normalizedBrightness * 20;

          particles.push({
            x: x + (Math.random() - 0.5) * 200,
            y: y + (Math.random() - 0.5) * 200,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
            color: `hsla(${primaryHue}, ${saturation}%, ${lightness}%, ${alpha})`,
            size: 1 + Math.random() * 1.5,
          });
        }
      }

      particlesRef.current = particles;
      initializedRef.current = true;
    };
  }, []);

  useEffect(() => {
    initParticles();

    const handleResize = () => {
      initializedRef.current = false;
      initParticles();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 6;
          p.vy += Math.sin(angle) * force * 6;
        }

        // Return to origin
        p.vx += (p.originX - p.x) * RETURN_SPEED;
        p.vy += (p.originY - p.y) * RETURN_SPEED;

        // Apply friction
        p.vx *= FRICTION;
        p.vy *= FRICTION;

        p.x += p.vx;
        p.y += p.vy;

        // Draw particle as a small dash/line like ASCII art
        ctx.fillStyle = p.color;
        const displacement = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const stretch = Math.min(displacement * 0.8, 4);

        ctx.save();
        ctx.translate(p.x, p.y);
        if (displacement > 0.5) {
          ctx.rotate(Math.atan2(p.vy, p.vx));
        }
        ctx.fillRect(-stretch, -p.size / 2, p.size + stretch * 2, p.size);
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default ParticleAvatar;
