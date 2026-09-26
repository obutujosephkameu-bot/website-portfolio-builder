import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import XBot from "./XBot";
import CursorBlob from "@/components/effects/CursorBlob";
import useClickSound from "@/hooks/useClickSound";

interface LayoutProps { children: ReactNode; bg?: "default" | "orange" | "dark" | "none"; }

const Layout = ({ children, bg = "default" }: LayoutProps) => {
  useClickSound();
  const bgClass =
    bg === "orange" ? "lumex-orange-bg" :
    bg === "dark" ? "lumex-dark-bg" :
    bg === "none" ? "" :
    "lumex-page-bg";
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className={`fixed inset-0 ${bgClass} opacity-50 pointer-events-none z-0`} />
      <CursorBlob />
      <Navbar />
      <main className="flex-1 pt-[calc(5rem+1.75rem)] relative z-10">{children}</main>
      <Footer />
      <WhatsAppButton />
      <XBot />
    </div>
  );
};

export default Layout;
