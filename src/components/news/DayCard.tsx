import { MoreOutlined, ClockCircleOutlined } from "@ant-design/icons";
import Badge from "./Badge";
import AttachmentChip from "./AttachmentChip";
import type { DayKey, NewsItem, Attachment } from "./Types";

export default function DayCard({
  day,
  items,
}: {
  day: string;
  dayKey: DayKey;
  items: NewsItem[];
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="font-semibold text-slate-700">{day}</div>
        <button className="p-1 rounded hover:bg-slate-100">
          <MoreOutlined />
        </button>
      </div>

      <div className="px-4 pb-4">
        {items.length === 0 ? (
          <div className="text-sm text-slate-400 italic py-6">No news</div>
        ) : (
          items.map((n) => (
            <div
              key={n.id}
              className="rounded-2xl border border-slate-100 bg-white p-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]"
            >
              <div className="rounded-xl bg-white p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[15px]">
                      <span className="text-[#2563eb] font-semibold">หัวข้อข่าว: </span>
                      <a className=" text-black hover:underline">{n.title}</a>
                    </div>
                    {n.time && (
                      <div className="mt-1 text-sm text-slate-600">
                        <span className="text-[#2563eb] font-semibold">เวลา: </span>
                        <ClockCircleOutlined className="mr-1 align-[-2px]" />
                        {n.time}
                      </div>
                    )}
                  </div>
                  {/* ✅ หมวดหมู่ (บังคับมีทุกอัน) */}
                  <div className="ml-3 flex gap-1">
                    <Badge tag={{ kind: "custom", text: n.category }} />
                  </div>
                </div>

                <div className="h-px bg-slate-200 my-3" />

                <div className="text-[14px]">
                  <div className="text-[#2563eb] font-semibold mb-2">เนื้อหา:</div>
                  <div className="max-h-56 overflow-y-auto pr-1 space-y-2">
                    {n.notes.map((s, i) => (
                      <div key={i} className="flex">
                        <span className="mr-2">•</span>
                        <span className="leading-snug">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {n.attachments && n.attachments.length > 0 && (
                  <div className="mt-3 rounded-xl bg-[#EEF3FF] border border-[#DFE8FF] p-3">
                    <div className="text-xs text-slate-500 mb-2">ไฟล์แนบ</div>
                    <div className="flex flex-wrap gap-2">
                      {n.attachments.map((f: Attachment) => (
                        <AttachmentChip key={f.id} file={f} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
