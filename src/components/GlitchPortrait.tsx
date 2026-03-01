import { useRef, useState, useCallback, useEffect } from "react";
import portraitSrc from "@/assets/portrait.jpg";

const GlitchPortrait = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const [time, setTime] = useState(0);

  // Continuous subtle animation
  useEffect(() => {
    let frame: number;
    const tick = () => {
      setTime((t) => t + 0.02);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
    setTilt({ x: (y - 0.5) * -25, y: (x - 0.5) * 25 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setMousePos({ x: 0.5, y: 0.5 });
    setIsHovered(false);
  }, []);

  const breathe = Math.sin(time) * 0.5;

  return (
    <div
      ref={containerRef}
      className={`relative cursor-crosshair ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full h-full rounded-sm overflow-hidden"
        style={{
          transform: `rotateX(${tilt.x + breathe}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? "transform 0.08s ease-out" : "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Main image */}
        <img
          src={portraitSrc}
          alt="Sambit Samantaray"
          className="w-full h-full object-cover"
          draggable={false}
        />

        {/* Holographic shimmer overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              ${135 + mousePos.x * 90}deg,
              hsla(142, 80%, 50%, 0) 0%,
              hsla(142, 80%, 50%, 0.08) 20%,
              hsla(160, 70%, 55%, 0.12) 40%,
              hsla(180, 60%, 50%, 0.08) 60%,
              hsla(142, 80%, 50%, 0) 100%
            )`,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.4s ease",
            mixBlendMode: "overlay",
          }}
        />

        {/* Moving light reflection */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(
              circle at ${mousePos.x * 100}% ${mousePos.y * 100}%,
              hsla(142, 72%, 60%, 0.25) 0%,
              hsla(142, 72%, 45%, 0.08) 30%,
              transparent 60%
            )`,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)",
            opacity: isHovered ? 0.8 : 0.2,
            transition: "opacity 0.4s ease",
          }}
        />

        {/* Edge glow */}
        <div
          className="absolute inset-0 rounded-sm pointer-events-none"
          style={{
            boxShadow: isHovered
              ? "inset 0 0 40px hsla(142, 72%, 45%, 0.2), 0 0 60px hsla(142, 72%, 45%, 0.15), 0 0 120px hsla(142, 72%, 45%, 0.05)"
              : `inset 0 0 15px hsla(142, 72%, 45%, ${0.05 + Math.sin(time * 0.8) * 0.03})`,
            transition: isHovered ? "box-shadow 0.3s ease" : "none",
          }}
        />

        {/* Corner brackets */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: isHovered ? 1 : 0.3,
            transition: "opacity 0.4s ease",
          }}
        >
          <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-primary" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-primary" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-primary" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-primary" />
        </div>

        {/* HUD data */}
        <div
          className="absolute bottom-5 left-5 font-body text-[10px] tracking-[0.3em] uppercase"
          style={{
            color: "hsl(142 72% 45%)",
            opacity: isHovered ? 0.9 : 0,
            transition: "opacity 0.3s ease 0.1s",
            textShadow: "0 0 10px hsla(142, 72%, 45%, 0.6)",
          }}
        >
          &gt; sambit.exe
        </div>

        <div
          className="absolute top-5 right-5 font-body text-[10px] tracking-[0.2em] text-right"
          style={{
            color: "hsl(142 72% 45%)",
            opacity: isHovered ? 0.7 : 0,
            transition: "opacity 0.3s ease 0.15s",
            textShadow: "0 0 8px hsla(142, 72%, 45%, 0.4)",
          }}
        >
          SYS:OK
          <br />
          ID:VERIFIED
        </div>

        {/* Horizontal scan line that moves */}
        <div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            top: `${((time * 30) % 110) - 5}%`,
            background: "linear-gradient(90deg, transparent, hsla(142, 72%, 45%, 0.4), transparent)",
            opacity: isHovered ? 0.6 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
      </div>
    </div>
  );
};

export default GlitchPortrait;
