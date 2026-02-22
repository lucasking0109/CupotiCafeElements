"use client";

import { useState } from "react";
import { calculateElement, getElementData, MOODS } from "@/lib/five-elements";
import type { Mood } from "@/lib/five-elements";
import { ResultPage } from "@/components/result-page";

export default function Home() {
  const [birthday, setBirthday] = useState("");
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [result, setResult] = useState<ReturnType<typeof getElementData> | null>(null);

  const canSubmit = birthday && selectedMood;

  function handleExplore() {
    if (!birthday || !selectedMood) return;
    const element = calculateElement(birthday, selectedMood);
    const data = getElementData(element);
    setResult(data);
  }

  function handleReset() {
    setResult(null);
    setBirthday("");
    setSelectedMood(null);
  }

  if (result) {
    return <ResultPage data={result} onReset={handleReset} />;
  }

  return (
    <main className="min-h-screen bg-[#001489] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-white tracking-wider mb-2">
              Reflex Blue
            </h1>
            <p className="text-xs text-white/50 tracking-[0.3em] uppercase">
              Coffee Energy Matrix
            </p>
          </div>

          {/* Birthday Input */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm text-white/70 mb-2">
              <span>📅</span>
              <span>生日</span>
            </label>
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              aria-label="選擇生日日期"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
            />
          </div>

          {/* Mood Selection */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-sm text-white/70 mb-3">
              <span>♡</span>
              <span>當前情緒</span>
            </label>
            <div className="grid grid-cols-4 gap-3">
              {MOODS.map((mood) => (
                <button
                  key={mood.label}
                  onClick={() => setSelectedMood(mood.label)}
                  className={`py-4 rounded-lg transition-all duration-300 border ${
                    selectedMood === mood.label
                      ? "bg-white/25 text-white border-white/40 shadow-lg"
                      : "bg-white/10 text-white/80 hover:bg-white/15 border-white/20"
                  }`}
                >
                  <div className="text-xl mb-1">{mood.emoji}</div>
                  <div className="text-xs">{mood.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleExplore}
            disabled={!canSubmit}
            className={`w-full py-4 rounded-lg font-light tracking-wider transition-all border ${
              canSubmit
                ? "bg-[#001489] hover:bg-[#001489]/90 text-white border-[#001489] cursor-pointer"
                : "bg-white/5 text-white/30 border-white/10 cursor-not-allowed"
            }`}
          >
            探索能量飲品
          </button>
        </div>
      </div>
    </main>
  );
}
