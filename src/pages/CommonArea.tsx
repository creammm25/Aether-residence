import { useMemo, useState } from "react";
import { Card, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { facilitiesMock } from "../components/booking/mock";
import type { Facility, BookingInput } from "../components/booking/types";
import SearchBar from "../components/booking/SearchBar";
import FacilityGrid from "../components/booking/FacilityGrid";
import RightPanel from "../components/booking/RightPanel";

function CommonArea() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"หน้าหลัก" | "ประวัติการจอง">("หน้าหลัก");

  const [date, setDate] = useState<Dayjs>(dayjs());
  const [timeLabel, setTimeLabel] = useState<string | null>(null);
  const [people, setPeople] = useState(1);

  const [selected, setSelected] = useState<Facility | null>(null);
  const [input, setInput] = useState<BookingInput>({ date, timeLabel, people });

  const stats = useMemo(
    () => ({
      free: facilitiesMock.filter((f) => f.status === "พร้อมใช้").length,
      approve: facilitiesMock.filter((f) => f.status === "ต้องอนุมัติ").length,
      closed: facilitiesMock.filter((f) => f.status === "ปิดปรับปรุง").length,
    }),
    []
  );

  const handleBook = (f: Facility) => {
    setSelected(f);
    setInput({ date, timeLabel, people });
    message.info(`เลือกพื้นที่: ${f.name}`);
  };

  return (
    <div className="overflow-y-auto h-screen w-full">
      <h1 className="bg-white text-2xl rounded-tl-4xl p-8">Common Area</h1>

      <div className="p-6 md:p-8 max-w-[2000px] mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-3">
          {/* ซ้าย */}
          <div className="xl:col-span-9">
            <Card className="shadow-sm" styles={{ body: { padding: 16 } }} style={{ borderRadius: 16 }}>
              <div className="sticky top-0 z-6 bg-white/80 backdrop-blur pb-3">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-slate-700">พื้นที่ส่วนกลางทั้งหมด</div>
                  <SearchBar value={query} onChange={setQuery} />
                </div>
              </div>

              <div className="mt-4 max-h-[calc(100vh-320px)] overflow-auto pr-1">
                <FacilityGrid
                  items={facilitiesMock}
                  query={query}
                  // แสดงทุกประเภท (ดีไซน์ขวาเป็นข้อมูลอย่างเดียว)
                  typeFilter={"ทั้งหมด" as any}
                  onBook={handleBook}
                />
              </div>
            </Card>
          </div>

          {/* ขวา – ดีไซน์ใหม่ตามภาพ */}
          <div className="xl:col-span-3">
            <RightPanel
              tabValue={tab}
              onTabChange={setTab}
              stats={stats}
              date={date}
              setDate={(d) => {
                setDate(d);
                setInput((v) => ({ ...v, date: d }));
              }}
              timeLabel={timeLabel}
              setTimeLabel={(s) => {
                setTimeLabel(s);
                setInput((v) => ({ ...v, timeLabel: s }));
              }}
              people={people}
              setPeople={(n) => {
                setPeople(n);
                setInput((v) => ({ ...v, people: n }));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommonArea;
