import { motion } from "framer-motion";
import { useState } from "react";

/* ── Enhanced interactive display model with hover states ── */
const InteractiveDisplayModels = () => {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  const backlitLayers = [
    { id: "backlight", label: "Backlight source", desc: "LEDs or fluorescent tubes behind the panel provide uniform white light." },
    { id: "lcd", label: "LCD / crystal layer", desc: "Liquid crystals twist to control how much light passes through each sub-pixel." },
    { id: "color", label: "Color filter", desc: "Red, green, and blue filters give each sub-pixel its color." },
    { id: "image", label: "Final image", desc: "The shaped, filtered light reaches your eyes as the visible image." },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6 my-16">
      {/* Backlit */}
      <div className="border border-border rounded-sm p-8 bg-card">
        <p className="text-primary text-xs font-body tracking-[0.2em] uppercase mb-6">Backlit Display</p>
        <div className="flex flex-col items-center gap-2 my-6">
          {backlitLayers.map((layer, i) => (
            <div key={layer.id} className="flex flex-col items-center">
              {i > 0 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  className="w-px h-4 bg-primary/30 origin-top"
                />
              )}
              <motion.div
                onHoverStart={() => setHoveredLayer(layer.id)}
                onHoverEnd={() => setHoveredLayer(null)}
                className={`w-48 py-2 border rounded-sm flex items-center justify-center cursor-default transition-all duration-300 ${
                  hoveredLayer === layer.id
                    ? "border-primary/50 bg-primary/[0.06]"
                    : i === 0
                    ? "border-muted-foreground/30 bg-muted-foreground/[0.05]"
                    : i === backlitLayers.length - 1
                    ? "border-foreground/20 bg-foreground/[0.03]"
                    : "border-primary/20 bg-primary/[0.03]"
                }`}
              >
                <span className={`text-[10px] font-body transition-colors duration-300 ${
                  hoveredLayer === layer.id ? "text-primary" : "text-muted-foreground"
                }`}>
                  {layer.label}
                </span>
              </motion.div>
              {hoveredLayer === layer.id && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] font-body text-muted-foreground/60 mt-1 max-w-[200px] text-center"
                >
                  {layer.desc}
                </motion.p>
              )}
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground font-body text-center mt-4">
          Light passes through layers to form the image. TN, IPS, VA all use this model.
        </p>
      </div>

      {/* Self-emissive */}
      <div className="border border-primary/30 rounded-sm p-8 bg-card">
        <p className="text-primary text-xs font-body tracking-[0.2em] uppercase mb-6">Self-Emissive Display</p>
        <div className="flex flex-col items-center gap-3 my-6">
          <div className="grid grid-cols-6 gap-1 my-4">
            {Array.from({ length: 24 }).map((_, i) => {
              const isOff = i % 5 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: isOff ? 0 : 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={!isOff ? { scale: 1.3, backgroundColor: "hsl(142, 72%, 45%)" } : {}}
                  className={`w-5 h-5 rounded-sm cursor-default transition-colors ${
                    isOff ? "bg-background border border-muted-foreground/20" : "bg-primary/60"
                  }`}
                />
              );
            })}
          </div>
          <p className="text-[10px] font-body text-muted-foreground/40 italic">
            Hover a pixel — dark ones are truly off
          </p>
        </div>
        <p className="text-sm text-muted-foreground font-body text-center mt-4">
          Each pixel emits its own light — or turns off completely for true black. OLED uses this model.
        </p>
      </div>
    </div>
  );
};

export default InteractiveDisplayModels;
