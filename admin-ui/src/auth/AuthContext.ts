import { createContext } from "react";
import type { MeResponse, RoleCode } from "../types/auth";

/*
  AuthContextValue
  - 전역 인증/권한 상태 타입
  - 하위 컴포넌트는 useAuth()로 이 값을 사용
*/
export interface AuthContextValue {
  user: MeResponse | null;
  roleCd: RoleCode | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  refreshMe: () => Promise<void>;
  logout: () => Promise<void>;

  // 권한 편의값
  isSuperAdmin: boolean;
  canAccessManagement: boolean;

  // Content CRUD 권한
  canReadContent: boolean;
  canCreateContent: boolean;
  canUpdateContent: boolean;
  canDeleteContent: boolean;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
