import { Card, Upload, Typography, Input, InputNumber, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import TimeChips from "./TimeChips";

export default function BookingCardControlled({
  dateStr,
  options,
  time,
  onTime,
  people,
  setPeople,
  purpose,
  setPurpose,
  disabled,
  onConfirm,
}: {
  dateStr: string;
  options: string[];
  time: string | null;
  onTime: (v: string) => void;
  people: number;
  setPeople: (n: number) => void;
  purpose: string;
  setPurpose: (s: string) => void;
  disabled: boolean;
  onConfirm: () => void;
}) {
  const uploadProps = {
    name: "file",
    multiple: false,
    showUploadList: false,
    customRequest: ({ onSuccess }: any) => setTimeout(() => onSuccess("ok"), 0),
  };

  return (
    <Card className="shadow-sm" styles={{ body: { padding: 16 } }} style={{ borderRadius: 18 }}>
      <div className="font-semibold text-slate-800 mb-3">พื้นที่ควบคุม</div>

      <div className="text-xs text-slate-500 mb-2">วันที่</div>
      <div className="h-9 rounded-xl bg-slate-100/70 border border-slate-200 flex items-center px-3 text-sm mb-4">
        {dateStr || "-"}
      </div>

      <div className="text-xs text-slate-500 mb-2">วัตถุประสงค์การใช้งาน</div>
      <Input.TextArea rows={3} placeholder="ระบุวัตถุประสงค์…" value={purpose} onChange={(e) => setPurpose(e.target.value)} />

      <div className="text-xs text-slate-500 mt-4 mb-2">แนบไฟล์ประกอบ (ถ้ามี)</div>
      <Upload.Dragger {...uploadProps} style={{ borderRadius: 12 }}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined style={{ color: "#B9B9B9", fontSize: 28 }} />
        </p>
        <p style={{ color: "#B9B9B9", fontWeight: 500, marginBottom: 4 }}>คลิกหรือวางไฟล์ที่นี่</p>
        <Typography.Link>เลือกไฟล์</Typography.Link>
      </Upload.Dragger>

      <div className="text-xs text-slate-500 mt-4 mb-2">เลือกช่วงเวลา</div>
      <TimeChips options={options} value={time} onChange={onTime} disabled={disabled} />

      <div className="text-xs text-slate-500 mt-4 mb-2">จำนวนคน</div>
      <InputNumber min={1} max={500} className="w-full" value={people} onChange={(v) => setPeople(Number(v) || 1)} />

      <Button type="primary" className="mt-5 w-full h-10 rounded-xl" onClick={onConfirm} disabled={disabled || !time}>
        ยืนยัน
      </Button>
    </Card>
  );
}
