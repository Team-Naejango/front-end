export type Member = {
  // 유저 ID
  userId?: number
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

/**
 * 유저 정보
 */
export interface MemberInfo {
  message: string
  result: Member
}

export type AnotherMember = {
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
}

/**
 * 다른 유저 정보
 */
export interface AnotherMemberInfo {
  message: string
  result: AnotherMember
}
