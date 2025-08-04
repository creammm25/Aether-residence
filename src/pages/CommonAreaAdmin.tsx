import React, { useState } from 'react'
import { Table, Button, Tag, Modal, message } from "antd";

const mockBookings = [
  {
    id: 1,
    facility: "ห้องประชุม",
    user: "สมชาย ใจดี",
    date: "2025-08-10",
    time: "13:00 - 15:00",
    purpose: "ประชุมกรรมการ",
    status: "รออนุมัติ",
  },
  {
    id: 2,
    facility: "ลานอเนกประสงค์",
    user: "สายฝน สดใส",
    date: "2025-08-12",
    time: "09:00 - 12:00",
    purpose: "จัดกิจกรรมวันแม่",
    status: "รออนุมัติ",
  },
  {
    id: 3,
    facility: "ฟิตเนส",
    user: "วิชัย แข็งแรง",
    date: "2025-08-09",
    time: "18:00 - 19:00",
    purpose: "-",
    status: "อนุมัติแล้ว",
  },
];

function CommonAreaAdmin() {
  const [data, setData] = useState(mockBookings);
  const [modal, setModal] = useState<{ open: boolean; id?: number; action?: string }>({ open: false });

  const handleAction = (id: number, action: "approve" | "reject") => {
    setModal({ open: true, id, action });
  };

  const handleConfirm = () => {
    if (!modal.id) return;
    setData((prev) =>
      prev.map((item) =>
        item.id === modal.id
          ? {
              ...item,
              status: modal.action === "approve" ? "อนุมัติแล้ว" : "ยกเลิก",
            }
          : item
      )
    );
    message.success(
      modal.action === "approve" ? "ยืนยันการจองสำเร็จ" : "ยกเลิกการจองสำเร็จ"
    );
    setModal({ open: false });
  };

  const columns = [
    {
      title: "พื้นที่",
      dataIndex: "facility",
      key: "facility",
    },
    {
      title: "ผู้จอง",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "วันที่",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "เวลา",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "วัตถุประสงค์",
      dataIndex: "purpose",
      key: "purpose",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (status: string) =>
        status === "รออนุมัติ" ? (
          <Tag color="orange">รออนุมัติ</Tag>
        ) : status === "อนุมัติแล้ว" ? (
          <Tag color="green">อนุมัติแล้ว</Tag>
        ) : (
          <Tag color="red">ยกเลิก</Tag>
        ),
    },
    {
      title: "การจัดการ",
      key: "action",
      render: (_: any, record: any) =>
        record.status === "รออนุมัติ" ? (
          <div className="flex gap-2">
            <Button
              type="primary"
              onClick={() => handleAction(record.id, "approve")}
            >
              ยืนยัน
            </Button>
            <Button
              danger
              onClick={() => handleAction(record.id, "reject")}
            >
              ยกเลิก
            </Button>
          </div>
        ) : (
          "-"
        ),
    },
  ];

  return (
    <div className="overflow-y-auto h-screen w-full">
      <h1 className="bg-white text-2xl rounded-tl-4xl p-8">
        Common Area Management
      </h1>
      <div className="p-8">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
        />
      </div>
      <Modal
        open={modal.open}
        onOk={handleConfirm}
        onCancel={() => setModal({ open: false })}
        okText={modal.action === "approve" ? "ยืนยัน" : "ยกเลิกการจอง"}
        cancelText="ปิด"
        centered
      >
        {modal.action === "approve"
          ? "คุณต้องการยืนยันการจองนี้ใช่หรือไม่?"
          : "คุณต้องการยกเลิกการจองนี้ใช่หรือไม่?"}
      </Modal>
    </div>
  );
}

export default CommonAreaAdmin
