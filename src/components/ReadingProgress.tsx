import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  const scaleX = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const readProgress = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(readProgress);
      scaleX.set(readProgress);
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, [scaleX]);

  return (
    <motion.div
      className="fixed top-16 left-0 right-0 h-[2px] bg-primary origin-left z-50"
      style={{ scaleX }}
    />
  );
};

export default ReadingProgress;
