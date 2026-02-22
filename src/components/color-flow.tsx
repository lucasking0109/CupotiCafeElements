"use client";

interface ColorFlowProps {
  colors: string[];
  intensity?: number;
}

export function ColorFlow({ colors, intensity = 1 }: ColorFlowProps) {
  const gradientStyle = {
    background: `linear-gradient(135deg, ${colors.join(", ")})`,
    backgroundSize: "400% 400%",
    animation: `gradient ${15 / intensity}s ease infinite`,
  };

  return (
    <>
      <div
        className="fixed inset-0 -z-10 transition-all duration-1000"
        style={gradientStyle}
      />
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  );
}
