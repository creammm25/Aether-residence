import { Outlet, useNavigate } from "react-router";
import {
  HomeOutlined,
  NotificationOutlined,
  CalendarOutlined,
  LoginOutlined,
  ThunderboltOutlined,
  DollarOutlined,
  ExclamationCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";

const menuItems = [
  { name: "Home", path: "/", icon: <HomeOutlined /> },
  { name: "ข่าวสาร", path: "/news", icon: <NotificationOutlined /> },
  { name: "จองพื้นที่", path: "/booking", icon: <CalendarOutlined /> },
  { name: "การเข้าออก", path: "/access", icon: <LoginOutlined /> },
  { name: "ค่าน้ำค่าไฟ", path: "/utilities", icon: <ThunderboltOutlined /> },
  { name: "การชำระเงิน", path: "/payment", icon: <DollarOutlined /> },
  { name: "แจ้งปัญหา", path: "/report", icon: <ExclamationCircleOutlined /> },
  { name: "การประเมิน", path: "/evaluation", icon: <StarOutlined /> },
];

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="flex bg-[#6597E2] min-h-screen max-w-screen">
      {/* SideBar */}
      <div className="group w-16 hover:min-w-48 flex flex-col py-8 gap-4 shadow-lg transition-all duration-300 justify-center ml-2 ">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#4F82CF] transition"
          >
            <span className="text-white text-lg">{item.icon}</span>
            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {item.name}
            </span>
          </button>
        ))}
      </div>
      {/* Main Content */}
      <div className="bg-[#EDF1FD] rounded-tl-4xl rounded-bl-4xl overflow-y-auto flex overflow-x-auto w-full">
        <Outlet />
      </div>
    </div>
  );
}
