import { Card, Segmented, DatePicker } from "antd";
import type { Dayjs } from "dayjs";

type Props = {
  tabValue: "หน้าหลัก" | "ประวัติการจอง";
  onTabChange: (v: "หน้าหลัก" | "ประวัติการจอง") => void;
  stats: { free: number; approve: number; closed: number };
  date: Dayjs;
  setDate: (d: Dayjs) => void;

  // ทำให้ prop เหล่านี้ "ไม่บังคับ" เพื่อไม่ต้องไปแก้ CommonArea.tsx
  timeLabel?: string | null;
  setTimeLabel?: (s: string | null) => void;
  people?: number;
  setPeople?: (n: number) => void;
};

export default function MiddlePanel({
  tabValue,
  onTabChange,
  stats,
  date,
  setDate,
}: Props) {
  return (
    <Card className="shadow-sm rounded-2xl min-h-[720px]">
      {/* Tabs */}
      <div className="mb-4">
        <Segmented
          block
          size="large"
          value={tabValue}
          onChange={(v) => onTabChange(v as any)}
          options={["หน้าหลัก", "ประวัติการจอง"]}
          style={{ borderRadius: 14, background: "#EAF0FF", padding: 4 }}
        />
      </div>

      {/* ประเภทของพื้นที่ (โชว์อย่างเดียว) */}
      <div className="text-sm font-semibold text-slate-800 mb-2">ประเภทของพื้นที่</div>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 select-none">
          <div className="font-semibold mb-1">พื้นที่ทั่วไป</div>
          <div className="text-xs text-slate-600">
            จองได้ทันที ไม่ต้องรออนุมัติ เช่น ฟิตเนส สนามกีฬา สนามเด็กเล่น
          </div>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 select-none">
          <div className="font-semibold mb-1">พื้นที่ควบคุม</div>
          <div className="text-xs text-slate-600">
            ต้องระบุวัตถุประสงค์และรออนุมัติ เช่น ห้องประชุม คลับเฮาส์ ลานกิจกรรม
          </div>
        </div>
      </div>

      {/* สถานะพื้นที่ส่วนกลาง */}
      <div className="text-sm font-semibold text-slate-800 mb-2">สถานะพื้นที่ส่วนกลาง</div>
      <div className="rounded-xl bg-slate-100/60 border border-slate-200 mb-6">
        {[
          ["พื้นที่ว่าง", stats.free],
          ["ถูกจองแล้ว", stats.approve],
          ["ปิดซ่อมปรับปรุง", stats.closed],
          ["การจองวันนี้", 4],
        ].map(([label, val], i) => (
          <div
            key={label as string}
            className={`flex items-center justify-between px-4 py-3 text-slate-700 ${
              i !== 3 ? "border-b border-slate-200/70" : ""
            }`}
          >
            <span>{label}</span>
            <span className="font-semibold">{val as number}</span>
          </div>
        ))}
      </div>

      {/* เลือกวันที่ (คงไว้ตามดีไซน์) */}
      <div className="text-sm font-semibold text-slate-800 mb-2">เลือกวันที่</div>
      <DatePicker
        className="w-full h-10 rounded-xl"
        value={date as any}
        onChange={(d) => d && setDate(d)}
        format="DD/MM/YYYY"
      />
    </Card>
  );
}
