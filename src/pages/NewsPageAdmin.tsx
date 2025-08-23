import { useState } from "react";
import { Table, Button, Input, Modal, Form, Select, DatePicker, Tag, Space, Popconfirm, Upload, Typography } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined, InboxOutlined, SearchOutlined, FilterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;

const initialData = [
  {
    key: "1",
    title: "ประชุมใหญ่สามัญประจำปี",
    category: "กิจกรรม",
    date: "2025-08-01",
    status: "เผยแพร่",
  },
  {
    key: "2",
    title: "แจ้งปิดน้ำประปาชั่วคราว",
    category: "การบำรุงรักษา",
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
        { text: "การบำรุงรักษา", value: "การบำรุงรักษา" },
        { text: "กิจกรรม", value: "กิจกรรม" },
        { text: "ประกาศสำคัญ", value: "ประกาศสำคัญ" },
        { text: "การก่อสร้าง", value: "การก่อสร้าง" },
        { text: "สุขภาพ", value: "สุขภาพ" },
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
        { text: "จัดเก็บ", value: "จัดเก็บ" },
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

  // Custom props for Upload
  const uploadProps = {
    name: "file",
    multiple: false,
    showUploadList: false,
    style: { width: "100%" },
    // dummyRequest to prevent upload
    customRequest: ({ onSuccess }: any) => setTimeout(() => onSuccess("ok"), 0),
  };

  return (
    <div className="overflow-y-auto h-screen w-full" style={{ background: "#f4f6fa" }}>
      {/* News Table */}
      <h1 className="bg-white text-2xl rounded-tl-4xl p-8">News Management</h1>
      {/* Content News Table */}
      <div className="p-8">
        {/* Custom Search & Actions Bar */}
        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6"
          style={{
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 2px 8px #e5e7eb",
            padding: 16,
          }}
        >
          {/* Search Bar */}
          <div className="flex items-center flex-1 max-w-xs">
            <Input
              placeholder="Search..."
              value={searchText}
              onChange={handleSearch}
              allowClear
              prefix={<SearchOutlined style={{ color: "#bdbdbd", fontSize: 16 }} />}
              style={{
                borderRadius: 999,
                border: "1.5px solid #e0e0e0",
                background: "#fafbfc",
                fontSize: 15,
                color: "#222",
                boxShadow: "0 1px 4px #e5e7eb33",
                height: 36,
                paddingLeft: 10,
                paddingRight: 10,
                flex: 1,
              }}
              inputMode="search"
            />
          </div>
          {/* Actions */}
          <div className="flex gap-2 mt-2 md:mt-0">
            <Button
              type="primary"
              icon={<PlusOutlined style={{ color: "#fff", fontSize: 16 }} />}
              onClick={handleAdd}
              style={{
                background: "linear-gradient(90deg, #60a5fa 0%, #2563eb 100%)",
                border: "none",
                borderRadius: 999,
                fontWeight: 600,
                fontSize: 15,
                height: 36,
                padding: "0 20px",
                boxShadow: "0 1px 4px #60a5fa22",
                display: "flex",
                alignItems: "center",
              }}
            >
              Add News
            </Button>
            <Button
              icon={<DeleteOutlined style={{ color: "#fff", fontSize: 16 }} />}
              danger
              disabled={selectedRowKeys.length === 0}
              onClick={handleBatchDelete}
              style={{
                background: "#ef4444",
                border: "none",
                borderRadius: 999,
                fontWeight: 600,
                fontSize: 15,
                color: "#fff",
                height: 36,
                padding: "0 20px",
                boxShadow: "0 1px 4px #ef444422",
                display: "flex",
                alignItems: "center",
              }}
            >
              Delete News
            </Button>
          </div>
        </div>
        {/* News Table */}
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          columns={columns as any}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
        />
        {/* Modal for Add/Edit News */}
        <Modal
          title={null}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          destroyOnClose
          centered
          bodyStyle={{
            background: "#fff", // เปลี่ยนพื้นหลัง modal เป็นสีขาว
            borderRadius: 16,
            padding: 0,
          }}
        >
          <div className="bg-white rounded-t-2xl  py-6 border-b border-blue-100 mb-4">
            <Typography.Title level={3} style={{ margin: 0, color: "#2563eb", fontWeight: 700 }}>
              {editingRecord ? "แก้ไขข่าวสาร" : "+ เพิ่มข่าวใหม่"}
            </Typography.Title>
          </div>
          <Form
            form={form}
            layout="vertical"
            preserve={false}
            className="px-8 py-6"
            style={{ background: "#fff", borderRadius: "0 0 16px 16px" }} // เปลี่ยนพื้นหลังฟอร์มเป็นขาว
            onFinish={handleOk}
          >
            <Form.Item
              label={<span style={{ fontWeight: 500 }}>หัวข้อข่าว</span>}
              name="title"
              rules={[{ required: true, message: "กรุณากรอกหัวข้อข่าวสาร" }]}
            >
              <Input
                placeholder="กรอกหัวข้อข่าวสาร"
                size="large"
                style={{ borderRadius: 8, borderColor: "#60a5fa" }}
              />
            </Form.Item>
            <div className="flex flex-col md:flex-row gap-4">
              <Form.Item
                label={<span style={{ fontWeight: 500 }}>วันที่เผยแพร่</span>}
                name="date"
                rules={[{ required: true, message: "กรุณาเลือกวันที่เผยแพร่" }]}
                className="flex-1"
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  style={{ width: "100%", borderRadius: 8, borderColor: "#60a5fa" }}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                label={<span style={{ fontWeight: 500 }}>หมวดหมู่</span>}
                name="category"
                rules={[{ required: true, message: "กรุณาเลือกหมวดหมู่" }]}
                className="flex-1"
              >
                <Select
                  placeholder="เลือกหมวดหมู่"
                  size="large"
                  style={{ borderRadius: 8, borderColor: "#60a5fa" }}
                >
                  <Option value="การบำรุงรักษา">การบำรุงรักษา</Option>
                  <Option value="กิจกรรม">กิจกรรม</Option>
                   <Option value="ประกาศสำคัญ">ประกาศสำคัญ</Option>
                  <Option value="การก่อสร้าง">การก่อสร้าง</Option>
                  <Option value="สุขภาพ">สุขภาพ</Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item
              label={<span style={{ fontWeight: 500 }}>เนื้อหาข่าว</span>}
              name="content"
              rules={[
                { required: true, message: "กรุณากรอกเนื้อหาข่าวสาร" },
                { max: 500, message: "เนื้อหาข่าวสารต้องไม่เกิน 500 ตัวอักษร" },
              ]}
            >
              <Input.TextArea
                placeholder="กรอกเนื้อหาข่าวสาร (สูงสุด 500 ตัวอักษร)"
                rows={4}
                maxLength={500}
                showCount
                style={{ borderRadius: 8, borderColor: "#60a5fa" }}
              />
            </Form.Item>
            <Form.Item
              label={<span style={{ fontWeight: 500 }}>สถานะ</span>}
              name="status"
              rules={[{ required: true, message: "กรุณาเลือกสถานะ" }]}
            >
              <Select
                placeholder="เลือกสถานะ"
                size="large"
                style={{ borderRadius: 8, borderColor: "#60a5fa" }}
              >
                <Option value="เผยแพร่">เผยแพร่</Option>
                <Option value="ร่าง">ร่าง</Option>
                <Option value="จัดเก็บ">จัดเก็บ</Option>
              </Select>
            </Form.Item>
            {/* กล่องอัปโหลดไฟล์ เต็มความกว้าง ใต้สถานะ */}
            <Form.Item
              label={<span style={{ fontWeight: 500 }}>อัปโหลดไฟล์</span>}
              name="file"
              valuePropName="fileList"
            >
              <Upload.Dragger {...uploadProps} style={{ borderRadius: 8, borderColor: "#60a5fa " }}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined style={{ color: "#B9B9B9", fontSize: 32 }} />
                </p>
                <p style={{ color: "#B9B9B9", fontWeight: 500, marginBottom: 4 }}>
                  คลิกหรือลากไฟล์มาวางที่นี่
                </p>
                <Typography.Link style={{ color: "#60a5fa" }}>เลือกไฟล์</Typography.Link>
              </Upload.Dragger>
            </Form.Item>
            <div className="flex justify-end gap-4 mt-8">
              <Button
                onClick={handleCancel}
                style={{
                  borderColor: "#60a5fa",
                  color: "#2563eb",
                  background: "#e0e7ff",
                  borderRadius: 8,
                  fontWeight: 500,
                  minWidth: 100,
                  height: 40,
                }}
              >
                ยกเลิก
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  background: "linear-gradient(90deg, #60a5fa 0%, #2563eb 100%)",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 600,
                  minWidth: 100,
                  height: 40,
                }}
              >
                ยืนยัน
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default NewsPageAdmin;
