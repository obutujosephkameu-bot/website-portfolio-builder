import { useEffect, useState } from "react";

const CursorBlob = () => {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div className="cursor-blob hidden md:block" style={{ left: pos.x, top: pos.y }} aria-hidden />;
};

export default CursorBlob;
