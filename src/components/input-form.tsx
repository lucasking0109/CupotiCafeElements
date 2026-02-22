"use client";

import { useState } from "react";
import { Calendar, Heart } from "lucide-react";
import type { Mood, UserInput } from "@/lib/types";

const MOODS: { value: Mood; label: string; icon: string }[] = [
  { value: "joyful", label: "喜悅", icon: "✨" },
  { value: "calm", label: "平靜", icon: "🌊" },
  { value: "tired", label: "疲憊", icon: "🌙" },
  { value: "anxious", label: "焦慮", icon: "⚡" },
];

interface InputFormProps {
  onSubmit: (input: UserInput) => void;
}

export function InputForm({ onSubmit }: InputFormProps) {
  const [birthday, setBirthday] = useState("");
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthday && selectedMood) {
      onSubmit({
        birthday: new Date(birthday),
        mood: selectedMood,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-10 backdrop-blur-2xl bg-white/5 p-12 rounded-2xl shadow-2xl border border-white/10"
      >
        <div className="text-center space-y-3">
          <h1
            className="text-5xl font-light text-white"
            style={{ fontFamily: "var(--font-playfair), Playfair Display, serif" }}
          >
            Cupoti Cafe
          </h1>
          <p className="text-white/60 text-sm tracking-widest">
            五行能量飲品指南 | Coffee Energy Matrix
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-white/80 text-sm tracking-wide">
              <Calendar size={16} className="text-[#001489]" />
              生日
            </label>
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
              aria-label="選擇生日日期"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#001489]/50 backdrop-blur-sm transition-all"
            />
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-white/80 text-sm tracking-wide">
              <Heart size={16} className="text-[#001489]" />
              當前情緒
            </label>
            <div className="grid grid-cols-4 gap-3">
              {MOODS.map((mood) => (
                <button
                  key={mood.value}
                  type="button"
                  onClick={() => setSelectedMood(mood.value)}
                  className={`py-4 rounded-lg transition-all duration-300 ${
                    selectedMood === mood.value
                      ? "bg-[#001489] text-white shadow-lg scale-105"
                      : "bg-white/10 text-white/80 hover:bg-white/15"
                  } border ${
                    selectedMood === mood.value
                      ? "border-[#001489]"
                      : "border-white/20"
                  }`}
                >
                  <div className="text-2xl mb-1">{mood.icon}</div>
                  <div className="text-xs font-light">{mood.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!birthday || !selectedMood}
          className="w-full py-4 rounded-lg bg-[#001489] hover:bg-[#001489]/90 disabled:bg-white/5 disabled:cursor-not-allowed text-white font-light tracking-wider transition-all"
        >
          探索能量飲品
        </button>
      </form>
    </div>
  );
}
