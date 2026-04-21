import apiClient from "@/api/apiClient";
import type { ApiResponse } from "@/types/ApiResponse";
import type { Content } from "../types/ContentType";

export const getContentList = async (): Promise<Content[]> => {
  const response = await apiClient.get<ApiResponse<Content[]>>(
    "/product-content/content",
  );
  return response.data.data;
};

export const saveContent = async (request: Content): Promise<void> => {
  await apiClient.post("/product-content/content", request);
};

export const getContentDetail = async (
  prodContsId: string,
): Promise<ApiResponse<Content>> => {
  const response = await apiClient.get(
    `/product-content/content/${prodContsId}`,
  );

  return response.data;
};
