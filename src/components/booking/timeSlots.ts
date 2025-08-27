// ช่วยกรองช่วงเวลาตามเวลาเปิด–ปิด
export const slotLabels = [
  "06:00-07:00","07:00-08:00","08:00-09:00","09:00-10:00",
  "10:00-11:00","11:00-12:00","12:00-13:00","13:00-14:00",
  "14:00-15:00","15:00-16:00","16:00-17:00","17:00-18:00",
  "18:00-19:00","19:00-20:00","20:00-21:00","21:00-22:00",
];

export function filterSlotsByHours(labels: string[], open?: string, close?: string) {
  if (!open || !close) return labels;
  const norm = (t: string) => t.padStart(5, "0"); // "H:MM" -> "0H:MM"
  return labels.filter((lab) => {
    const [s, e] = lab.split("-");
    return norm(s) >= norm(open) && norm(e) <= norm(close);
  });
}
