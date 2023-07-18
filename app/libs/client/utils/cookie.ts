import { Cookies } from 'react-cookie'

const cookies = new Cookies()

// todo: 쿠키에 저장된 만료기한 있는 토큰을 어느 시점에서 만료기한을 설정할지 고민해보기
export const setDeadlineCookie = (key: string, token: string | null) => {
  const expires = new Date()
  expires.setDate(expires.getDate() + 14)

  cookies.set(key, token, {
    path: '/',
    expires: key === 'refreshToken' ? expires : undefined,
  })
}

// export const setCookie = (key: string, value: string, options: { maxAge: number }) => {
//   return cookies.set(key, value, { ...options })
// }

export const getCookie = (key: string) => {
  return cookies.get(key)
}

export const removeCookie = (key: string) => {
  return cookies.remove(key)
}
