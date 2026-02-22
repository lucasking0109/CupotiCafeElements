export type Element = "metal" | "wood" | "water" | "fire" | "earth";

export type Mood = "anxious" | "tired" | "calm" | "joyful";

export interface CoffeeOption {
  name: string;
  description: string;
  notes: string[];
}

export interface ElementData {
  name: string;
  chineseName: string;
  emoji: string;
  colors: string[];
  primaryColor: string;
  roast: string;
  coffeeOptions: CoffeeOption[];
  mantra: string;
  energy: string;
}

export interface UserInput {
  birthday: Date;
  mood: Mood;
}

export interface Result {
  element: Element;
  data: ElementData;
  selectedCoffee: CoffeeOption;
  luckyColor: string;
}
