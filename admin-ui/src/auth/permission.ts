import type { RoleCode } from "../types/auth";

/*
  PermissionLevel
  - 권한을 숫자 레벨로 매핑한 객체
  - 숫자가 클수록 더 높은 권한
  - SUPER_ADMIN은 최상위 권한(5)
*/
const PermissionLevel: Record<RoleCode, number> = {
  READ: 1,
  CREATE: 2,
  UPDATE: 3,
  DELETE: 4,
  SUPER_ADMIN: 5,
};

/*
  getPermissionLevel
  - 현재 권한 코드를 숫자 레벨로 변환
  - 비로그인(null/undefined)은 포트폴리오 정책상 READ와 동일하게 처리
  - 따라서 비로그인도 조회 화면은 볼 수 있음
*/
export const getPermissionLevel = (roleCd?: RoleCode | null): number => {
  if (!roleCd) {
    return PermissionLevel.READ;
  }

  return PermissionLevel[roleCd];
};

/*
  hasPermission
  - 현재 roleCd가 targetRole 이상 권한인지 판단
  - 예:
    DELETE >= UPDATE -> true
    UPDATE >= DELETE -> false
    SUPER_ADMIN >= DELETE -> true
*/
export const hasPermission = (
  roleCd: RoleCode | null | undefined,
  targetRole: RoleCode,
): boolean => {
  const currentLevel = getPermissionLevel(roleCd);
  const targetLevel = PermissionLevel[targetRole];

  return currentLevel >= targetLevel;
};

/*
  isSuperAdminRole
  - SUPER_ADMIN 여부를 바로 판별할 때 사용하는 헬퍼 함수
*/
export const isSuperAdminRole = (roleCd?: RoleCode | null): boolean => {
  return roleCd === "SUPER_ADMIN";
};
