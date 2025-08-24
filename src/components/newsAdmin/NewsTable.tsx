import { Table, Tag, Button, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import dayjs from "../../lib/dayjs";
import type { AdminNews, Status } from "./types";

type Props = {
  data: AdminNews[];
  selectedKeys: React.Key[];
  onSelectKeys: (keys: React.Key[]) => void;
  onEdit: (row: AdminNews) => void;
};

const StatusTag = ({ s }: { s: Status }) => {
  if (s === "published") return <Tag color="green">published</Tag>;
  if (s === "archived") return <Tag color="default">archived</Tag>;
  return <Tag color="orange">draft</Tag>;
};

export default function NewsTable({
  data,
  selectedKeys,
  onSelectKeys,
  onEdit,
}: Props) {
  const columns = [
    { title: "หัวข้อ", dataIndex: "title", key: "title", ellipsis: true },
    {
      title: "หมวดหมู่",
      dataIndex: "category",
      key: "category",
      sorter: (a: AdminNews, b: AdminNews) =>
        a.category.localeCompare(b.category, "th"),
      width: 180,
    },
    {
      title: "วันที่เผยแพร่",
      dataIndex: "date",
      key: "date",
      sorter: (a: AdminNews, b: AdminNews) =>
        dayjs(a.date).unix() - dayjs(b.date).unix(),
      render: (d: string) => dayjs(d).format("DD/MM/YYYY"),
      width: 140,
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (s: Status) => <StatusTag s={s} />,
      width: 140,
    },
    {
      title: "การจัดการ",
      key: "actions",
      render: (_: any, row: AdminNews) => (
        <Space>
          <Button type="text" icon={<EditOutlined />} onClick={() => onEdit(row)} />
        </Space>
      ),
      width: 110,
    },
  ];

  return (
    <Table
      rowKey="key"
      columns={columns as any}
      dataSource={data}
      pagination={false}
      // ~4 แถวพอดี (ปรับเลขนี้เล็กน้อยได้ตามความสูงแถวจริง)
      scroll={{ y: 260 }}
      sticky
      rowSelection={{
        selectedRowKeys: selectedKeys,
        onChange: onSelectKeys,
      }}
    />
  );
}
