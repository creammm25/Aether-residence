import { Card, Segmented, DatePicker, Select, InputNumber } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { slotLabels } from "./mock";

export default function RightPanel({
  tabValue,
  onTabChange,
  stats,
  date,
  setDate,
  timeLabel,
  setTimeLabel,
  people,
  setPeople,
}: {
  tabValue: "หน้าหลัก" | "ประวัติการจอง";
  onTabChange: (v: "หน้าหลัก" | "ประวัติการจอง") => void;

  stats: { free: number; approve: number; closed: number };

  date: Dayjs;
  setDate: (d: Dayjs) => void;

  timeLabel: string | null;
  setTimeLabel: (s: string | null) => void;

  people: number;
  setPeople: (n: number) => void;
}) {
  return (
    <Card
      className="shadow-sm"
      styles={{ body: { padding: 16 } }}
      style={{ borderRadius: 20 }}
    >
      {/* Tabs บนสุด: 2 ปุ่ม */}
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

      {/* หัวข้อ */}
      <div className="text-xl font-semibold mb-2">ประเภทของพื้นที่</div>

      {/* การ์ดประเภท (โชว์อย่างเดียว) */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4 select-none">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🏃</div>
            <div>
              <div className="font-semibold text-slate-800 mb-1">พื้นที่ทั่วไป</div>
              <div className="text-xs text-slate-600">
                จองได้ทันที ไม่ต้องรออนุมัติ เช่น ฟิตเนส สนามกีฬา สนามเด็กเล่น
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4 select-none">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🏠</div>
            <div>
              <div className="font-semibold text-slate-800 mb-1">พื้นที่ควบคุม</div>
              <div className="text-xs text-slate-600">
                ต้องระบุวัตถุประสงค์และรออนุมัติ เช่น ห้องประชุม คลับเฮาส์ ลานกิจกรรม
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* สรุปสถานะ */}
      <div className="text-xl font-semibold mb-2">สถานะพื้นที่ส่วนกลาง</div>
      <div className="rounded-2xl bg-slate-100/60 border border-slate-200 mb-6">
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

      {/* เลือกวันที่ */}
      <div className="text-xl font-semibold mb-2">เลือกวันที่</div>
      <div className="mb-6">
        <DatePicker
          className="w-full h-11 rounded-xl bg-slate-100/70"
          value={date}
          onChange={(d) => setDate(d || dayjs())}
          format="DD/MM/YYYY"
          allowClear={false}
        />
      </div>

      {/* เลือกช่วงเวลา */}
      <div className="text-xl font-semibold mb-2">เลือกช่วงเวลา</div>
      <div className="mb-6">
        <Select
          className="w-full [&_.ant-select-selector]:h-11 [&_.ant-select-selection-item]:leading-[44px] rounded-xl"
          placeholder="เลือกช่วงเวลา"
          value={timeLabel ?? undefined}
          onChange={(v) => setTimeLabel(v)}
          options={slotLabels.map((s) => ({ value: s, label: s }))}
          allowClear
        />
      </div>

      {/* จำนวนคน */}
      <div className="text-xl font-semibold mb-2">จำนวนคน</div>
      <InputNumber
        min={1}
        max={200}
        value={people}
        onChange={(v) => setPeople(Number(v) || 1)}
        className="w-full h-11 rounded-xl"
      />
    </Card>
  );
}
