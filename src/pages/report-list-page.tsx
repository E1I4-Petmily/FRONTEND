import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPdfReports, type PdfReportResponse } from "../apis/pdf";

export default function ReportListPage() {
  const location = useLocation();
  const petId = location.state?.petId;

  console.log("받아온 petId:", petId);

  const [reports, setReports] = useState<PdfReportResponse[]>([]);

  useEffect(() => {
    if (!petId) return;

    async function fetchReports() {
      try {
        //전체 리포트 목록 조회
        const allReports = await getPdfReports();

        //petId로 필터링
        const filtered = allReports.filter((report) => report.petId === petId);

        setReports(filtered);
      } catch (error) {
        console.error("리포트 목록 조회 실패:", error);
      }
    }

    fetchReports();
  }, [petId]);

  return (
    <div className="px-6 pb-32 font-[PretendardVariable]">
      <div className="flex flex-col gap-4 mt-5">
        {reports.map((report) => (
          <button
            key={report.id}
            onClick={() => window.open(report.pdfUrl)}
            className="text-base text-left"
          >
            {report.title}
          </button>
        ))}
      </div>
    </div>
  );
}
