import { Card, Button, Tag, Modal, Form, Input, DatePicker, TimePicker, message } from "antd";
import { useState } from "react";
import dayjs from "dayjs";

const facilities = [
	{
		id: 1,
		name: "ฟิตเนส",
		type: "ทั่วไป",
		description: "ห้องออกกำลังกายพร้อมอุปกรณ์ครบครัน",
		available: true,
	},
	{
		id: 2,
		name: "ห้องประชุม",
		type: "ควบคุม",
		description: "ห้องประชุมสำหรับจัดกิจกรรมหรือประชุมกลุ่ม",
		available: false,
	},
	{
		id: 3,
		name: "สนามกีฬา",
		type: "ทั่วไป",
		description: "สนามสำหรับเล่นกีฬา เช่น ฟุตบอล บาสเกตบอล",
		available: true,
	},
	{
		id: 4,
		name: "ลานอเนกประสงค์",
		type: "ควบคุม",
		description: "พื้นที่สำหรับจัดกิจกรรมขนาดใหญ่",
		available: true,
	},
];

function CommonArea() {
	const [open, setOpen] = useState(false);
	const [selectedFacility, setSelectedFacility] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();

	const generalFacilities = facilities.filter((f) => f.type === "ทั่วไป");
	const controlledFacilities = facilities.filter((f) => f.type === "ควบคุม");

	const handleBookClick = (facility: any) => {
		setSelectedFacility(facility);
		setOpen(true);
		form.resetFields();
	};

	const handleOk = async () => {
		try {
			setLoading(true);
			const values = await form.validateFields();
			setTimeout(() => {
				setLoading(false);
				setOpen(false);
				message.success(`จอง "${selectedFacility.name}" สำเร็จ!`);
			}, 1000);
		} catch {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		setOpen(false);
		setSelectedFacility(null);
		form.resetFields();
	};

	return (
		<div className="overflow-y-auto h-screen w-full">
			<h1 className="bg-white text-2xl rounded-tl-4xl p-8 ">
				Common Area
			</h1>
			<div className="p-8 space-y-10">
				{/* พื้นที่ทั่วไป */}
				<section>
					<h2 className="text-xl font-semibold mb-4 text-[#325FA4] flex items-center gap-2">
						พื้นที่ทั่วไป
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{generalFacilities.map((facility) => (
							<Card
								key={facility.id}
								title={
									<div className="flex items-center gap-2">
										{facility.name}
										<Tag color="blue">ทั่วไป</Tag>
									</div>
								}
								bordered={false}
								className="shadow-md"
								actions={[
									<Button
										type="primary"
										disabled={!facility.available}
										key="book"
										onClick={() => handleBookClick(facility)}
									>
										{facility.available ? "จองพื้นที่" : "ไม่เปิดให้จอง"}
									</Button>,
								]}
							>
								<p>{facility.description}</p>
							</Card>
						))}
					</div>
				</section>
				{/* พื้นที่ควบคุม */}
				<section>
					<h2 className="text-xl font-semibold mb-4 text-[#325FA4] flex items-center gap-2">

						พื้นที่ควบคุม
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{controlledFacilities.map((facility) => (
							<Card
								key={facility.id}
								title={
									<div className="flex items-center gap-2">
										{facility.name}
										<Tag color="orange">ควบคุม</Tag>
									</div>
								}
								bordered={false}
								className="shadow-md"
								actions={[
									<Button
										type="primary"
										disabled={!facility.available}
										key="book"
										onClick={() => handleBookClick(facility)}
									>
										{facility.available ? "จองพื้นที่" : "ไม่เปิดให้จอง"}
									</Button>,
								]}
							>
								<p>{facility.description}</p>
							</Card>
						))}
					</div>
				</section>
			</div>
			<Modal
				title={
					selectedFacility
						? `จอง${selectedFacility.name} (${selectedFacility.type})`
						: "จองพื้นที่"
				}
				open={open}
				onOk={handleOk}
				onCancel={handleCancel}
				okText="ยืนยันการจอง"
				cancelText="ยกเลิก"
				confirmLoading={loading}
				destroyOnClose
				centered
			>
				<Form
					form={form}
					layout="vertical"
					initialValues={{
						date: dayjs(),
					}}
				>
					<Form.Item
						label="วันที่ต้องการจอง"
						name="date"
						rules={[{ required: true, message: "กรุณาเลือกวันที่" }]}
					>
						<DatePicker className="w-full" />
					</Form.Item>
					<Form.Item
						label="เวลาเริ่มต้น - เวลาสิ้นสุด"
						name="time"
						rules={[{ required: true, message: "กรุณาเลือกเวลา" }]}
					>
						<TimePicker.RangePicker className="w-full" format="HH:mm" />
					</Form.Item>
					{selectedFacility?.type === "ควบคุม" && (
						<Form.Item
							label="วัตถุประสงค์การใช้งาน"
							name="purpose"
							rules={[{ required: true, message: "กรุณาระบุวัตถุประสงค์" }]}
						>
							<Input.TextArea rows={2} placeholder="เช่น จัดประชุม, จัดกิจกรรม ฯลฯ" />
						</Form.Item>
					)}
					<Form.Item
						label="หมายเหตุเพิ่มเติม"
						name="remark"
					>
						<Input.TextArea rows={2} placeholder="(ถ้ามี)" />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}

export default CommonArea;
