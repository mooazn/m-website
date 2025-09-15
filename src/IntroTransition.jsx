import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GlitchText from "./GlitchEffect";

export default function Intro() {
  const [lines, setLines] = useState([]);
  const [locationLine, setLocationLine] = useState("");
  const [isDone, setIsDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        setLocationLine(
          `I see you’re in ${data.city}, ${data.region}, ${data.country_name}`
        );
      })
      .catch(() => {
        setLocationLine("");
      });
  }, []);

  useEffect(() => {
    setLines([]);

    const script = [
      "Loading...",
      locationLine || "Hope you're having a great day!",
      "Welcome to my website!",
    ];

    const timeouts = [];
    script.forEach((line, idx) => {
      const id = setTimeout(() => {
        setLines((prev) => [...prev, line]);
        if (idx === script.length - 1) {
          setIsDone(true); // mark as finished
        }
      }, idx * 2000);
      timeouts.push(id);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [locationLine]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-red-500 font-mono px-6">
      <div className="max-w-xl w-full text-left">
        {lines.map((line, idx) => (
          <p
            key={idx}
            className="mb-4 animate-fadeIn"
            style={{ textShadow: "0 0 6px red, 0 0 14px darkred" }}
          >
            {line === locationLine && locationLine !== "" ? (
              <GlitchText text={line} />
            ) : (
              line
            )}
          </p>
        ))}
      </div>

      {lines.length > 0 && isDone && (
        <button
          onClick={() => navigate("/intro")}
          className="mt-10 px-6 py-3 border-2 border-red-600 text-red-600 
                     hover:bg-red-700 hover:text-black transition-all duration-300 animate-pulse"
        >
          CONTINUE
        </button>
      )}
    </div>
  );
}
