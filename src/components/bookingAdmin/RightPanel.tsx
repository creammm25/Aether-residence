import { Card, List, Tag } from "antd";

const latestBookings = [
  { id: "l1", title: "คุณสมชาย ใจดี", place: "สระว่ายน้ำ", when: "Today · 09:00 AM" },
  { id: "l2", title: "คุณสมศักดิ์ สมจบ", place: "ห้องประชุมใหญ่", when: "MON 21 · 06:00 PM" },
  { id: "l3", title: "คุณพิณไล เรืองไร้ยศ", place: "ฟิตเนส", when: "MON 21 · 08:00 AM" },
];

const pendingApprovals = [
  { id: "p1", title: "ลานกิจกรรม", name: "คุณอุษา ใจไว", when: "Today · 09:00 AM" },
  { id: "p2", title: "คลับเฮาส์", name: "คุณวิชา มั่นใจ", when: "FRI 26 · 06:00 PM" },
  { id: "p3", title: "ห้องประชุมใหญ่", name: "คุณสุชาดา รวมภาค", when: "MON 21 · 08:00 AM" },
];

export default function AdminRightPanel() {
  return (
    <div className="flex flex-col gap-4">
      <Card className="rounded-2xl shadow-sm" styles={{ body: { padding: 16 } }}>
        <div className="font-semibold text-slate-800 mb-2">การจองล่าสุด</div>
        <List
          itemLayout="horizontal"
          dataSource={latestBookings}
          renderItem={(item) => (
            <List.Item className="rounded-xl hover:bg-slate-50">
              <List.Item.Meta
                avatar={<div className="w-12 h-12 bg-slate-200 rounded-lg" />}
                title={<span className="font-medium">{item.title}</span>}
                description={
                  <div className="text-xs text-slate-500">
                    {item.place} · {item.when}
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>

      <Card className="rounded-2xl shadow-sm" styles={{ body: { padding: 16 } }}>
        <div className="font-semibold text-slate-800 mb-2">คำขออนุมัติรอดำเนินการ</div>
        <div className="space-y-3">
          {pendingApprovals.map((p) => (
            <div key={p.id} className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="font-medium text-slate-800">{p.title}</div>
                <Tag color="gold" className="m-0">รอดำเนินการ</Tag>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {p.name} · {p.when}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
