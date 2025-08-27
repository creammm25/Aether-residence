import { Modal, Form, DatePicker, Select, Input, Upload, Button, InputNumber, Tag, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import type { Facility } from "./types";
import { slotLabels, filterSlotsByHours } from "./timeSlots";

type Props = {
  open: boolean;
  onClose: () => void;

  facility: Facility | null;

  // ค่าจากแผงขวา (เลือกวันที่แล้ว)
  dateStr: string;

  // state สำหรับหน้าจอง
  people: number;
  setPeople: (n: number) => void;

  // สำหรับพื้นที่ทั่วไป
  tGeneral: string | null;
  setTGeneral: (s: string | null) => void;

  // สำหรับพื้นที่ควบคุม
  tControlled: string | null;
  setTControlled: (s: string | null) => void;

  purpose: string;
  setPurpose: (s: string) => void;

  // เมื่อยืนยันของพื้นที่ควบคุม
  onConfirmControlled: () => void;
};

export default function BookingDialog({
  open,
  onClose,
  facility,
  dateStr,
  people,
  setPeople,
  tGeneral,
  setTGeneral,
  tControlled,
  setTControlled,
  purpose,
  setPurpose,
  onConfirmControlled,
}: Props) {
  const isGeneral = facility?.type === "ทั่วไป";
  const isControlled = facility?.type === "ควบคุม";

  // กรองช่วงเวลาตามเวลาเปิด-ปิดของพื้นที่
  const allowed = filterSlotsByHours(slotLabels, facility?.open, facility?.close);

  // ค่าในฟอร์ม
  const formDate = dateStr ? dayjs(dateStr, "DD/MM/YYYY") : null;

  const handleSubmit = () => {
    if (!facility) return;

    if (isGeneral) {
      if (!tGeneral) return message.warning("กรุณาเลือกช่วงเวลา");
      message.success("จองพื้นที่สำเร็จ");
      onClose();
      return;
    }

    // ควบคุม
    if (!tControlled) return message.warning("กรุณาเลือกช่วงเวลา");
    if (!purpose?.trim()) return message.warning("กรุณาระบุวัตถุประสงค์การใช้งาน");
    onConfirmControlled();
  };

  return (
    <Modal
      open={open}
      centered
      onCancel={onClose}
      footer={null}
      destroyOnClose
      width={720}
      title={
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">จอง{facility ? ` ${facility.name}` : ""}</span>
          {facility?.type && (
            <Tag color={isControlled ? "orange" : "green"}>{facility.type}</Tag>
          )}
        </div>
      }
      styles={{ body: { paddingTop: 8 } }}
    >
      <Form layout="vertical">
        {/* แถว วันที่ / เวลา */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Form.Item
            label={<Label text="วันที่"/>}
            required
          >
            <DatePicker
              className="w-full"
              format="DD/MM/YYYY"
              value={formDate as any}
              disabled
            />
          </Form.Item>

          <Form.Item
            label={<Label text="เลือกช่วงเวลา"/>}
            required
          >
            <Select
              placeholder="เลือกช่วงเวลา"
              value={(isGeneral ? tGeneral : tControlled) ?? undefined}
              onChange={(v) => (isGeneral ? setTGeneral(v) : setTControlled(v))}
              options={allowed.map((s) => ({ value: s, label: s }))}
              showArrow
              className="w-full"
            />
          </Form.Item>
        </div>

        {/* เนื้อหาเฉพาะประเภท */}
        {isControlled && (
          <>
            <Form.Item
              label={<Label text="วัตถุประสงค์การใช้งาน"/>}
              required
            >
              <Input.TextArea
                rows={3}
                placeholder="เช่น จัดประชุมคณะกรรมการ, จัดกิจกรรม ฯลฯ"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              />
            </Form.Item>

            <Form.Item label={<span className="font-medium">แนบไฟล์ประกอบ (ถ้ามี)</span>}>
              <Upload.Dragger
                name="file"
                multiple={false}
                showUploadList={false}
                // อัปโหลดหลอก ๆ เพื่อไม่ยิงจริง
                customRequest={({ onSuccess }) => setTimeout(() => onSuccess && onSuccess("ok"), 0)}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">คลิกหรือลากไฟล์มาวางที่นี่</p>
                <p className="ant-upload-hint">รองรับไฟล์เอกสาร/รูปภาพ</p>
              </Upload.Dragger>
            </Form.Item>

            <Form.Item label={<Label text="จำนวนคน" required />}>
              <InputNumber
                min={1}
                max={500}
                value={people}
                onChange={(v) => setPeople(Number(v) || 1)}
                controls={false}
                className="w-full"
              />
            </Form.Item>
          </>
        )}
      </Form>

      {/* Footer ปุ่ม */}
      <div className="flex justify-end gap-2 pt-4">
        <Button onClick={onClose}>ยกเลิก</Button>
        <Button type="primary" onClick={handleSubmit}>
          ยืนยัน
        </Button>
      </div>
    </Modal>
  );
}

function Label({ text, required = false }: { text: string; required?: boolean }) {
  return (
    <span className="font-medium">
      {required && <span className="text-rose-500 mr-1">*</span>}
      {text}
    </span>
  );
}
