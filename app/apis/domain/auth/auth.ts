import { instance } from '@/app/apis/config/axios/instance/instance'
import { Response } from '@/app/apis/types/response/response'

export interface SignParam {
  // 생년월일
  birth: string
  // 성별(남/여)
  gender: string
  // 닉네임
  nickname: string
  // 소개글
  intro: string
  // 전화번호
  phoneNumber: string
  // 이미지 링크
  imgUrl: string

  // 액세스 토큰
  accessToken: string
}

/**
 * 회원가입
 *
 * @param params.birth // 생년월일
 * @param params.gender // 성별
 * @param params.nickname // 닉네임
 * @param params.intro // 소개
 * @param params.phoneNumber // 전화번호
 * @param params.imgUrl // 이미지 링크
 *
 * @param params.accessToken // 액세스 토큰
 *
 * @param params
 */
export async function sign(params: SignParam): Promise<Response<null>> {
  return instance.post('/api/user/profile', params, {
    headers: {
      Authorization: `Bearer ${params.accessToken}`,
    },
  })
}

/**
 * 비회원 로그인
 *
 */
export async function nonUser(): Promise<Response<{ data: { accessToken: string } }>> {
  return instance.get('/api/auth/guest')
}

/**
 * 로그아웃
 *
 */
export async function logout(): Promise<Response<null>> {
  return instance.get('/api/auth/logout')
}

/**
 * 토큰 재발급
 *
 */
export async function refresh(): Promise<Response<null>> {
  return instance.post('/api/auth/refresh')
}

// /**
//  * 닉네임 중복확인
//  *
//  * @param username 닉네임
//  */
// export async function nickNameValidity(username: string): Promise<Response<boolean>> {
//   return instance.get(`/api/user/check/${username}`)
// }
