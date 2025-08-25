// src/components/booking/TopTabs.tsx
import { Segmented } from "antd";
import { useNavigate, useLocation } from "react-router"; 

export default function TopTabs() {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const current =
    pathname.startsWith("/booking/history") ? "ประวัติการจอง" : "จองพื้นที่";

  return (
    <div className="mb-4">
      <Segmented
        value={current}
        options={["หน้าหลัก", "จองพื้นที่", "ประวัติการจอง"]}
        onChange={(v) => {
          if (v === "หน้าหลัก") nav("/");
          if (v === "จองพื้นที่") nav("/booking");
          if (v === "ประวัติการจอง") nav("/booking/history");
        }}
      />
    </div>
  );
}
