import type { Attachment } from "./Types";
import { PaperClipOutlined } from "@ant-design/icons";

const extColor: Record<string, string> = {
  pdf: "bg-white text-gray border-white",
  docx: "bg-white text-gray border-white",
  doc: "bg-white text-gray border-white",
  png: "bg-white text-gray border-white",
  jpg: "bg-white text-gray border-white",
  jpeg: "bg-white text-gray border-white",
  default: "bg-white text-gray border-white",
};

export default function AttachmentChip({ file }: { file: Attachment }) {
  const color = extColor[file.ext] || extColor.default;
  const inner = (
    <span className={`inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs ${color}`}>
      <PaperClipOutlined />
      <span className="truncate max-w-[220px]">{file.label}</span>
    </span>
  );

  // ถ้ามี url ให้เปิด/ดาวน์โหลดได้จริง
  return file.url ? (
    <a href={file.url} download={file.label} target="_blank" rel="noopener noreferrer" className="no-underline">
      {inner}
    </a>
  ) : (
    <span title="ไม่มีไฟล์แนบจริง">{inner}</span>
  );
}
