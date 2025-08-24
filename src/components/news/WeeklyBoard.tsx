import type { WeekData, DayKey } from "./Types";
import { DAY_LABEL_TH } from "./Types";
import DayCard from "./DayCard";

const ORDER: DayKey[] = [
  "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
];

export default function WeeklyBoard({
  data,
  dateLabels,
}: {
  data: WeekData;
  dateLabels?: Record<DayKey, string>; // หัววันที่เต็มต่อวัน
}) {
  const days = ORDER
    .map((d) => ({ key: d, items: data[d] }))
    .filter((x) => x.items && x.items.length > 0);

  if (days.length === 0) {
    return (
      <div className="text-slate-500 italic py-10 text-center">
        ไม่พบข่าวตามตัวกรอง
      </div>
    );
  }

  const cls =
    `grid grid-cols-1 gap-5 ` +
    (days.length >= 2 ? "md:grid-cols-2 " : "") +
    (days.length >= 3 ? "xl:grid-cols-3 " : "") +
    (days.length >= 4 ? "2xl:grid-cols-4 " : "");

  return (
    <div className={cls}>
      {days.map((d) => (
        <DayCard
          key={d.key}
          day={dateLabels?.[d.key] ?? DAY_LABEL_TH[d.key]}
          dayKey={d.key}
          items={d.items}
        />
      ))}
    </div>
  );
}
