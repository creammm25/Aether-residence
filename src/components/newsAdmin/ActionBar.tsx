import { Button, Input } from "antd";
import { PlusOutlined, DeleteOutlined, FilterOutlined, SearchOutlined } from "@ant-design/icons";

type Props = {
  search: string;
  onSearch: (v: string) => void;
  canDelete: boolean;
  onDelete: () => void;
  onOpenFilters: () => void;
  onAdd: () => void;
  /** ถ้า true จะไม่ใส่กล่อง/พื้นหลัง ให้ฝังอยู่ใน Card ภายนอกได้พอดี */
  embedded?: boolean;
};

export default function ActionBar({
  search,
  onSearch,
  canDelete,
  onDelete,
  onOpenFilters,
  onAdd,
  embedded = false,
}: Props) {
  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) =>
    embedded ? <>{children}</> : (
      <div
        className="bg-white rounded-2xl shadow-sm"
        style={{ padding: 16 }}
      >
        {children}
      </div>
    );

  return (
    <Wrapper>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Search */}
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          allowClear
          prefix={<SearchOutlined style={{ color: "#bdbdbd" }} />}
          style={{ maxWidth: 480, height: 36, borderRadius: 999 }}
        />
        {/* Actions */}
        <div className="flex gap-2">
          <Button icon={<FilterOutlined />} onClick={onOpenFilters}>
            Filters
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            disabled={!canDelete}
            onClick={onDelete}
          >
            Delete News
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={onAdd}
            className="!bg-[#1677ff]"
          >
            Add News
          </Button>
        </div>
      </div>
    </Wrapper>
  );
}
