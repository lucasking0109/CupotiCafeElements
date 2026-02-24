"use client";

import { useRef, useState } from "react";
import { Download, Share2, RotateCcw } from "lucide-react";
import { toPng } from "html-to-image";
import type { Result } from "@/lib/types";

interface ResultDisplayProps {
  result: Result;
  onReset: () => void;
  onShare: () => void;
}

export function ResultDisplay({ result, onReset, onShare }: ResultDisplayProps) {
  const { data, selectedCoffee, luckyColor } = result;
  const cardRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);

  const handleSaveCard = async () => {
    if (!storyRef.current) return;
    setSaving(true);
    try {
      const dataUrl = await toPng(storyRef.current, { pixelRatio: 2 });
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], `cupoti-cafe-${data.name}-energy-card.png`, {
        type: "image/png",
      });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file] });
      } else {
        const link = document.createElement("a");
        link.download = file.name;
        link.href = dataUrl;
        link.click();
      }
    } catch {
      alert("儲存失敗，請稍後再試");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-8">
        {/* Visible card */}
        <div
          ref={cardRef}
          className="backdrop-blur-2xl bg-white/5 p-12 rounded-2xl shadow-2xl border border-white/10 space-y-10"
          style={{
            background: `linear-gradient(135deg, ${data.colors[0]}dd, ${data.colors[1]}bb, ${data.colors[2]}99)`,
          }}
        >
          <div className="text-center space-y-8">
            <div
              className="w-40 h-40 mx-auto rounded-2xl flex items-center justify-center text-7xl"
              style={{
                background: `linear-gradient(135deg, ${luckyColor}, ${data.colors[data.colors.length - 1]})`,
                boxShadow: `0 20px 40px -8px ${data.colors[0]}80`,
              }}
            >
              {data.emoji}
            </div>

            <div className="space-y-4">
              <h2
                className="text-6xl font-light text-white tracking-wider"
                style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
              >
                {data.name} 元素
              </h2>
              <p className="text-white/80 text-sm tracking-widest">
                【 {data.mantra} 】
              </p>
            </div>
          </div>

          <div className="border-t border-white/20 pt-10 space-y-8">
            <div className="text-center space-y-4">
              <h3
                className="text-4xl font-light text-white"
                style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
              >
                {selectedCoffee.name}
              </h3>
            </div>

            <div className="flex justify-center gap-2 flex-wrap">
              {selectedCoffee.notes.map((note, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-lg bg-white/10 text-white/90 text-sm backdrop-blur-sm border border-white/20 whitespace-nowrap"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div className="text-center pt-4">
            <p className="text-white/40 text-xs tracking-widest">
              Cupoti Cafe — Coffee Energy Matrix
            </p>
          </div>
        </div>

        {/* Hidden IG Story card (9:16 = 540x960, output 1080x1920 @2x) */}
        <div
          ref={storyRef}
          aria-hidden
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            zIndex: -9999,
            pointerEvents: "none" as const,
            width: 540,
            height: 960,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "60px 30px",
            background: `linear-gradient(160deg, ${data.colors[0]}, ${data.colors[1]} 50%, ${data.colors[2]})`,
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            color: "white",
            textAlign: "center" as const,
          }}
        >
          {/* Inner card frame */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "48px 36px",
              borderRadius: 20,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            }}
          >
            <div
              style={{
                width: 130,
                height: 130,
                borderRadius: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 64,
                background: `linear-gradient(135deg, ${luckyColor}, ${data.colors[data.colors.length - 1]})`,
                boxShadow: `0 12px 24px -4px ${data.colors[0]}50`,
                marginBottom: 28,
              }}
            >
              {data.emoji}
            </div>

            <div style={{ fontSize: 52, fontWeight: 300, letterSpacing: 8, marginBottom: 12 }}>
              {data.name} 元素
            </div>
            <div style={{ fontSize: 14, opacity: 0.75, letterSpacing: 3, marginBottom: 32 }}>
              【 {data.mantra} 】
            </div>

            <div style={{ width: "80%", height: 1, background: "rgba(255,255,255,0.2)", marginBottom: 32 }} />

            <div style={{ fontSize: 36, fontWeight: 300, marginBottom: 24 }}>
              {selectedCoffee.name}
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const, justifyContent: "center" }}>
              {selectedCoffee.notes.map((note, index) => (
                <span
                  key={index}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    fontSize: 15,
                  }}
                >
                  {note}
                </span>
              ))}
            </div>

            <div style={{ marginTop: 32, fontSize: 11, opacity: 0.35, letterSpacing: 3 }}>
              Cupoti Cafe — Coffee Energy Matrix
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleSaveCard}
            disabled={saving}
            className="w-full py-4 rounded-lg bg-[#001489] hover:bg-[#001489]/90 text-white font-light tracking-wider transition-all flex items-center justify-center gap-2 border border-white/20"
          >
            <Download size={20} />
            {saving ? "儲存中..." : "儲存能量色卡"}
          </button>

          <button
            onClick={onShare}
            className="w-full py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 font-light tracking-wide transition-all border border-white/20 flex items-center justify-center gap-2"
          >
            <Share2 size={18} />
            分享連結給好友
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
    </div>
  );
}
