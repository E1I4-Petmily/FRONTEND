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
