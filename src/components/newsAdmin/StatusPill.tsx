import type { Status } from "./types";

const styles: Record<Status, string> = {
  published: "bg-emerald-100 text-emerald-700",
  draft: "bg-amber-100 text-amber-700",
  archived: "bg-slate-200 text-slate-700",
};

export default function StatusPill({ value }: { value: Status }) {
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${styles[value]}`}>
      {value}
    </span>
  );
}
