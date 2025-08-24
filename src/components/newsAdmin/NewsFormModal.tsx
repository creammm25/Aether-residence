import { Modal, Form, Input, DatePicker, Select } from "antd";
import type { AdminNews, Category, Status } from "./types";


const { TextArea } = Input;
const { Option } = Select;

export default function NewsFormModal({
  open, onClose, onSave, form, editing,
}: {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  form: any;
  editing: AdminNews | null;
}) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={onSave}
      title={editing ? "แก้ไขข่าว" : "เพิ่มข่าวใหม่"}
      okText="บันทึก"
      cancelText="ยกเลิก"
      destroyOnClose
      centered
    >
      <Form form={form} layout="vertical">
        <Form.Item label="หัวข้อข่าว" name="title" rules={[{ required: true }]}>
          <Input placeholder="กรอกหัวข้อข่าว" />
        </Form.Item>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Form.Item label="วันที่เผยแพร่" name="date" rules={[{ required: true }]}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="เวลา (เช่น 09:00)" name="time">
            <Input placeholder="เช่น 09:00" />
          </Form.Item>
        </div>
        <Form.Item label="สถานที่/หมายเหตุสั้น" name="place">
          <Input placeholder="เช่น อาคาร A ชั้น 2" />
        </Form.Item>
        <Form.Item label="หมวดหมู่" name="category" rules={[{ required: true }]}>
          <Select placeholder="เลือกหมวดหมู่">
            {(["การบำรุงรักษา","กิจกรรม","ประกาศสำคัญ","การก่อสร้าง","สุขภาพ"] as Category[])
              .map((c) => <Option key={c} value={c}>{c}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item label="สถานะ" name="status" rules={[{ required: true }]}>
          <Select>
            {(["published","draft","archived"] as Status[]).map(s => <Option key={s} value={s}>{s}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item label="เนื้อหา" name="content">
          <TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
