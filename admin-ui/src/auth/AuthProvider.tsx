import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getMe, logout as logoutApi } from "../api/authApi";
import type { MeResponse } from "../types/auth";
import { AuthContext } from "./AuthContext";
import { hasPermission, isSuperAdminRole } from "./permission";

interface Props {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<MeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /*
    refreshMe
    - 앱 시작 시 또는 로그인 성공 후 현재 로그인 사용자 정보를 다시 조회
  */
  const refreshMe = useCallback(async () => {
    try {
      const me = await getMe();
      setUser(me);
    } catch (error) {
      console.error("현재 사용자 조회 실패", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /*
    logout
    - 서버 로그아웃 후 프론트 인증 상태 초기화
  */
  const logout = useCallback(async () => {
    await logoutApi();
    setUser(null);
  }, []);

  useEffect(() => {
    refreshMe();
  }, [refreshMe]);

  /*
    roleCd
    - 현재 로그인 사용자의 권한 코드
    - 비로그인이면 null
  */
  const roleCd = user?.roleCd ?? null;

  /*
    SUPER_ADMIN 여부
  */
  const isSuperAdmin = isSuperAdminRole(roleCd);

  /*
    Management 메뉴 접근 권한
    - 현재 정책상 SUPER_ADMIN만 허용
  */
  const canAccessManagement = isSuperAdmin;

  /*
    Content CRUD 권한
    - SUPER_ADMIN(5)은 모든 CRUD 권한을 자동 포함
    - 비로그인은 READ로 해석하므로 canReadContent만 true
  */
  const canReadContent = hasPermission(roleCd, "READ");
  const canCreateContent = hasPermission(roleCd, "CREATE");
  const canUpdateContent = hasPermission(roleCd, "UPDATE");
  const canDeleteContent = hasPermission(roleCd, "DELETE");

  /*
    value
    - 하위 컴포넌트가 useAuth()로 꺼내 쓰는 전역 인증/권한 정보
  */
  const value = useMemo(
    () => ({
      user,
      roleCd,
      isAuthenticated: !!user,
      isLoading,
      refreshMe,
      logout,
      isSuperAdmin,
      canAccessManagement,
      canReadContent,
      canCreateContent,
      canUpdateContent,
      canDeleteContent,
    }),
    [
      user,
      roleCd,
      isLoading,
      refreshMe,
      logout,
      isSuperAdmin,
      canAccessManagement,
      canReadContent,
      canCreateContent,
      canUpdateContent,
      canDeleteContent,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
