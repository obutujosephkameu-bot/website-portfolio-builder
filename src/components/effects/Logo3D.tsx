import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

interface Props { className?: string; size?: number; }

const Logo3D = ({ className = "", size = 220 }: Props) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size, perspective: 800 }}>
      <motion.div
        animate={{ rotateY: [0, 18, 0, -18, 0], y: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 rounded-full blur-3xl bg-secondary/40" />
        <div className="absolute inset-6 rounded-full blur-2xl bg-primary/40" />
        <img
          src={logo}
          alt="Lumex"
          className="relative w-full h-full object-contain animate-logo-pulse"
        />
      </motion.div>
    </div>
  );
};

export default Logo3D;
