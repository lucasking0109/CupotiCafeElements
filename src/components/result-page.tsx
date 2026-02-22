"use client";

import type { Element } from "@/lib/five-elements";

interface ElementData {
  element: Element;
  symbol: string;
  roast: string;
  quote: string;
  drinkName: string;
  drinkDescription: string;
  tags: string[];
  gradient: string;
  cardBg: string;
  accentColor: string;
}

const BG_CLASSES: Record<Element, string> = {
  金: "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500",
  木: "bg-gradient-to-br from-green-800 via-green-600 to-green-500",
  水: "bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500",
  火: "bg-gradient-to-br from-orange-700 via-red-500 to-orange-400",
  土: "bg-gradient-to-br from-amber-800 via-yellow-700 to-amber-500",
};

const CARD_COLORS: Record<Element, string> = {
  金: "bg-gray-400/30",
  木: "bg-green-600/30",
  水: "bg-blue-600/30",
  火: "bg-orange-500/30",
  土: "bg-amber-600/30",
};

export function ResultPage({
  data,
  onReset,
}: {
  data: ElementData;
  onReset: () => void;
}) {
  return (
    <main
      className={`min-h-screen flex items-center justify-center p-4 ${BG_CLASSES[data.element]}`}
    >
      <div className="w-full max-w-md animate-fade-in">
        {/* Result Card */}
        <div className="backdrop-blur-xl bg-white/15 rounded-2xl p-8 border border-white/20 shadow-2xl">
          {/* Element Color Block */}
          <div className="flex justify-center mb-6">
            <div
              className={`w-24 h-24 rounded-xl ${CARD_COLORS[data.element]} backdrop-blur-sm border border-white/20 shadow-lg`}
            />
          </div>

          {/* Element Title */}
          <div className="text-center mb-2">
            <h1 className="text-4xl font-light text-white tracking-wider">
              <span className="mr-3">{data.symbol}</span>
              Element
            </h1>
          </div>

          {/* Roast Level */}
          <p className="text-center text-xs text-white/50 tracking-[0.2em] uppercase mb-4">
            {data.roast}
          </p>

          {/* Quote */}
          <p className="text-center text-sm text-white/70 mb-8 tracking-wider">
            【 {data.quote} 】
          </p>

          {/* Drink Name */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-medium text-white mb-1">
              {data.drinkName}
            </h2>
            <p className="text-sm text-white/50">{data.drinkDescription}</p>
          </div>

          {/* Tags */}
          <div className="flex justify-center gap-3 mb-8">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs text-white/70 bg-white/10 rounded-full border border-white/15"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Share Button */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `${data.symbol} Element — ${data.drinkName}`,
                  text: `我的五行咖啡是「${data.drinkName}」！${data.quote}`,
                  url: window.location.href,
                });
              }
            }}
            className="w-full py-4 rounded-lg bg-[#001489] hover:bg-[#001489]/90 text-white font-light tracking-wider transition-all border border-[#001489] mb-4"
          >
            <span className="mr-2">↗</span>
            分享至 Instagram
          </button>

          {/* Reset Button */}
          <button
            onClick={onReset}
            className="w-full py-3 text-white/50 hover:text-white/80 text-sm tracking-wider transition-all"
          >
            ↻ 重新探索
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-white/30 mt-6 tracking-[0.15em]">
          REFLEX BLUE — COFFEE ENERGY MATRIX
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </main>
  );
}
