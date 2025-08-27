import { Card } from "antd";

const BODY: React.CSSProperties = {
  padding: 20,
  height: 128,                // ✅ ล็อกความสูงที่ body
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

export default function AdminStatsHeader({
  todayCount,
  utilization,
  todayDelta = 0,
  utilizationDelta = 0,
}: {
  todayCount: number;
  utilization: number;
  todayDelta?: number;
  utilizationDelta?: number;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
      <Card className="rounded-2xl shadow-sm" styles={{ body: BODY }}>
        <div className="flex items-center justify-between">
          <div className="text-slate-700 font-semibold">การจองวันนี้</div>
          <div className="text-xs text-slate-400">จากเมื่อวาน</div>
        </div>
        <div className="flex items-end justify-between">
          <div className="text-3xl font-bold text-slate-900">{todayCount}</div>
          <div className="text-sm font-medium text-emerald-600">+{todayDelta}%</div>
        </div>
      </Card>

      <Card className="rounded-2xl shadow-sm" styles={{ body: BODY }}>
        <div className="flex items-center justify-between">
          <div className="text-slate-700 font-semibold">อัตราการใช้งาน</div>
          <div className="text-xs text-slate-400">จากสัปดาห์ที่ผ่านมา</div>
        </div>
        <div className="flex items-end justify-between">
          <div className="text-3xl font-bold text-slate-900">{utilization}%</div>
          <div className="text-sm font-medium text-emerald-600">+{utilizationDelta}%</div>
        </div>
      </Card>
    </div>
  );
}
