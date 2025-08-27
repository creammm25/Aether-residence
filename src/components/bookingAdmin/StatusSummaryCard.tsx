import { Card } from "antd";

const BODY: React.CSSProperties = {
  padding: 16,
  height: 128,                // ✅ ล็อกความสูง body ให้เท่ากับสองใบซ้าย
  display: "flex",
  flexDirection: "column",
};

export default function StatusSummaryCard({
  free,
  approve,
  closed,
}: {
  free: number;
  approve: number;
  closed: number;
}) {
  return (
    <Card className="rounded-2xl shadow-sm" styles={{ body: BODY }}>
      <div className="font-semibold text-slate-800 mb-2">สถานะพื้นที่ส่วนกลาง</div>

      {/* ทำให้ส่วนรายการกินพื้นที่ที่เหลือ และไม่ดันการ์ดให้สูงเกิน */}
      <div className="flex-1 rounded-xl bg-white border border-slate-200/70 overflow-hidden">
        <div className="divide-y divide-slate-200 text-slate-700">
          <Row label="พื้นที่ว่าง" value={free} />
          <Row label="ถูกจองแล้ว" value={approve} />
          <Row label="ปิดซ่อมปรับปรุง" value={closed} />
        </div>
      </div>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between px-4 py-1.5">
      <span className="text-[13px]">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
