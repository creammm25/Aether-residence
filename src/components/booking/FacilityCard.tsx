import { Card, Tag, Button, Progress } from "antd";
import type { Facility } from "./types";

function TypePill({ t }: { t: Facility["type"]; }) {
    return t === "ทั่วไป" ? <Tag color="green">พื้นที่ทั่วไป</Tag> : <Tag color="gold">พื้นที่ควบคุม</Tag>;
}

export default function FacilityCard({
  item, onBook,
}: { item: Facility; onBook: (f: Facility) => void }) {

  const percent = Math.min(100, Math.round((item.used / Math.max(1,item.capacity)) * 100));
  const statusText =
    item.status === "พร้อมใช้"   ? <span className="text-emerald-600">ว่าง ({item.used}/{item.capacity} คน)</span> :
    item.status === "ต้องอนุมัติ" ? <span className="text-amber-600">มีการจอง (รออนุมัติ)</span> :
                                     <span className="text-slate-500">ปิดอยู่</span>;

  const btnLabel = !item.available ? "ไม่ว่าง" : item.type === "ควบคุม" ? "ขอจอง (ต้องอนุมัติ)" : "จองพื้นที่";

  return (
    <Card className="shadow-sm h-full" styles={{ body: { padding: 14, height: "100%" } }}>
      {/* ภาพ/placeholder */}
      <div className="w-full h-24 rounded-xl bg-slate-100 mb-3" />

      {/* ชื่อ + pill ประเภท */}
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium text-slate-800">{item.name}</div>
        <TypePill t={item.type} />
      </div>

      {/* รายละเอียดสั้น */}
      <div className="text-xs text-slate-500 leading-5 mb-2">
        {item.description}<br />
        ความจุ {item.capacity} คน
      </div>

      {/* สถานะ + bar */}
      <div className="mb-2 text-xs">{statusText}</div>
      <Progress percent={percent} size="small" showInfo={false} />

      {/* ปุ่มเต็มกว้างด้านล่าง */}
      <Button
        className="mt-3 w-full"
        type={item.available ? "primary" : "default"}
        disabled={!item.available}
        onClick={() => onBook(item)}
      >
        {btnLabel}
      </Button>
    </Card>
  );
}
