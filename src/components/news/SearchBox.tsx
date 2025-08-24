import { SearchOutlined } from "@ant-design/icons";

export default function SearchBox({
  value,
  onChange,
  placeholder = "Search",
}: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="relative inline-block">
      <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-72 rounded-lg border border-slate-200 bg-white pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-[#90A7DC]"
      />
    </label>
  );
}
