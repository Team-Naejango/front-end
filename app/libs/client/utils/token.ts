'use client'

import jwtDecode from 'jwt-decode'

import { getCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'

/**
 * 토큰 검증
 *
 * */
export const isTokenValid = async () => {
  const accessToken = getCookie(AUTH_TOKEN.접근)
  const refreshToken = getCookie(AUTH_TOKEN.갱신)

  if (!accessToken) {
    // console.log('액세스 토큰 만료')
    return false
  }

  try {
    const decodedToken = jwtDecode(accessToken) as { exp: number }
    const expTime = decodedToken.exp * 1000
    const currentTime = Date.now()

    if (currentTime > expTime) {
      // console.log('액세스 토큰 만료')
      return false
    }
  } catch (error) {
    return true
  }

  if (!refreshToken) {
    // console.log('리프레시 토큰 만료')
    return true
  }

  return true
}
