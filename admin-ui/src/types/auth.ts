export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface SignUpRequest {
  loginId: string;
  password: string;
  name: string;
}

export interface MeResponse {
  loginId: string;
  name: string;
  roleCd: string;
}
