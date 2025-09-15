import { useEffect } from "react";

function CursorEffects() {
  useEffect(() => {
    const isTouch = window.matchMedia(
      "(hover: none) and (pointer: coarse)"
    ).matches;
    if (isTouch) return;

    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    document.body.appendChild(dot);

    const moveHandler = (e) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;

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

  return null;
}

export default CursorEffects;
