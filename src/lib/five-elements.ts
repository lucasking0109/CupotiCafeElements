import type { Element, ElementData, Mood, UserInput, Result } from "./types";

const ELEMENT_DATA: Record<Element, ElementData> = {
  wood: {
    name: "木",
    chineseName: "Wood",
    emoji: "🪵",
    colors: ["#2D5016", "#4A7C3C", "#6B9654", "#8FB574"],
    primaryColor: "#2D5016",
    roast: "Light Roast",
    coffeeOptions: [
      { name: "抹茶拿鐵", description: "淺焙手沖單品", notes: ["新鮮草本", "青檸", "微苦回甘"] },
      { name: "蘋果冰美式", description: "淺焙手沖", notes: ["清新果香", "酸甜平衡", "生機感"] },
    ],
    mantra: "生發之力，自內而外的創造能量",
    energy: "生長・創造・舒展",
  },
  fire: {
    name: "火",
    chineseName: "Fire",
    emoji: "☄️",
    colors: ["#8B2500", "#C73E1D", "#E67E50", "#F4A460"],
    primaryColor: "#8B2500",
    roast: "Medium Roast",
    coffeeOptions: [
      { name: "紅心芭樂冰美式", description: "中焙手沖單品", notes: ["果香奔放", "甜感層次", "活躍口感"] },
      { name: "摩卡咖啡", description: "中焙混調", notes: ["巧克力", "焦糖", "溫暖質感"] },
    ],
    mantra: "赤焰之心，擁抱變化的勇氣",
    energy: "熱烈・激情・轉化",
  },
  earth: {
    name: "土",
    chineseName: "Earth",
    emoji: "🪐",
    colors: ["#6B4423", "#8B6635", "#A68A5C", "#C4A973"],
    primaryColor: "#6B4423",
    roast: "Medium Roast",
    coffeeOptions: [
      { name: "焙茶拿鐵", description: "烘焙茶咖啡混調", notes: ["溫暖焙感", "堅果香氣", "厚實口感"] },
      { name: "焦糖蘋果拿鐵", description: "溫和親切", notes: ["焦糖甜感", "蘋果溫度", "滑順質地"] },
    ],
    mantra: "大地之心，靜觀萬物的穩定力量",
    energy: "穩定・滋養・承載",
  },
  metal: {
    name: "金",
    chineseName: "Metal",
    emoji: "✨",
    colors: ["#5C4A1E", "#7A6530", "#96804A", "#B09A60"],
    primaryColor: "#5C4A1E",
    roast: "Medium+ Roast",
    coffeeOptions: [
      { name: "香橙冰美式", description: "醒神型單品", notes: ["柑橘爽感", "清晰線條", "果香層次"] },
      { name: "濃縮通寧", description: "義式經典", notes: ["檸檬草", "苦感明朗", "礦物感"] },
    ],
    mantra: "白金之鋒，掌握當下的決斷力",
    energy: "凝聚・精準・純粹",
  },
  water: {
    name: "水",
    chineseName: "Water",
    emoji: "💧",
    colors: ["#1A3A52", "#2C5F7F", "#4A8AAE", "#6DB3D8"],
    primaryColor: "#001489",
    roast: "Dark Roast",
    coffeeOptions: [
      { name: "深焙手沖單品", description: "經典美式", notes: ["深邃層次", "黑巧克力", "持久回甘"] },
      { name: "康寶藍 Con Panna", description: "濃縮加冰淇淋", notes: ["濃郁厚實", "冷熱對比", "優雅享受"] },
    ],
    mantra: "深海之智，流動包容的內在力量",
    energy: "流動・智慧・包容",
  },
};

const MOOD_MODIFIERS: Record<Mood, number> = {
  anxious: 0,
  tired: 1,
  calm: 2,
  joyful: 3,
};

function calculateElement(birthday: Date, mood: Mood): Element {
  const month = birthday.getMonth() + 1;
  const day = birthday.getDate();

  const baseValue = (month * day) % 5;
  const moodValue = MOOD_MODIFIERS[mood];
  const finalValue = (baseValue + moodValue) % 5;

  const elements: Element[] = ["wood", "fire", "earth", "metal", "water"];
  return elements[finalValue];
}

function selectCoffeeOption(
  options: ElementData["coffeeOptions"],
  birthday: Date,
) {
  const seed = birthday.getDate() + birthday.getMonth();
  return options[seed % options.length];
}

export function calculateFortune(input: UserInput): Result {
  const element = calculateElement(input.birthday, input.mood);
  const data = ELEMENT_DATA[element];
  const selectedCoffee = selectCoffeeOption(data.coffeeOptions, input.birthday);

  return {
    element,
    data,
    selectedCoffee,
    luckyColor: data.primaryColor,
  };
}

export const DEFAULT_COLORS = ["#001489", "#0D3B66", "#1A5490", "#2E7FB8"];
