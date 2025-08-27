import { Card } from "antd";
import TimeChips from "./TimeChips";

export default function BookingCardGeneral({
  dateStr,
  options,
  value,
  onChange,
  disabled,
}: {
  dateStr: string;
  options: string[];
  value: string | null;
  onChange: (v: string) => void;
  disabled: boolean;
}) {
  return (
    <Card className="shadow-sm" styles={{ body: { padding: 16 } }} style={{ borderRadius: 18 }}>
      <div className="font-semibold text-slate-800 mb-3">พื้นที่ทั่วไป</div>

      <div className="text-xs text-slate-500 mb-2">วันที่</div>
      <div className="h-9 rounded-xl bg-slate-100/70 border border-slate-200 flex items-center px-3 text-sm mb-4">
        {dateStr || "-"}
      </div>

      <div className="text-xs text-slate-500 mb-2">เลือกช่วงเวลา</div>
      <TimeChips options={options} value={value} onChange={onChange} disabled={disabled} />

      {disabled && (
        <div className="text-[11px] text-rose-500 mt-3">
          เลือกวันที่ก่อนจึงจะกดช่วงเวลาได้
        </div>
      )}
    </Card>
  );
}
