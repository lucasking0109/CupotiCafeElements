export type Element = "金" | "木" | "水" | "火" | "土";
export type Mood = "焦慮" | "疲憊" | "平靜" | "喜悅";

interface ElementData {
  element: Element;
  symbol: string;
  roast: string;
  quote: string;
  drinkName: string;
  drinkNameEn: string;
  drinkDescription: string;
  tags: string[];
  gradient: string;
  cardBg: string;
  accentColor: string;
}

const ELEMENT_DATA: Record<Element, ElementData> = {
  金: {
    element: "金",
    symbol: "金",
    roast: "MEDIUM+ ROAST",
    quote: "白金之鋒，掌握當下的決斷力",
    drinkName: "香橙冰美式",
    drinkNameEn: "",
    drinkDescription: "醒神型單品",
    tags: ["柑橘爽感", "清晰線條", "果香層次"],
    gradient: "from-gray-300 via-gray-400 to-gray-500",
    cardBg: "rgba(200, 200, 210, 0.25)",
    accentColor: "#9CA3AF",
  },
  木: {
    element: "木",
    symbol: "木",
    roast: "LIGHT ROAST",
    quote: "生發之力，自內而外的創造能量",
    drinkName: "抹茶拿鐵",
    drinkNameEn: "",
    drinkDescription: "淺焙手沖單品",
    tags: ["新鮮草本", "青檸", "微苦回甘"],
    gradient: "from-green-700 via-green-600 to-green-500",
    cardBg: "rgba(34, 120, 60, 0.25)",
    accentColor: "#4ADE80",
  },
  水: {
    element: "水",
    symbol: "水",
    roast: "DARK ROAST",
    quote: "深海之智，流動包容的內在力量",
    drinkName: "康寶藍 Con Panna",
    drinkNameEn: "",
    drinkDescription: "濃縮加冰淇淋",
    tags: ["濃郁厚實", "冷熱對比", "優雅享受"],
    gradient: "from-blue-900 via-blue-700 to-blue-500",
    cardBg: "rgba(30, 64, 175, 0.25)",
    accentColor: "#60A5FA",
  },
  火: {
    element: "火",
    symbol: "火",
    roast: "MEDIUM ROAST",
    quote: "赤焰之心，擁抱變化的勇氣",
    drinkName: "摩卡咖啡",
    drinkNameEn: "",
    drinkDescription: "中焙混調",
    tags: ["巧克力", "焦糖", "溫暖質感"],
    gradient: "from-orange-700 via-red-500 to-orange-400",
    cardBg: "rgba(220, 100, 30, 0.25)",
    accentColor: "#FB923C",
  },
  土: {
    element: "土",
    symbol: "土",
    roast: "MEDIUM ROAST",
    quote: "大地之心，靜觀萬物的穩定力量",
    drinkName: "焙茶拿鐵",
    drinkNameEn: "",
    drinkDescription: "烘焙茶咖啡混調",
    tags: ["溫暖焙感", "堅果香氣", "厚實口感"],
    gradient: "from-amber-800 via-yellow-700 to-amber-500",
    cardBg: "rgba(180, 130, 50, 0.25)",
    accentColor: "#D4A056",
  },
};

// Heavenly Stems (天干) cycle: 甲乙丙丁戊己庚辛壬癸
// 甲乙=木, 丙丁=火, 戊己=土, 庚辛=金, 壬癸=水
const STEM_ELEMENTS: Element[] = ["木", "木", "火", "火", "土", "土", "金", "金", "水", "水"];

// Mood modifiers can shift the element
const MOOD_SHIFT: Record<Mood, Record<Element, Element>> = {
  焦慮: { 金: "金", 木: "木", 水: "水", 火: "土", 土: "土" },
  疲憊: { 金: "木", 木: "木", 水: "水", 火: "火", 土: "土" },
  平靜: { 金: "金", 木: "木", 水: "水", 火: "火", 土: "土" },
  喜悅: { 金: "金", 木: "火", 水: "水", 火: "火", 土: "土" },
};

export function calculateElement(birthday: string, mood: Mood): Element {
  const date = new Date(birthday);
  const year = date.getFullYear();

  // Calculate Heavenly Stem based on year
  // The stem index is determined by (year - 4) % 10
  const stemIndex = ((year - 4) % 10 + 10) % 10;
  const baseElement = STEM_ELEMENTS[stemIndex];

  // Apply mood modifier
  return MOOD_SHIFT[mood][baseElement];
}

export function getElementData(element: Element): ElementData {
  return ELEMENT_DATA[element];
}

export const MOODS: { emoji: string; label: Mood }[] = [
  { emoji: "⚡", label: "焦慮" },
  { emoji: "🌙", label: "疲憊" },
  { emoji: "🌊", label: "平靜" },
  { emoji: "✨", label: "喜悅" },
];
