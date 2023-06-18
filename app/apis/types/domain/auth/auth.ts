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
  // 회원 id
  id: string
  // 리프래시 토큰
  refreshToken: string
  // 액세스 토큰
  accessToken: string
  // 신규 회원
  new: boolean
}

export interface MemberInfo {
  // 아이디
  id: string
  // 이메일
  email: string
  // 닉네임
  nickname: string
  // 나이
  age: string
  // 성별
  gender: string
  // 액세스 토큰
  accessToken: string
}

/**
 * 회원정보
 */
export interface LoginInfo extends KakaoLoginToken {
  member: MemberInfo
}
