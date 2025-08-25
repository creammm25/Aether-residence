import type { Facility } from "./types";

export const facilitiesMock: Facility[] = [
  { id: 1, name: "ฟิตเนส",      type: "ทั่วไป",  description: "ห้องออกกำลังกายพร้อมอุปกรณ์ครบครัน", available: true,  status: "พร้อมใช้",   capacity: 15, used: 6 },
  { id: 2, name: "สนามฟุตบอล",  type: "ทั่วไป",  description: "สนามหญ้าเทียม เปิด 06:00 - 20:00",     available: true,  status: "พร้อมใช้",   capacity: 22, used: 22 },
  { id: 3, name: "ห้องประชุมใหญ่", type: "ควบคุม", description: "ห้องประชุมสำหรับจัดกิจกรรม",        available: true,  status: "ต้องอนุมัติ", capacity: 50, used: 18 },
  { id: 4, name: "ลานกิจกรรม",  type: "ควบคุม",  description: "พื้นที่กิจกรรมกลางแจ้ง",              available: false, status: "ปิดปรับปรุง", capacity: 200, used: 0 },
  { id: 5, name: "คลับเฮาส์",   type: "ทั่วไป",  description: "เปิดให้บริการ 08:00 - 16:00 น.",      available: false, status: "ปิดปรับปรุง", capacity: 30, used: 0 },
  { id: 6, name: "ห้องซ้อมดนตรี", type: "ทั่วไป", description: "ห้องซ้อมอุปกรณ์ครบ",                 available: true,  status: "พร้อมใช้",   capacity: 6,  used: 1 },
];

export const slotLabels = [
  "08:00–09:00","09:00–10:00","10:00–11:00","11:00–12:00",
  "13:00–14:00","14:00–15:00","15:00–16:00","19:00–20:00","20:00–21:00",
];
