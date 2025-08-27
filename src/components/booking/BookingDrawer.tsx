import { Drawer, Tag } from "antd";
import type { Facility } from "./types";
import BookingCardGeneral from "./BookingCardGeneral";
import BookingCardControlled from "./BookingCardControlled";
import { slotLabels, filterSlotsByHours } from "./timeSlots";

export default function BookingDrawer({
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
}: {
  open: boolean;
  onClose: () => void;
  facility: Facility | null;
  dateStr: string;
  people: number;
  setPeople: (n: number) => void;
  tGeneral: string | null;
  setTGeneral: (s: string | null) => void;
  tControlled: string | null;
  setTControlled: (s: string | null) => void;
  purpose: string;
  setPurpose: (s: string) => void;
  onConfirmControlled: () => void;
}) {
  const allowed = filterSlotsByHours(slotLabels, facility?.open, facility?.close);
  const isGeneral = facility?.type === "ทั่วไป";
  const isControlled = facility?.type === "ควบคุม";

  return (
    <Drawer
      title={
        <div className="flex items-center gap-2">
          <span>จอง {facility?.name ?? "-"}</span>
          {facility?.type && (
            <Tag color={isControlled ? "orange" : "green"}>{facility.type}</Tag>
          )}
        </div>
      }
      placement="right"
      width={860}
      open={open}
      onClose={onClose}
      destroyOnClose
    >
      {/* แสดง "เฉพาะ" ตามประเภท */}
      {isGeneral && (
        <BookingCardGeneral
          dateStr={dateStr}
          options={allowed}
          value={tGeneral}
          onChange={(v) => setTGeneral(v)}
          disabled={!dateStr}
        />
      )}

      {isControlled && (
        <BookingCardControlled
          dateStr={dateStr}
          options={allowed}
          time={tControlled}
          onTime={(v) => setTControlled(v)}
          people={people}
          setPeople={setPeople}
          purpose={purpose}
          setPurpose={setPurpose}
          disabled={!dateStr}
          onConfirm={onConfirmControlled}
        />
      )}
    </Drawer>
  );
}
