export type FilterMode = "week" | "day" | "month" | "category";

export type DayKey =
  | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export const DAY_LABEL_TH: Record<DayKey, string> = {
  Monday: "วันจันทร์",
  Tuesday: "วันอังคาร",
  Wednesday: "วันพุธ",
  Thursday: "วันพฤหัสบดี",
  Friday: "วันศุกร์",
  Saturday: "วันเสาร์",
  Sunday: "วันอาทิตย์",
};

export type Category =
  | "การบำรุงรักษา"
  | "กิจกรรม"
  | "ประกาศสำคัญ"
  | "การก่อสร้าง"
  | "สุขภาพ";

export const CATEGORIES: Category[] = [
  "การบำรุงรักษา",
  "กิจกรรม",
  "ประกาศสำคัญ",
  "การก่อสร้าง",
  "สุขภาพ",
];

export type Attachment = {
  id: string;
  label: string;
  ext: string;
  url?: string;
};

export type Tag =
  | { kind: "status"; text: "กำหนดการ" | "ประกาศ" | "แจ้งเตือน" }
  | { kind: "priority"; text: "สำคัญ" }
  | { kind: "custom"; text: string };

export type NewsItem = {
  id: string;
  title: string;
  time?: string;
  date?: string;       // YYYY-MM-DD (ใช้โหมดเดือน)
  category: Category;  // ✅ บังคับให้มีหมวดหมู่ทุกอัน
  notes: string[];
  tags?: Tag[];        // ยังเก็บได้ แต่ไม่ใช้กรองหมวดหมู่
  attachments?: Attachment[];
};

export type WeekData = Record<DayKey, NewsItem[]>;
