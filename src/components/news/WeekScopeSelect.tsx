import { useState } from "react";
import type { DayKey, FilterMode } from "./Types";
import { DAY_LABEL_TH, CATEGORIES } from "./Types";
import { DownOutlined } from "@ant-design/icons";

const DAYS: DayKey[] = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

type Props = {
  mode: FilterMode;
  onModeChange: (m: FilterMode) => void;
  day: DayKey;
  onDayChange: (d: DayKey) => void;
  category: string;
  onCategoryChange: (c: string) => void;
};

export default function WeekScopeSelect({
  mode, onModeChange, day, onDayChange, category, onCategoryChange,
}: Props) {
  const [open, setOpen] = useState(false);

  const label =
    mode === "week"  ? "ทั้งสัปดาห์" :
    mode === "day"   ? "รายวัน" :
    mode === "month" ? "รายเดือน (ปัจจุบัน)" :
                       "หมวดหมู่";

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="inline-flex items-center gap-2 rounded-lg bg-[#5A7ABC] px-4 py-2 text-white shadow-sm"
        >
          <span>แสดง: {label}</span>
          <DownOutlined />
        </button>

        {open && (
          <div className="absolute z-10 mt-2 w-52 rounded-lg border border-slate-200 bg-white shadow-md">
            {[
              {k:"week", t:"อาทิตย์"},
              {k:"day", t:"วัน"},
              {k:"month", t:"เดือน (ปัจจุบัน)"},
              {k:"category", t:"หมวดหมู่"},
            ].map((opt) => (
              <button
                key={opt.k}
                onClick={() => { onModeChange(opt.k as FilterMode); setOpen(false); }}
                className={`block w-full text-left px-3 py-2 hover:bg-slate-50 ${mode===opt.k ? "bg-slate-100" : ""}`}
              >
                {opt.t}
              </button>
            ))}
          </div>
        )}
      </div>

      {mode === "day" && (
        <select
          value={day}
          onChange={(e) => onDayChange(e.target.value as DayKey)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2"
        >
          {DAYS.map(d => (
            <option key={d} value={d}>{DAY_LABEL_TH[d]}</option>
          ))}
        </select>
      )}

      {mode === "category" && (
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2"
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      )}
    </div>
  );
}
