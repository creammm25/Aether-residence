import type { WeekData } from "./Types";

export const mockWeek: WeekData = {
  Monday: [
    {
      id: "mon-1",
      title: "แจ้งซ่อมและปิดจ่ายน้ำชั่วคราว โซน 10",
      time: "09:00 น.",
      date: "2025-08-10",
      category: "การบำรุงรักษา",
      tags: [{ kind: "priority", text: "สำคัญ" }],
      notes: [
        "ซ่อมท่อบริเวณโซน 10 (สำนักงาน)",
        "ขออภัยในความไม่สะดวก กำหนดการซ่อม 09:00 - 16:00 น.",
      ],
      attachments: [
        { id: "a1", label: "หนังสือ_แจ้งซ่อม_เวร5_10สค.docx", ext: "docx", url: "/attachments/หนังสือ_แจ้งซ่อม_เวร5_10สค.docx" },
        { id: "a2", label: "แผนภาพท่อระบบ.png", ext: "png", url: "/attachments/แผนภาพท่อระบบ.png" },
      ],
    },
  ],
  Tuesday: [
    {
      id: "tue-1",
      title: "นโยบายการเฝ้าระวังสุขภาพ",
      time: "10:00 น.",
      date: "2025-08-02",
      category: "สุขภาพ",
      tags: [{ kind: "status", text: "ประกาศ" }],
      notes: [
        "เชิญตรวจสุขภาพเบื้องต้น 2 สิงหาคม",
        "ลงทะเบียนภายในวันที่ 1 สิงหาคม",
      ],
      attachments: [{ id: "a3", label: "รายการคัดกรองสุขภาพ.pdf", ext: "pdf", url: "/attachments/รายการคัดกรองสุขภาพ.pdf" }],
    },
  ],
  Wednesday: [
    {
      id: "wed-1",
      title: "เปลี่ยนรูปแบบชำระค่าน้ำ",
      date: "2025-08-15",
      category: "ประกาศสำคัญ",
      tags: [{ kind: "status", text: "แจ้งเตือน" }],
      notes: ["เริ่มมีผลวันที่ 15 สิงหาคม", "โปรดติดป้ายหน้าเคหะก่อนเจ้าหน้าที่เข้าพบ"],
      attachments: [{ id: "a4", label: "สรุปช่องทางชำระค่าน้ำ.pdf", ext: "pdf", url: "/attachments/สรุปช่องทางชำระค่าน้ำ.pdf" }],
    },
  ],
  Thursday: [
    {
      id: "thu-1",
      title: "โครงการทาสีราวตากผ้าใหม่",
      date: "2025-08-16",
      category: "การก่อสร้าง",
      tags: [{ kind: "status", text: "กำหนดการ" }],
      notes: ["ดำเนินการ 16 - 25 สิงหาคม", "งดแขวนผ้าระหว่างเวลาทำงาน"],
      attachments: [
        { id: "a5", label: "หนังสือ_แจ้งทาสี_เวร6_10สค.docx", ext: "docx", url: "/attachments/หนังสือ_แจ้งทาสี_เวร6_10สค.docx" },
        { id: "a6", label: "แผนภาพทางเดิน.png", ext: "png", url: "/attachments/แผนภาพทางเดิน.png" },
      ],
    },
  ],
  Friday: [
    {
      id: "fri-1",
      title: "หน่วยเอกสารพัฒนาชุมชน",
      time: "08:00 น.",
      date: "2025-08-09",
      category: "กิจกรรม",
      tags: [{ kind: "status", text: "ประกาศ" }],
      notes: [
        "เปิดบริการวันศุกร์ที่ 9 ส.ค. เวลา 08:00",
        "ปิดเมื่อเอกสารครบและแจ้งย้ายบ้านแล้ว",
      ],
      attachments: [{ id: "a7", label: "ขั้นตอนย้ายออก.pdf", ext: "pdf", url: "/attachments/ขั้นตอนย้ายออก.pdf" }],
    },
  ],
  Saturday: [
    {
      id: "sat-1",
      title: "แก้ไขปัญหาฝาท่อหน้าบ้าน",
      date: "2025-08-17",
      category: "การบำรุงรักษา",
      tags: [{ kind: "status", text: "ประกาศ" }],
      notes: ["หลีกเลี่ยงจอดรถขวางฝาท่อ", "ดำเนินการ 17 ส.ค. 13:00 - 17:00"],
      attachments: [{ id: "a8", label: "ข้อมูลหน้างาน_17สค.docx", ext: "docx", url: "/attachments/ข้อมูลหน้างาน_17สค.docx" }],
    },
  ],
  Sunday: [
    {
      id: "sun-1",
      title: "ออกหน่วยตรวจสุขภาพฟรี",
      date: "2025-08-18",
      category: "สุขภาพ",
      tags: [{ kind: "status", text: "ประกาศ" }],
      notes: [
        "คัดกรอง มะเร็ง/ความดัน/เบาหวาน",
        "ให้คำแนะนำการใช้ยา/โภชนาการ",
        "ลานชุมชน 18 ส.ค. 09:00 - 12:00",
      ],
      attachments: [{ id: "a9", label: "อุปกรณ์โครงการ_18สค.docx", ext: "docx", url: "/attachments/อุปกรณ์โครงการ_18สค.docx" }],
    },
  ],
};
