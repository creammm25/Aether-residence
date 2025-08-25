import { Modal, Form, DatePicker, Select, Input } from "antd";
import { slotLabels } from "./mock";
import type { BookingInput, Facility } from "./types";
import dayjs from "dayjs";

export default function BookingModal({
  open, onClose, onOk, facility, input, setInput, loading,
}: {
  open: boolean;
  onClose: () => void;
  onOk: () => void;
  facility: Facility | null;
  input: BookingInput;
  setInput: (v: BookingInput) => void;
  loading: boolean;
}) {
  return (
    <Modal
      title={facility ? `จอง ${facility.name}` : "จองพื้นที่"}
      open={open}
      onCancel={onClose}
      onOk={onOk}
      okText="ยืนยันการจอง"
      cancelText="ยกเลิก"
      confirmLoading={loading}
      destroyOnClose
      centered
    >
      <Form layout="vertical">
        <Form.Item label="วันที่">
          <DatePicker
            className="w-full"
            value={input.date || dayjs()}
            onChange={(d) => setInput({ ...input, date: d })}
          />
        </Form.Item>
        <Form.Item label="ช่วงเวลา">
          <Select
            className="w-full"
            placeholder="เลือกช่วงเวลา"
            value={input.timeLabel ?? undefined}
            onChange={(v) => setInput({ ...input, timeLabel: v })}
            options={slotLabels.map((s) => ({ value: s, label: s }))}
          />
        </Form.Item>
        {facility?.type === "ควบคุม" && (
          <Form.Item label="วัตถุประสงค์การใช้งาน" required>
            <Input.TextArea
              rows={2}
              value={input.purpose}
              onChange={(e) => setInput({ ...input, purpose: e.target.value })}
            />
          </Form.Item>
        )}
        <Form.Item label="หมายเหตุเพิ่มเติม">
          <Input.TextArea
            rows={2}
            value={input.remark}
            onChange={(e) => setInput({ ...input, remark: e.target.value })}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
