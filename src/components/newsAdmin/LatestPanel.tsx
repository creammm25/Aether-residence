import { Card, List } from "antd";
import dayjs from "../../lib/dayjs";
import type { AdminNews } from "./types";

const humanDate = (iso: string, time?: string) => {
  const txt = dayjs(iso).calendar(undefined, {
    sameDay:  "[Today]",
    nextDay:  "[Tomorrow]",
    lastDay:  "[Yesterday]",
    nextWeek: "ddd DD MMM",
    lastWeek: "ddd DD MMM",
    sameElse: "ddd DD MMM",
  });
  return `${txt}${time ? ` · ${time}` : ""}`;
};

export default function LatestPanel({ items }: { items: AdminNews[] }) {
  const latest = [...items]
    .filter((n) => n.status === "published")
    .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());

  return (
    <Card className="shadow-sm h-full flex flex-col" styles={{ body: { padding: 16 } }} style={{ borderRadius: 16 }}>
      <div className="font-semibold text-slate-700 mb-2">ข่าวที่ประกาศล่าสุด</div>
      {/* พอดีกับ ~3 รายการ */}
      <div className="flex-1 overflow-auto max-h-[230px]">
        <List
          itemLayout="horizontal"
          dataSource={latest}
          renderItem={(n) => (
            <List.Item className="rounded-xl hover:bg-slate-50">
              <List.Item.Meta
                avatar={<div className="w-12 h-12 rounded-lg bg-slate-200" />}
                title={<span className="font-medium text-slate-800">{n.title}</span>}
                description={
                  <div className="text-xs text-slate-500">
                    {n.place ? <span>{n.place} · </span> : null}
                    {humanDate(n.date, n.time)}
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </Card>
  );
}
