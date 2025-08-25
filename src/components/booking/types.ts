import type { Dayjs } from "dayjs";

export type FacilityType = "ทั่วไป" | "ควบคุม";

export type Facility = {
  id: number;
  name: string;
  type: FacilityType;
  description: string;
  available: boolean;
  status: "พร้อมใช้" | "ปิดปรับปรุง" | "ต้องอนุมัติ";
  capacity: number;
  used: number;
};

export type BookingInput = {
  date: Dayjs | null;
  /** ช่วงเวลาเป็น label เช่น "09:00–10:00" */
  timeLabel: string | null;
  people: number;
  purpose?: string;
  remark?: string;
};
