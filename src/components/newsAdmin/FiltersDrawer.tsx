import { Button, Drawer, Select, DatePicker, Space } from "antd";
import type { Category, Status } from "./types";
import type { Dayjs } from "../../lib/dayjs";
const { RangePicker } = DatePicker;

export type Filters = {
  statuses: Status[]; categories: Category[]; range: [Dayjs, Dayjs] | null;
};

export default function FiltersDrawer({
  open, onClose, value, onChange,
}: {
  open: boolean; onClose: () => void;
  value: Filters; onChange: (v: Filters) => void;
}) {
  const set = (patch: Partial<Filters>) => onChange({ ...value, ...patch });

  return (
    <Drawer open={open} onClose={onClose} title="ตัวกรอง" width={360}>
      <div className="space-y-6">
        <div>
          <div className="mb-2 font-medium">สถานะ</div>
          <Select
            mode="multiple"
            value={value.statuses}
            onChange={(v) => set({ statuses: v as Status[] })}
            options={[
              { label: "published", value: "published" },
              { label: "draft", value: "draft" },
              { label: "archived", value: "archived" },
            ]}
            style={{ width: "100%" }}
            placeholder="เลือกสถานะ"
          />
        </div>
        <div>
          <div className="mb-2 font-medium">หมวดหมู่</div>
          <Select
            mode="multiple"
            value={value.categories}
            onChange={(v) => set({ categories: v as Category[] })}
            options={[
              { label: "การบำรุงรักษา", value: "การบำรุงรักษา" },
              { label: "กิจกรรม", value: "กิจกรรม" },
              { label: "ประกาศสำคัญ", value: "ประกาศสำคัญ" },
              { label: "การก่อสร้าง", value: "การก่อสร้าง" },
              { label: "สุขภาพ", value: "สุขภาพ" },
            ]}
            style={{ width: "100%" }}
            placeholder="เลือกหมวดหมู่"
          />
        </div>
        <div>
          <div className="mb-2 font-medium">ช่วงวันที่เผยแพร่</div>
          <RangePicker
            value={value.range as any}
            onChange={(v) => set({ range: (v as any) ?? null })}
            style={{ width: "100%" }}
          />
        </div>

        <Space>
          <Button onClick={() => onChange({ statuses: [], categories: [], range: null })}>
            ล้างตัวกรอง
          </Button>
          <Button type="primary" onClick={onClose}>ใช้ตัวกรอง</Button>
        </Space>
      </div>
    </Drawer>
  );
}
