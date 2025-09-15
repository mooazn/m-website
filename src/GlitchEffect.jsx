import { useEffect, useState } from "react";

// flicker text effect
function GlitchText({ text }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.2) {
        const idx = Math.floor(Math.random() * text.length);
        const chars = [...text];
        const creepyChars = [
          "#",
          "%",
          "@",
          "¥",
          "!",
          "£",
          "&",
          "*",
          "+",
          "?",
          "$",
        ];
        chars[idx] =
          creepyChars[Math.floor(Math.random() * creepyChars.length)];
        setDisplay(chars.join(""));
      } else {
        setDisplay(text);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  return <span className="transition-all duration-75">{display}</span>;
}

export default GlitchText;
