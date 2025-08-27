import { Card, Segmented, Button } from "antd";

type Props = {
  tabValue: "หน้าหลัก" | "ประวัติการจอง";
  onTabChange: (v: "หน้าหลัก" | "ประวัติการจอง") => void;
};

type Notice = { id: string; title: string; when: string; tone?: "ok" | "warn" | "info" };
type Booking = { id: string; title: string; when: string; status?: "approved" | "pending" | "cancelled" };

const notices: Notice[] = [
  { id: "n1", title: "การจองสระว่ายน้ำได้รับอนุมัติแล้ว", when: "วันที่ 10 ส.ค. 2025, 07:00-09:00", tone: "ok" },
  { id: "n2", title: "การจองห้องประชุม A รออนุมัติ", when: "วันที่ 10 ส.ค. 2025", tone: "warn" },
  { id: "n3", title: "พื้นที่ฟิตเนสปิดปรับปรุงชั่วคราว", when: "วันที่ 12-13 ส.ค. 2025", tone: "info" },
];

const history: Booking[] = [
  { id: "b1", title: "สระว่ายน้ำ", when: "วันที่ 10 ส.ค. 2025, 07:00-09:00", status: "approved" },
];

export default function HistoryPanel({ tabValue, onTabChange }: Props) {
  return (
    <Card className="shadow-sm rounded-2xl" styles={{ body: { padding: 16 } }}>
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

      {/* การแจ้งเตือน */}
      <div className="font-semibold text-slate-800 mb-2">การแจ้งเตือน</div>
      <div className="space-y-3 mb-6">
        {notices.map((n) => {
          const palette =
            n.tone === "ok"
              ? "bg-emerald-50 border-emerald-200"
              : n.tone === "warn"
              ? "bg-amber-50 border-amber-200"
              : "bg-slate-100 border-slate-200";
        return (
          <div
            key={n.id}
            className={`rounded-xl border px-4 py-3 shadow-sm ${palette}`}
          >
            <div className="font-medium text-slate-800">{n.title}</div>
            <div className="text-xs text-slate-500 mt-1">{n.when}</div>
          </div>
        );
        })}
      </div>

      {/* ประวัติการจอง */}
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold text-slate-800">ประวัติการจอง</div>
        <Button size="small" className="rounded-lg">แก้ไข</Button>
      </div>

      <div className="rounded-2xl bg-slate-100/70 p-4">
        <div className="space-y-3">
          {history.map((b) => (
            <div key={b.id} className="bg-white rounded-xl border border-slate-200 shadow-sm px-4 py-3">
              <div className="font-medium text-slate-800">{b.title}</div>
              <div className="text-xs text-slate-500 mt-1">{b.when}</div>
            </div>
          ))}
        </div>

        {/* เผื่อให้มีพื้นที่ว่างคล้าย mockup */}
        <div className="mt-4 h-48 rounded-x" />
      </div>
    </Card>
  );
}
