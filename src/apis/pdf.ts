import { axiosInstance } from "./axios.ts";

export interface PdfSummaryRequest {
  title: string;
  startDate: string;
  endDate: string;
}

export const createPdfSummary = async (data: PdfSummaryRequest) => {
  const response = await axiosInstance.post("/api/v1/ai-reports", data);
  return response.data;
};

export interface PdfReportResponse {
  id: number;
  petId: number;
  petName: string;
  title: string;
  pdfUrl: string;
  createdAt: string;
}

//pdf 목록 조회
export const getPdfReports = async () => {
  const response =
    await axiosInstance.get<PdfReportResponse[]>("/api/v1/ai-reports");
  return response.data;
};
