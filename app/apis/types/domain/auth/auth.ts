import { LoginForm } from '@/app/apis/domain/auth/auth'

/**
 * 로그인
 */
export interface AuthToken {
  // 리프래시 토큰
  refreshToken: string
  // 액세스 토큰
  accessToken: string
}

export interface KakaoLoginToken {
  // 회원타입
  type: string
  // 액세스 토큰
  accessToken: string
}

export interface MemberInfo {
  member: any
}

/**
 * 회원정보
 */
export interface LoginInfo extends KakaoLoginToken {
  member: MemberInfo
}
