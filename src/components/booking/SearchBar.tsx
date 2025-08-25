import { Input, Button } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";

export default function SearchBar({
  value, onChange, onOpenFilters,
}: { value: string; onChange: (v: string) => void; onOpenFilters?: () => void; }) {
  return (
    <div className="flex items-center gap-3">
      <Input
        allowClear
        prefix={<SearchOutlined />}
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-full max-w-md"
      />
      <Button icon={<FilterOutlined />} onClick={onOpenFilters}>Filters</Button>
    </div>
  );
}
