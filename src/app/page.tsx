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

  return (
    <>
      <ColorFlow colors={colors} intensity={result ? 0.7 : 1} />
      {!result ? (
        <InputForm onSubmit={handleSubmit} />
      ) : (
        <ResultDisplay
          result={result}
          onReset={handleReset}
        />
      )}
    </>
  );
}
