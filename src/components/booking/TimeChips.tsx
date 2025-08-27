import { Button } from "antd";

export default function TimeChips({
  options,
  value,
  onChange,
  disabled,
}: {
  options: string[];
  value: string | null;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {options.map((s) => {
        const active = value === s;
        return (
          <Button
            key={s}
            size="small"
            disabled={disabled}
            onClick={() => onChange(s)}
            className={`rounded-full h-8 text-xs ${
              active ? "bg-blue-600 !text-white border-blue-600" : "bg-white border-slate-300"
            }`}
          >
            {s}
          </Button>
        );
      })}
    </div>
  );
}
