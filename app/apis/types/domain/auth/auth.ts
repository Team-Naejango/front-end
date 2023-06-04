// import { LoginForm } from "@/app/apis/domain/auth/auth";

/**
 * 로그인
 */
export interface Auth {
  // 리프래시 토큰
  refreshToken: string
  // 액세스 토큰
  accessToken: string
}

export interface PassLoginForm {
  // Access Token
  access_token: string
}

export interface LoginInfo extends Auth {
  // member: LoginForm
}
