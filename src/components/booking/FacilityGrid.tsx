import type { Facility, FacilityType } from "./types";
import FacilityCard from "./FacilityCard";

export default function FacilityGrid({
  items, query, typeFilter, onBook,
}: {
  items: Facility[];
  query: string;
  typeFilter: FacilityType | "ทั้งหมด";
  onBook: (f: Facility) => void;
}) {
  const q = query.trim().toLowerCase();
  const filtered = items.filter((f) => {
    const hitQ = !q || f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q);
    const hitT = typeFilter === "ทั้งหมด" || f.type === typeFilter;
    return hitQ && hitT;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {filtered.map((it) => <FacilityCard key={it.id} item={it} onBook={onBook} />)}
      {filtered.length === 0 && <div className="text-slate-500">ไม่พบพื้นที่ตามเงื่อนไข</div>}
    </div>
  );
}
