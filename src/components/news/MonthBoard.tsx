// src/components/news/MonthBoard.tsx
import MonthCard from "./MonthCard.tsx";
import type { NewsItem } from "./Types";

export default function MonthBoard({
  groups,
}: {
  groups: Record<string, NewsItem[]>; // key = "YYYY-MM-DD"
}) {
  const dates = Object.keys(groups)
    .sort((a, b) => (a < b ? -1 : 1))
    .filter((d) => groups[d]?.length > 0);

  if (dates.length === 0) {
    return (
      <div className="text-slate-500 italic py-10 text-center">
        ไม่พบข่าวในเดือนนี้
      </div>
    );
  }

  const cls =
    `grid grid-cols-1 gap-5 ` +
    (dates.length >= 2 ? "md:grid-cols-2 " : "") +
    (dates.length >= 3 ? "xl:grid-cols-3 " : "") +
    (dates.length >= 4 ? "2xl:grid-cols-4 " : "");

  return (
    <div className={cls}>
      {dates.map((d) => (
        <MonthCard key={d} dateISO={d} items={groups[d]} />
      ))}
    </div>
  );
}
