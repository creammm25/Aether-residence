import { useState } from "react";
import { Table, Button, Input, Modal, Form, Select, DatePicker, Tag, Space, Popconfirm } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;

const initialData = [
  {
    key: "1",
    title: "ประชุมใหญ่สามัญประจำปี",
    category: "ประกาศ",
    date: "2025-08-01",
    status: "เผยแพร่",
  },
  {
    key: "2",
    title: "แจ้งปิดน้ำประปาชั่วคราว",
    category: "แจ้งเตือน",
    date: "2025-08-02",
    status: "ร่าง",
  },
];

function NewsPageAdmin() {
  const [data, setData] = useState(initialData);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: any) => {
    setEditingRecord(record);
    form.setFieldsValue({ ...record, date: dayjs(record.date) });
    setIsModalOpen(true);
  };

  const handleDelete = (key: string) => {
    setData(data.filter((item) => item.key !== key));
    setSelectedRowKeys(selectedRowKeys.filter((k) => k !== key));
  };

  const handleBatchDelete = () => {
    setData(data.filter((item) => !selectedRowKeys.includes(item.key)));
    setSelectedRowKeys([]);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newData = {
        ...values,
        key: editingRecord ? editingRecord.key : Date.now().toString(),
        date: values.date.format("YYYY-MM-DD"),
      };
      if (editingRecord) {
        setData(data.map((item) => (item.key === editingRecord.key ? newData : item)));
      } else {
        setData([...data, newData]);
      }
      setIsModalOpen(false);
      setEditingRecord(null);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingRecord(null);
    form.resetFields();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "หัวข้อ",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "หมวดหมู่",
      dataIndex: "category",
      key: "category",
      filters: [
        { text: "ประกาศ", value: "ประกาศ" },
        { text: "แจ้งเตือน", value: "แจ้งเตือน" },
      ],
      onFilter: (value: string, record: any) => record.category === value,
    },
    {
      title: "วันที่เผยแพร่",
      dataIndex: "date",
      key: "date",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
      sorter: (a: any, b: any) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "เผยแพร่", value: "เผยแพร่" },
        { text: "ร่าง", value: "ร่าง" },
      ],
      onFilter: (value: string, record: any) => record.status === value,
      render: (status: string) =>
        status === "เผยแพร่" ? <Tag color="green">เผยแพร่</Tag> : <Tag color="orange">ร่าง</Tag>,
    },
    {
      title: "การจัดการ",
      key: "action",
      render: (_: any, record: any) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm title="ลบข่าวสารนี้?" onConfirm={() => handleDelete(record.key)}>
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="overflow-y-auto h-screen w-full">
      {/* News Table */}
      <h1 className="bg-white text-2xl  rounded-tl-4xl p-8">News Management</h1>
      {/* Content News Table */}
      <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex gap-2">
          <Input.Search
            placeholder="ค้นหาข่าวสาร"
            value={searchText}
            onChange={handleSearch}
            allowClear
            style={{ width: 200 }}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            disabled={selectedRowKeys.length === 0}
            onClick={handleBatchDelete}
          >
            ลบข่าวสาร
          </Button>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          เพิ่มข่าวสาร
        </Button>
      </div>
      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        columns={columns as any}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title={editingRecord ? "แก้ไขข่าวสาร" : "เพิ่มข่าวสาร"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="บันทึก"
        cancelText="ยกเลิก"
        destroyOnClose
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item
            label="หัวข้อ"
            name="title"
            rules={[{ required: true, message: "กรุณากรอกหัวข้อ" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="หมวดหมู่"
            name="category"
            rules={[{ required: true, message: "กรุณาเลือกหมวดหมู่" }]}
          >
            <Select>
              <Option value="ประกาศ">ประกาศ</Option>
              <Option value="แจ้งเตือน">แจ้งเตือน</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="วันที่เผยแพร่"
            name="date"
            rules={[{ required: true, message: "กรุณาเลือกวันที่เผยแพร่" }]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="สถานะ"
            name="status"
            rules={[{ required: true, message: "กรุณาเลือกสถานะ" }]}
          >
            <Select>
              <Option value="เผยแพร่">เผยแพร่</Option>
              <Option value="ร่าง">ร่าง</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      </div>
    </div>
  );
}

export default NewsPageAdmin;
