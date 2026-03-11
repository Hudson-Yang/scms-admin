import apiClient from "@/api/apiClient";
import type { ApiResponse } from "@/types/ApiResponse";
import type { Content } from "../types/ContentType";

export const getContentList = async (): Promise<Content[]> => {
  const response = await apiClient.get<ApiResponse<Content[]>>(
    "/product-content/content",
  );
  return response.data.data;
};
