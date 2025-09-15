import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./IntroTransition";
import CursorEffects from "./CursorEffect";
import Introo from "./Intro";
import GlitchText from "./GlitchEffect";

function EntryFlow() {
  const [stage, setStage] = useState("entry");
  const [dots, setDots] = useState("");
  const [fall, setFall] = useState(false);

  // handle dots animation
  useEffect(() => {
    if (stage === "transition") {
      let count = 0;
      const interval = setInterval(() => {
        count++;
        if (count <= 3) {
          setDots(".".repeat(count));
        }
        if (count === 3) {
          clearInterval(interval);
          setTimeout(() => setFall(true), 800);
          setTimeout(() => setStage("intro"), 2000);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [stage]);

  return (
    <>
      {stage === "entry" && (
        <div
          className="min-h-screen flex flex-col items-center justify-center text-center font-mono overflow-hidden animate-flickerBg"
          onClick={() => setStage("transition")}
        >
          <h1
            className="relative text-5xl font-extrabold mb-6 text-red-500 transition-all duration-500"
            style={{ textShadow: "0 0 8px red, 0 0 18px darkred" }}
          >
            <GlitchText text={`Hello${dots}`} />
            <span className={fall ? "falling-dot" : ""}></span>
          </h1>
          <p className="mt-4 text-sm text-gray-400 animate-pulse">
            Click to enter
          </p>
        </div>
      )}

      {stage === "transition" && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-center font-mono overflow-hidden">
          <h1
            className={`relative text-5xl font-extrabold mb-6 text-red-500 transition-transform duration-1000 ${
              fall ? "move-down" : ""
            }`}
            style={{ textShadow: "0 0 8px red, 0 0 18px darkred" }}
          >
            <GlitchText text={`Hello${dots}`} />
            <span className={fall ? "falling-dot" : ""}></span>
          </h1>
        </div>
      )}

      {stage === "intro" && <Intro />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <CursorEffects />
      <Routes>
        <Route path="/" element={<EntryFlow />} />
        <Route path="/intro" element={<Introo />} />
      </Routes>
    </Router>
  );
}
