import apiClient from "./apiClient";
import type { ApiResponse } from "../types/ApiResponse";
import type { LoginRequest, SignUpRequest, MeResponse } from "../types/auth";

export const login = async (request: LoginRequest): Promise<void> => {
  await apiClient.post("/auth/login", request);
};

export const signUp = async (request: SignUpRequest): Promise<void> => {
  await apiClient.post("/auth/sign-up", request);
};

export const logout = async (): Promise<void> => {
  await apiClient.post("/auth/logout");
};

export const getMe = async (): Promise<MeResponse | null> => {
  try {
    const response = await apiClient.get<ApiResponse<MeResponse>>("/auth/me");
    return response.data.data;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      return null;
    }
    throw error;
  }
};
