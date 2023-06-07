import { Cookies } from 'react-cookie'

import { KAKAO_AUTH_TOKEN } from '@/app/libs/client/constants/store'
import { refresh } from '@/app/apis/domain/auth/auth'

const cookies = new Cookies()

export const setCookie = (name: string, value: string, options: { maxAge: number }) => {
  return cookies.set(name, value, { ...options })
}

export const getCookie = (name: string) => {
  return cookies.get(name)
}

export const removeCookie = (name: string) => {
  return cookies.remove(name)
}

export const clearSession = () => {
  removeCookie(KAKAO_AUTH_TOKEN.접근)
  removeCookie(KAKAO_AUTH_TOKEN.갱신)
}

export const TokenValid = async () => {
  const accessToken = await getCookie(KAKAO_AUTH_TOKEN.접근)
  const refreshToken = await getCookie(KAKAO_AUTH_TOKEN.갱신)

  if (!accessToken) {
    return false
  }

  if (!refreshToken) {
    try {
      const response = await refresh({ refreshToken: getCookie(KAKAO_AUTH_TOKEN.갱신) })

      if (!response.success) {
        console.log('리프레시 토큰이 만료됨')
        clearSession()

        return false
      }
    } catch (error) {
      return false
    }
  }

  return true
}
