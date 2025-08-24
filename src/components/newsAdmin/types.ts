export type Category =
  | "การบำรุงรักษา"
  | "กิจกรรม"
  | "ประกาศสำคัญ"
  | "การก่อสร้าง"
  | "สุขภาพ";

export type Status = "published" | "draft" | "archived";

export type AdminNews = {
  key: string;
  title: string;
  category: Category;
  date: string;      // YYYY-MM-DD
  time?: string;     // "HH:mm"
  place?: string;    // เช่น สถานที่/หมายเหตุสั้น
  status: Status;
  content?: string;
};

export const categoryPalette: Record<Category, string> = {
  "การบำรุงรักษา": "bg-blue-100 text-blue-700",
  "กิจกรรม": "bg-violet-100 text-violet-700",
  "ประกาศสำคัญ": "bg-rose-100 text-rose-700",
  "การก่อสร้าง": "bg-amber-100 text-amber-700",
  "สุขภาพ": "bg-emerald-100 text-emerald-700",
};
