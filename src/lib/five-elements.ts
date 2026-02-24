import type { Element, ElementData, Mood, UserInput, Result } from "./types";

const ELEMENT_DATA: Record<Element, ElementData> = {
  wood: {
    name: "木",
    chineseName: "Wood",
    emoji: "🪵",
    colors: ["#2D5016", "#4A7C3C", "#6B9654", "#8FB574"],
    primaryColor: "#2D5016",
    roast: "Medium-Dark Roast",
    coffeeOptions: [
      { name: "中深焙手沖單品", description: "中深焙單品手沖", notes: ["焙感飽滿", "木質香氣", "甘醇回甘"] },
      { name: "焙茶拿鐵", description: "烘焙茶咖啡混調", notes: ["溫暖焙感", "堅果香氣", "厚實口感"] },
      { name: "蘋果冰美式", description: "清爽水果調", notes: ["清新果香", "酸甜平衡", "生機感"] },
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
      { name: "中焙手沖單品", description: "中焙單品手沖", notes: ["明亮酸質", "果香奔放", "層次豐富"] },
      { name: "紅心芭樂冰美式", description: "熱帶水果調", notes: ["果香奔放", "甜感層次", "活躍口感"] },
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
      { name: "卡布奇諾", description: "經典義式奶咖", notes: ["綿密奶泡", "醇厚咖啡", "溫潤平衡"] },
      { name: "冰磚拿鐵", description: "咖啡冰磚牛奶", notes: ["漸層口感", "濃淡變化", "沁涼滑順"] },
      { name: "海鹽焦糖燕麥拿鐵", description: "燕麥奶特調", notes: ["海鹽微鹹", "焦糖甜感", "植物奶香"] },
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
      { name: "西西里咖啡", description: "檸檬義式咖啡", notes: ["檸檬酸爽", "咖啡苦韻", "明亮果斷"] },
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
    roast: "Light Roast",
    coffeeOptions: [
      { name: "淺焙手沖單品", description: "淺焙單品手沖", notes: ["花香細緻", "明亮酸質", "茶感優雅"] },
      { name: "美式咖啡", description: "經典美式", notes: ["純粹咖啡", "清爽乾淨", "層次分明"] },
      { name: "生椰冰美式", description: "椰子水美式", notes: ["椰香清甜", "冰爽解膩", "熱帶氣息"] },
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
