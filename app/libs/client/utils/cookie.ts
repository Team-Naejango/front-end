import { Cookies } from 'react-cookie'

const cookies = new Cookies()

// todo: 쿠키에 저장된 만료기한 있는 토큰을 어느 시점에서 만료기한을 설정할지 고민해보기
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
