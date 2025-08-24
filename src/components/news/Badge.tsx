import type { Tag } from "./Types";

const ALLOWED: Record<string, string> = {
  "ประกาศสำคัญ":   "bg-rose-100 text-rose-700 border border-rose-200",
  "การก่อสร้าง":   "bg-amber-100 text-amber-700 border border-amber-200",
  "การบำรุงรักษา": "bg-blue-100 text-blue-700 border border-blue-200",
  "กิจกรรม":       "bg-violet-100 text-violet-700 border border-violet-200",
  "สุขภาพ":        "bg-emerald-100 text-emerald-700 border border-emerald-200",
};

export default function Badge({ tag }: { tag: Tag }) {
  const key = (tag.text || "").trim();
  if (!ALLOWED[key]) return null;

  return (
    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${ALLOWED[key]}`}>
      {key}
    </span>
  );
}
