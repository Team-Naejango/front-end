import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const setDeadlineCookie = (key: string, token: string | null) => {
  const expires = new Date()
  expires.setDate(expires.getDate() + 14)

  cookies.set(key, token, {
    path: '/',
    expires: key === 'refreshToken' ? expires : undefined,
  })
}

export const setCookie = (key: string, value: string | null, options?: { maxAge: number }) => {
  return cookies.set(key, value, { ...options })
}

export const getCookie = (key: string) => {
  return cookies.get(key)
}

export const removeCookie = (key: string) => {
  return cookies.remove(key)
}

export const removeAuthToken = (accessKey: string, refreshKey: string) => {
  removeCookie(accessKey)
  removeCookie(refreshKey)
}
