import { useMemo, useState } from "react";
import WeekScopeSelect from "../components/news/WeekScopeSelect";
import SearchBox from "../components/news/SearchBox";
import WeeklyBoard from "../components/news/WeeklyBoard";
import MonthBoard from "../components/news/MonthBoard";
import { mockWeek } from "../components/news/mockWeek";
import type { FilterMode, DayKey, WeekData, NewsItem } from "../components/news/Types";

/** ค้นหาจากหัวข้อ/เวลา/โน้ต/แท็ก/ไฟล์/หมวดหมู่ */
function matchSearch(n: NewsItem, q: string) {
  const t = q.toLowerCase();
  return (
    n.title.toLowerCase().includes(t) ||
    (n.time ?? "").toLowerCase().includes(t) ||
    n.category.toLowerCase().includes(t) ||
    n.notes.some((s) => s.toLowerCase().includes(t)) ||
    (n.tags?.some((x) => x.text.toLowerCase().includes(t)) ?? false) ||
    (n.attachments?.some(
      (a) => a.label.toLowerCase().includes(t) || (a.ext ?? "").toLowerCase().includes(t)
    ) ?? false)
  );
}

/** กลุ่มข่าวของ “เดือนปัจจุบัน” (key = YYYY-MM-DD) */
function groupByCurrentMonth(data: WeekData) {
  const now = new Date();
  const mNow = now.getMonth() + 1;
  const yNow = now.getFullYear();

  const groups: Record<string, NewsItem[]> = {};
  (["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"] as DayKey[])
    .forEach((k) => {
      data[k].forEach((n) => {
        if (!n.date) return;
        const [yStr, mStr] = n.date.split("-");
        const y = Number(yStr);
        const m = Number(mStr);
        if (y === yNow && m === mNow) {
          const key = n.date.slice(0, 10);
          (groups[key] ||= []).push(n);
        }
      });
    });
  return groups;
}

/** หัววันที่ไทยเต็มของสัปดาห์ปัจจุบัน */
function getCurrentWeekDateLabels(): Record<DayKey, string> {
  const now = new Date();
  const dow = now.getDay();
  const diffToMonday = (dow + 6) % 7;
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(now.getDate() - diffToMonday);

  const keys: DayKey[] = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const labels = {} as Record<DayKey, string>;

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    labels[keys[i]] = d.toLocaleDateString("th-TH", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    });
  }
  return labels;
}

/** กรองรายสัปดาห์ตามโหมด (ยกเว้น month) — โหมดหมวดหมู่ใช้ n.category เท่านั้น */
function filterWeekly(
  data: WeekData,
  mode: FilterMode,
  day: DayKey,
  category: string
): WeekData {
  if (mode === "week") return data;

  if (mode === "day") {
    return {
      Monday: day === "Monday" ? data.Monday : [],
      Tuesday: day === "Tuesday" ? data.Tuesday : [],
      Wednesday: day === "Wednesday" ? data.Wednesday : [],
      Thursday: day === "Thursday" ? data.Thursday : [],
      Friday: day === "Friday" ? data.Friday : [],
      Saturday: day === "Saturday" ? data.Saturday : [],
      Sunday: day === "Sunday" ? data.Sunday : [],
    };
  }

  // ✅ โหมดหมวดหมู่: ตรงตาม category เท่านั้น
  const byCat = (arr: NewsItem[]) => arr.filter((n) => n.category === category);
  return {
    Monday: byCat(data.Monday),
    Tuesday: byCat(data.Tuesday),
    Wednesday: byCat(data.Wednesday),
    Thursday: byCat(data.Thursday),
    Friday: byCat(data.Friday),
    Saturday: byCat(data.Saturday),
    Sunday: byCat(data.Sunday),
  };
}

export default function NewsPage() {
  const [mode, setMode] = useState<FilterMode>("week");
  const [day, setDay] = useState<DayKey>("Monday");
  const [category, setCategory] = useState<string>("ประกาศสำคัญ");
  const [search, setSearch] = useState("");

  const weekDateLabels = useMemo(getCurrentWeekDateLabels, []);

  const monthGroups = useMemo(() => {
    const grouped = groupByCurrentMonth(mockWeek);
    if (!search.trim()) return grouped;

    const q = search.trim();
    const out: typeof grouped = {};
    Object.keys(grouped).forEach((date) => {
      const items = grouped[date].filter((n) => matchSearch(n, q));
      if (items.length) out[date] = items;
    });
    return out;
  }, [search]);

  const weekly = useMemo<WeekData>(() => {
    const base = filterWeekly(mockWeek, mode, day, category);
    if (!search.trim()) return base;

    const q = search.trim();
    const pick = (arr: NewsItem[]) => arr.filter((n) => matchSearch(n, q));
    return {
      Monday: pick(base.Monday),
      Tuesday: pick(base.Tuesday),
      Wednesday: pick(base.Wednesday),
      Thursday: pick(base.Thursday),
      Friday: pick(base.Friday),
      Saturday: pick(base.Saturday),
      Sunday: pick(base.Sunday),
    };
  }, [mode, day, category, search]);

  return (
    <div className="overflow-y-auto h-screen w-full">
      <h1 className="bg-white text-2xl rounded-tl-4xl p-8">Community News</h1>

      <div className="p-8 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <WeekScopeSelect
            mode={mode}
            onModeChange={setMode}
            day={day}
            onDayChange={setDay}
            category={category}
            onCategoryChange={setCategory}
          />
          <SearchBox value={search} onChange={setSearch} />
        </div>

        {mode === "month" ? (
          <MonthBoard groups={monthGroups} />
        ) : (
          <WeeklyBoard data={weekly} dateLabels={weekDateLabels} />
        )}
      </div>
    </div>
  );
}
