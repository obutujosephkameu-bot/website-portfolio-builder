import { motion } from "framer-motion";
import waIcon from "@/assets/whatsapp-icon.svg";

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/254706387820"
      target="_blank"
      rel="noopener noreferrer"
      className="wa-ripple fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lumex-lg"
      style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
      animate={{ y: [0, -8, 0, -4, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
    >
      <img src={waIcon} alt="WhatsApp" className="w-7 h-7" />
    </motion.a>
  );
};

export default WhatsAppButton;
