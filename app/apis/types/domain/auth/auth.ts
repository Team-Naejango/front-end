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

/**
 * 회원정보
 */
export interface LoginInfo extends AuthToken {
  member: LoginForm
}
