import { Cookies } from 'react-cookie'

const cookies = new Cookies()

// todo: 리프레시 토큰 만료기한
// const 만료기한 있는 쿠키 = () => {
//   setCookie(KAKAO_AUTH_TOKEN.갱신)
// }

export const setDeadlineCookie = (name: string, token: string) => {
  const expires = new Date()
  expires.setDate(expires.getDate() + 14)

  cookies.set(name, token, {
    path: '/',
    expires: name === 'REFRESH_TOKEN' ? expires : undefined,
  })
}

export const setCookie = (name: string, value: string, options: { maxAge: number }) => {
  return cookies.set(name, value, { ...options })
}

export const getCookie = (name: string) => {
  return cookies.get(name)
}

export const removeCookie = (name: string) => {
  return cookies.remove(name)
}
