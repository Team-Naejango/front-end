/**
 * 로그인
 */
export interface AuthToken {
  // 액세스 토큰
  accessToken: string
  // 리프래시 토큰
  refreshToken: string
}

/**
 * 토큰 재발급
 */
export interface NewAccessToken {
  message: string
  result: string
}
