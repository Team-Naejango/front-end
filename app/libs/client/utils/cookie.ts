import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const setDeadlineCookie = (key: string, token: string | null) => {
  cookies.set(key, token, {
    path: '/',
    maxAge: key === 'refreshToken' ? 60 * 60 * 24 * 14 : undefined,
  })
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
