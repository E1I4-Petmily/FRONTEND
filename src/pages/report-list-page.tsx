import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface ReportItem {
  id: number;
  title: string;
  pdfUrl: string;
}

export default function ReportListPage() {
  const location = useLocation();
  const petId = location.state?.petId;

  console.log("받아온 petId:", petId);

  const [reports, setReports] = useState<ReportItem[]>([]);

  //예시 데이터
  useEffect(() => {
    if (!petId) return;

    if (petId === 1) {
      setReports([
        { id: 1, title: "식빵 1", pdfUrl: "/test1.pdf" },
        { id: 2, title: "식빵 2", pdfUrl: "/test2.pdf" },
      ]);
    }

    if (petId === 2) {
      setReports([{ id: 10, title: "쿠키 1", pdfUrl: "/test10.pdf" }]);
    }
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
