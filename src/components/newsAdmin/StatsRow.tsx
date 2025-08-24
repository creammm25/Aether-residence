import { Card } from "antd";

function BlueCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-[#5A80C6] text-white shadow-sm p-5 min-h-[140px] flex flex-col justify-between">
      <div className="text-white/90 text-[15px]">{label}</div>
      <div className="text-4xl font-semibold self-end">{value}</div>
    </div>
  );
}

function WhiteCard({ label, value }: { label: string; value: number }) {
  return (
    <Card
      className="shadow-sm min-h-[140px]"
      styles={{ body: { padding: 20, height: "100%" } }}
      style={{ borderRadius: 16 }}
    >
      <div className="flex items-center justify-between h-full">
        <div className="text-slate-700 text-[15px]">{label}</div>
        <div className="text-3xl font-semibold">{value}</div>
      </div>
    </Card>
  );
}

/** กล่องสรุปบนสุด: น้ำเงิน 2 ใบ + ขาว 2 ใบ
 *  บน (น้ำเงิน): col-span-3 + col-span-3
 *  ล่าง (ขาว)  : col-span-3 + col-span-3
 */
export default function StatsRow({
  published,
  categories,
  draftCount,
  archivedCount,
}: {
  published: number;
  categories: number;
  draftCount: number;
  archivedCount: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
      {/* บน: น้ำเงิน 2 ใบ */}
      <div className="md:col-span-3">
        <BlueCard label="ข่าวที่เผยแพร่" value={published} />
      </div>
      <div className="md:col-span-3">
        <BlueCard label="หมวดหมู่" value={categories} />
      </div>

      {/* ล่าง: ขาว 2 ใบ */}
      <div className="md:col-span-3">
        <WhiteCard label="จำนวนข่าวที่ร่าง" value={draftCount} />
      </div>
      <div className="md:col-span-3">
        <WhiteCard label="จำนวนข่าวที่จัดเก็บ" value={archivedCount} />
      </div>
    </div>
  );
}
