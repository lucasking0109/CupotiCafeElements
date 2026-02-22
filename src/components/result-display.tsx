"use client";

import { useRef, useState } from "react";
import { Download, RotateCcw } from "lucide-react";
import html2canvas from "html2canvas";
import type { Result } from "@/lib/types";

interface ResultDisplayProps {
  result: Result;
  onReset: () => void;
}

export function ResultDisplay({ result, onReset }: ResultDisplayProps) {
  const { data, selectedCoffee, luckyColor } = result;
  const captureRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleSaveAndShare = async () => {
    if (!captureRef.current || isCapturing) return;

    setIsCapturing(true);
    try {
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      });

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), "image/png");
      });

      const file = new File([blob], "cupoti-cafe-result.png", { type: "image/png" });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Cupoti Cafe - Coffee Energy Matrix",
          text: `${data.name} Element · ${selectedCoffee.name}`,
        });
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "cupoti-cafe-result.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch {
      // share cancelled or failed
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-8">
        <div ref={captureRef} className="backdrop-blur-2xl bg-white/5 p-12 rounded-2xl shadow-2xl border border-white/10 space-y-10">
          <div className="text-center space-y-8">
            <div
              className="w-40 h-40 mx-auto rounded-2xl shadow-2xl flex items-center justify-center text-7xl"
              style={{
                background: `linear-gradient(135deg, ${luckyColor}, ${data.colors[data.colors.length - 1]})`,
              }}
            >
              {data.emoji}
            </div>

            <div className="space-y-4">
              <h2
                className="text-6xl font-light text-white tracking-wider"
                style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
              >
                {data.name} Element
              </h2>
              <p className="text-white/70 text-lg tracking-widest uppercase">
                {data.roast}
              </p>
              <p className="text-[#001489] text-sm tracking-widest">
                【 {data.mantra} 】
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-10 space-y-8">
            <div className="text-center space-y-4">
              <h3
                className="text-4xl font-light text-white"
                style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
              >
                {selectedCoffee.name}
              </h3>
              <p className="text-white/70 text-lg tracking-wide">
                {selectedCoffee.description}
              </p>
            </div>

            <div className="flex justify-center gap-2 flex-wrap">
              {selectedCoffee.notes.map((note, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-lg bg-white/5 text-white/90 text-sm backdrop-blur-sm border border-white/20"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <button
              onClick={handleSaveAndShare}
              disabled={isCapturing}
              className="w-full py-4 rounded-lg bg-[#001489] hover:bg-[#001489]/90 disabled:bg-[#001489]/50 text-white font-light tracking-wider transition-all flex items-center justify-center gap-2 border border-white/20"
            >
              {isCapturing ? (
                <>處理中...</>
              ) : (
                <>
                  <Download size={20} />
                  儲存並分享圖片
                </>
              )}
            </button>

            <button
              onClick={onReset}
              className="w-full py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 font-light tracking-wide transition-all border border-white/20 flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} />
              重新探索
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-white/50 text-xs tracking-widest">
            Cupoti Cafe — Coffee Energy Matrix
          </p>
        </div>
      </div>
    </div>
  );
}
