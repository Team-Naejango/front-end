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
 * 유저 정보
 */
export interface MemberInfo {
  // 생년월일
  birth: string
  // 성별
  gender: string
  // 닉네임
  nickname: string
  // 소개
  intro: string
  // 폰번호
  phoneNumber: string
  // 이미지 링크
  imgUrl: string
  // 잔고
  balance?: number
}
