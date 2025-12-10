import type { PdfReportResponse } from "../apis/pdf";

interface ReportModalProps {
  reports: PdfReportResponse[];
  onClose: () => void;
  onSelect: (report: PdfReportResponse) => void;
}

export default function ReportModal({
  reports,
  onClose,
  onSelect,
}: ReportModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9998]">
      <div className="bg-white w-[90%] max-w-[400px] rounded-lg p-5">
        <h2 className="text-lg font-semibold mb-4 text-center">
          첨부할 리포트를 선택하세요
        </h2>

        <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
          {reports.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-6">
              등록된 리포트가 없습니다.
            </p>
          )}

          {reports.map((report) => (
            <button
              key={report.id}
              onClick={() => onSelect(report)}
              className="p-3 text-left hover:bg-gray-100"
            >
              <p className="font-medium">{report.title}</p>
              <p className="text-sm text-gray-600">{report.petName}</p>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-2 text-center text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
