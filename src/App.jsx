import { useEffect, useState } from "react";

export default function App() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch((g) => !g);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // cursor effect
  useEffect(() => {
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    document.body.appendChild(dot);

    const moveHandler = (e) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;

      // spawn 6–10 sparks each move
      const sparkCount = Math.floor(6 + Math.random() * 5);
      for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement("div");
        spark.className = "spark";
        spark.style.left = `${e.clientX}px`;
        spark.style.top = `${e.clientY}px`;

        spark.style.setProperty("--dx", `${(Math.random() - 0.5) * 120}px`);
        spark.style.setProperty("--dy", `${50 + Math.random() * 100}px`);
        spark.style.setProperty("--duration", `${0.6 + Math.random() * 0.8}s`);

        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 1500);
      }
    };

    window.addEventListener("mousemove", moveHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      dot.remove();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center font-mono overflow-hidden animate-flickerBg">
      <h1
        className={`relative text-5xl font-extrabold mb-6 transition-all duration-150 ${
          glitch ? "text-red-600" : "text-red-400"
        }`}
        style={{ textShadow: "0 0 8px red, 0 0 18px darkred" }}
      >
        <GlitchText text="Hello" />
      </h1>
    </div>
  );
}

// flicker text effect
function GlitchText({ text }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.2) {
        const idx = Math.floor(Math.random() * text.length);
        const chars = [...text];
        const creepyChars = ["#", "%", "@", "¥", "§", "£"];
        chars[idx] = creepyChars[Math.floor(Math.random() * creepyChars.length)];
        setDisplay(chars.join(""));
      } else {
        setDisplay(text);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [text]);

  return <span className="transition-all duration-75">{display}</span>;
}
