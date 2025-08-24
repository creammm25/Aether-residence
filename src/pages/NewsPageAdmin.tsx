import { useMemo, useState } from "react";
import dayjs from "../lib/dayjs";
import { Card, Form, message } from "antd";

import type { AdminNews, Category, Status } from "../components/newsAdmin/types";
import StatsRow from "../components/newsAdmin/StatsRow";
import LatestPanel from "../components/newsAdmin/LatestPanel";
import ActionBar from "../components/newsAdmin/ActionBar";
import FiltersDrawer, { type Filters } from "../components/newsAdmin/FiltersDrawer";
import NewsTable from "../components/newsAdmin/NewsTable";
import NewsFormModal from "../components/newsAdmin/NewsFormModal";

const seed: AdminNews[] = [
  { key: "1", title: "แจ้งปิดซ่อมระบบน้ำประปา ถนนหมายเลข 2", category: "การบำรุงรักษา", date: dayjs().format("YYYY-MM-DD"), time: "09:00", place: "สถาบันชุมชน", status: "published" },
  { key: "2", title: "แผนการจัดพัสดุหอพักชุมชนประจำปี 2568", category: "การบำรุงรักษา", date: dayjs().subtract(8, "day").format("YYYY-MM-DD"), status: "published" },
  { key: "3", title: "ประกาศเปลี่ยนหลอดไฟทางเดินโซน 12-14", category: "การบำรุงรักษา", date: dayjs().subtract(6, "day").format("YYYY-MM-DD"), status: "archived" },
  { key: "4", title: "ขอเชิญร่วมงานกีฬาประจำปี 'สามัคคีเกมส์'", category: "กิจกรรม", date: dayjs().subtract(3, "day").format("YYYY-MM-DD"), status: "published" },
  { key: "5", title: "กิจกรรมปลูกป่าชายเลนเพื่อรักษาสิ่งแวดล้อม", category: "กิจกรรม", date: dayjs().subtract(12, "day").format("YYYY-MM-DD"), status: "archived" },
  { key: "6", title: "ประกาศผลการประกวดต้นสวยประจำปี", category: "กิจกรรม", date: dayjs().format("YYYY-MM-DD"), status: "published" },
];

export default function NewsPageAdmin() {
  const [items, setItems] = useState<AdminNews[]>(seed);
  const [search, setSearch] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({ statuses: [], categories: [], range: null });

  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<AdminNews | null>(null);
  const [form] = Form.useForm();

  const filtered = useMemo(() => {
    return items.filter((n) => {
      const q = search.trim().toLowerCase();
      const hitQ =
        !q ||
        n.title.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q) ||
        (n.content || "").toLowerCase().includes(q);
      const hitStatus = !filters.statuses.length || filters.statuses.includes(n.status);
      const hitCat = !filters.categories.length || filters.categories.includes(n.category);
      const hitRange =
        !filters.range ||
        dayjs(n.date).isBetween(filters.range[0].startOf("day"), filters.range[1].endOf("day"), "day", "[]");
      return hitQ && hitStatus && hitCat && hitRange;
    });
  }, [items, search, filters]);

  // metrics
  const published = filtered.filter((n) => n.status === "published").length;
  const draft = filtered.filter((n) => n.status === "draft").length;
  const archived = filtered.filter((n) => n.status === "archived").length;
  const categories = new Set(filtered.map((n) => n.category)).size;

  // actions
  const openAdd = () => {
    setEditing(null);
    form.resetFields();
    form.setFieldsValue({ date: dayjs(), status: "draft" as Status });
    setOpenForm(true);
  };
  const openEdit = (row: AdminNews) => {
    setEditing(row);
    form.setFieldsValue({ ...row, date: dayjs(row.date) });
    setOpenForm(true);
  };
  const saveForm = async () => {
    const v = await form.validateFields();
    const rec: AdminNews = {
      key: editing ? editing.key : `${Date.now()}`,
      title: v.title,
      category: v.category as Category,
      date: v.date.format("YYYY-MM-DD"),
      time: v.time,
      place: v.place,
      status: v.status as Status,
      content: v.content,
    };
    setItems((prev) => (editing ? prev.map((x) => (x.key === editing.key ? rec : x)) : [rec, ...prev]));
    setOpenForm(false);
    setEditing(null);
    message.success("บันทึกสำเร็จ");
  };
  const batchDelete = () => {
    setItems((prev) => prev.filter((x) => !selectedKeys.includes(x.key)));
    setSelectedKeys([]);
    message.success("ลบข่าวที่เลือกแล้ว");
  };

  return (
    <div className="overflow-y-auto h-screen w-full">
      <h1 className="bg-white text-2xl rounded-tl-4xl p-8">Community News</h1>

      {/* ลดช่องว่างแนวตั้งเล็กน้อย (space-y-4) ให้ตารางถูกดันขึ้น */}
      <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-4">
        {/* ซ้าย 8/12 : ขวา 4/12 และ LatestPanel สูงพร้อม scroll 3 รายการ */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-8">
            <StatsRow
              published={published}
              categories={categories}
              draftCount={draft}
              archivedCount={archived}
            />
          </div>
          <div className="xl:col-span-4">
            <LatestPanel items={filtered} />
          </div>
        </div>

        {/* Card ใบเดียวที่รวม ActionBar + Table */}
        <Card className="shadow-sm" styles={{ body: { padding: 16 } }} style={{ borderRadius: 16 }}>
          <div className="mb-2">
            <ActionBar
              embedded
              search={search}
              onSearch={setSearch}
              canDelete={selectedKeys.length > 0}
              onDelete={batchDelete}
              onOpenFilters={() => setFiltersOpen(true)}
              onAdd={openAdd}
            />
          </div>

          {/* ตาราง: แสดง 5 แถวพอดี แล้ว scroll ลง */}
          <NewsTable
            data={filtered}
            selectedKeys={selectedKeys}
            onSelectKeys={setSelectedKeys}
            onEdit={openEdit}
          />
        </Card>
      </div>

      <FiltersDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        value={filters}
        onChange={setFilters}
      />

      <NewsFormModal
        open={openForm}
        onClose={() => { setOpenForm(false); setEditing(null); }}
        onSave={saveForm}
        form={form}
        editing={editing}
      />
    </div>
  );
}
