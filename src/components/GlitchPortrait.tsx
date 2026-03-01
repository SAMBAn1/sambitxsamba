import { useRef, useState, useCallback } from "react";
import portraitSrc from "@/assets/portrait.jpg";

const GlitchPortrait = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glitch, setGlitch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -20, y: x * 20 });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    setGlitch(true);
    setTimeout(() => setGlitch(false), 600);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "800px" }}
    >
      <div
        className="relative w-full h-full rounded-sm overflow-hidden"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Main image */}
        <img
          src={portraitSrc}
          alt="Sambit Samantaray"
          className="w-full h-full object-cover"
          style={{
            filter: glitch ? "hue-rotate(90deg) contrast(1.5)" : "none",
            transition: "filter 0.15s ease",
          }}
        />

        {/* Glitch layers */}
        <img
          src={portraitSrc}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-0 pointer-events-none"
          style={{
            opacity: glitch ? 0.6 : 0,
            transform: glitch ? "translate(4px, -2px)" : "none",
            filter: "hue-rotate(120deg) saturate(2)",
            transition: "all 0.1s ease",
          }}
        />
        <img
          src={portraitSrc}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-0 pointer-events-none"
          style={{
            opacity: glitch ? 0.4 : 0,
            transform: glitch ? "translate(-3px, 2px)" : "none",
            filter: "hue-rotate(240deg) saturate(2)",
            transition: "all 0.1s ease",
          }}
        />

        {/* Scanlines overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
            opacity: isHovered ? 1 : 0.3,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Green glow border */}
        <div
          className="absolute inset-0 rounded-sm pointer-events-none"
          style={{
            boxShadow: isHovered
              ? "inset 0 0 30px hsl(142 72% 45% / 0.3), 0 0 40px hsl(142 72% 45% / 0.2)"
              : "inset 0 0 0px transparent",
            transition: "box-shadow 0.4s ease",
          }}
        />

        {/* Corner accents */}
        {isHovered && (
          <>
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-primary opacity-80" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-primary opacity-80" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-primary opacity-80" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-primary opacity-80" />
          </>
        )}

        {/* Data overlay text */}
        <div
          className="absolute bottom-4 left-4 font-body text-xs tracking-widest"
          style={{
            color: "hsl(142 72% 45%)",
            opacity: isHovered ? 0.8 : 0,
            transition: "opacity 0.3s ease",
            textShadow: "0 0 8px hsl(142 72% 45% / 0.5)",
          }}
        >
          &gt; SAMBIT.EXE
        </div>
      </div>
    </div>
  );
};

export default GlitchPortrait;
