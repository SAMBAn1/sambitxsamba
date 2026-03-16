import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const techs = [
  {
    name: "TN",
    color: "★★", viewing: "★", contrast: "★★", speed: "★★★★", blacks: "★",
    use: "Competitive gaming",
    summary: "TN prioritizes speed, often at the cost of viewing comfort and color richness.",
  },
  {
    name: "IPS",
    color: "★★★★", viewing: "★★★★", contrast: "★★★", speed: "★★★", blacks: "★★",
    use: "Creative work, general use",
    summary: "IPS feels like the practical all-rounder for work and everyday visual quality.",
  },
  {
    name: "VA",
    color: "★★★", viewing: "★★★", contrast: "★★★★", speed: "★★", blacks: "★★★",
    use: "Movies, dark content",
    summary: "VA delivers deep contrast for cinematic content but trades some speed for it.",
  },
  {
    name: "OLED",
    color: "★★★★★", viewing: "★★★★★", contrast: "★★★★★", speed: "★★★★★", blacks: "★★★★★",
    use: "Premium everything",
    summary: "OLED delivers the most dramatic image quality because each pixel emits its own light.",
  },
];

const InteractiveTechMatrix = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredTech = techs.find((t) => t.name === hovered);

  return (
    <div className="my-16">
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-body border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 pr-4 text-primary text-xs tracking-[0.15em] uppercase font-normal">Tech</th>
              <th className="text-left py-3 px-4 text-muted-foreground/60 text-xs tracking-[0.15em] uppercase font-normal">Color</th>
              <th className="text-left py-3 px-4 text-muted-foreground/60 text-xs tracking-[0.15em] uppercase font-normal">Viewing</th>
              <th className="text-left py-3 px-4 text-muted-foreground/60 text-xs tracking-[0.15em] uppercase font-normal">Contrast</th>
              <th className="text-left py-3 px-4 text-muted-foreground/60 text-xs tracking-[0.15em] uppercase font-normal">Speed</th>
              <th className="text-left py-3 px-4 text-muted-foreground/60 text-xs tracking-[0.15em] uppercase font-normal">Blacks</th>
              <th className="text-left py-3 pl-4 text-muted-foreground/60 text-xs tracking-[0.15em] uppercase font-normal">Use</th>
            </tr>
          </thead>
          <tbody>
            {techs.map((t) => (
              <tr
                key={t.name}
                onMouseEnter={() => setHovered(t.name)}
                onMouseLeave={() => setHovered(null)}
                className={`border-b border-border/50 transition-colors duration-300 cursor-default ${
                  hovered === t.name ? "bg-primary/[0.04]" : ""
                }`}
              >
                <td className={`py-3 pr-4 font-display transition-colors duration-300 ${
                  hovered === t.name ? "text-primary" : "text-foreground"
                }`}>{t.name}</td>
                <td className="py-3 px-4 text-primary/80">{t.color}</td>
                <td className="py-3 px-4 text-primary/80">{t.viewing}</td>
                <td className="py-3 px-4 text-primary/80">{t.contrast}</td>
                <td className="py-3 px-4 text-primary/80">{t.speed}</td>
                <td className="py-3 px-4 text-primary/80">{t.blacks}</td>
                <td className="py-3 pl-4 text-muted-foreground">{t.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hover summary */}
      <div className="h-12 mt-4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {hoveredTech && (
            <motion.p
              key={hoveredTech.name}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="text-sm font-body text-muted-foreground/60 italic text-center"
            >
              {hoveredTech.summary}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveTechMatrix;
