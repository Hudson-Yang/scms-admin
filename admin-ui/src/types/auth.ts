/*
  RoleCode
  - 현재 프로젝트에서 사용하는 권한 코드 타입
  - 권한 계층은 READ < CREATE < UPDATE < DELETE < SUPER_ADMIN
*/
export type RoleCode = "READ" | "CREATE" | "UPDATE" | "DELETE" | "SUPER_ADMIN";

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
  roleCd: RoleCode;
}
