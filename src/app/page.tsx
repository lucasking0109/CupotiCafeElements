"use client";

import { useState } from "react";
import { ColorFlow } from "@/components/color-flow";
import { InputForm } from "@/components/input-form";
import { ResultDisplay } from "@/components/result-display";
import { calculateFortune, DEFAULT_COLORS } from "@/lib/five-elements";
import type { UserInput, Result } from "@/lib/types";

export default function Home() {
  const [result, setResult] = useState<Result | null>(null);
  const [userInput, setUserInput] = useState<UserInput | null>(null);
  const [colors, setColors] = useState<string[]>(DEFAULT_COLORS);

  const handleSubmit = (input: UserInput) => {
    const fortune = calculateFortune(input);
    setResult(fortune);
    setUserInput(input);
    setColors(fortune.data.colors);
  };

  const handleReset = () => {
    setResult(null);
    setUserInput(null);
    setColors(DEFAULT_COLORS);
  };

  const handleShare = async () => {
    if (!result || !userInput) return;

    const shareText = `Cupoti Cafe Energy Matrix\n\n${result.data.name} Element · ${result.data.roast}\n${result.selectedCoffee.name}\n\n${result.data.mantra}\n\nDiscover your coffee energy #CupotiCafe #CoffeeEnergy #FiveElements`;

    const shareData = {
      title: "Cupoti Cafe - Coffee Energy Matrix",
      text: shareText,
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${shareText}\n\n${window.location.href}`,
        );
        alert("已複製到剪貼簿！");
      }
    } catch {
      // share cancelled by user
    }
  };

  return (
    <>
      <ColorFlow colors={colors} intensity={result ? 0.7 : 1} />
      {!result ? (
        <InputForm onSubmit={handleSubmit} />
      ) : (
        <ResultDisplay
          result={result}
          onReset={handleReset}
          onShare={handleShare}
        />
      )}
    </>
  );
}
