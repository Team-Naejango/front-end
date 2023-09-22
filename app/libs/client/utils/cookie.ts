import { Cookies } from 'react-cookie'

type RefreshToken = {
  reissuedAccessToken: string
}

const cookies = new Cookies()

export const setDeadlineCookie = (key: string, token: string | RefreshToken | null) => {
  cookies.set(key, token, {
    path: '/',
    maxAge: key === 'RefreshToken' ? 60 * 60 * 24 * 14 : undefined,
  })
}

export const getCookie = (key: string) => {
  return cookies.get(key)
}

export const removeCookie = (key: string) => {
  return cookies.remove(key)
}

export const removeAllCookies = () => {
  const allCookies = cookies.getAll()
  for (const cookieName in allCookies) {
    if (Object.prototype.hasOwnProperty.call(allCookies, cookieName)) {
      cookies.remove(cookieName)
    }
  }
}

export const removeAuthToken = (accessKey: string, refreshKey: string) => {
  removeCookie(accessKey)
  removeCookie(refreshKey)
}
