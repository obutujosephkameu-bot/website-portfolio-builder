import { useEffect, useState } from "react";

interface Props {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
}

const Typewriter = ({ words, className = "", typingSpeed = 80, deletingSpeed = 45, pause = 1400 }: Props) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => i + 1);
      return;
    }
    const t = setTimeout(() => {
      setText((prev) => (deleting ? prev.slice(0, -1) : word.slice(0, prev.length + 1)));
    }, deleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(t);
  }, [text, deleting, index, words, typingSpeed, deletingSpeed, pause]);

  return (
    <span className={className}>
      {text}
      <span className="caret h-[0.9em] align-middle" />
    </span>
  );
};

export default Typewriter;
