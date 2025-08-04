import React from 'react'

const mockNews = [
	{
		id: 1,
		title: 'แจ้งปิดปรับปรุงสระว่ายน้ำ',
		date: '2025-08-10',
		content:
			'สระว่ายน้ำจะปิดปรับปรุงตั้งแต่วันที่ 15-20 สิงหาคม ขออภัยในความไม่สะดวกค่ะ',
	},
	{
		id: 2,
		title: 'กิจกรรมวันแม่แห่งชาติ',
		date: '2025-08-05',
		content:
			'ขอเชิญร่วมกิจกรรมวันแม่แห่งชาติ วันที่ 12 สิงหาคม ณ ลานอเนกประสงค์ เวลา 9.00 น.',
	},
	{
		id: 3,
		title: 'แจ้งเตือนการชำระค่าส่วนกลาง',
		date: '2025-08-01',
		content:
			'โปรดชำระค่าส่วนกลางประจำเดือนสิงหาคม ภายในวันที่ 10 สิงหาคมนี้ ขอบคุณค่ะ',
	},
]

const NewsPage = () => {
	return (
		<div className="overflow-y-auto h-screen w-full">
			<h1 className="bg-white text-2xl rounded-tl-4xl p-8">
				Community News
			</h1>
			<div className="p-8 space-y-6">
				{mockNews.length === 0 ? (
					<div className="text-center text-gray-500 mt-12">
						ยังไม่มีข่าวสารในขณะนี้
					</div>
				) : (
					mockNews.map((news) => (
						<div
							key={news.id}
							className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
						>
							<div className="flex items-center justify-between mb-2">
								<h2 className="text-lg font-semibold text-[#325FA4]">
									{news.title}
								</h2>
								<span className="text-sm text-gray-400">
									{news.date}
								</span>
							</div>
							<p className="text-gray-700">{news.content}</p>
						</div>
					))
				)}
			</div>
		</div>
	)
}

export default NewsPage
