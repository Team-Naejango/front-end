import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse, AxiosResponseHeaders } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

/**
 * @todo
 * 일반 instance 로직과  instance accessToken 검사로직 분리하기
 *
 * */

interface HeaderType extends AxiosResponseHeaders {
  ['Content-Type']: string
  Authorization: string
}

const instance = axios.create({
  baseURL: process.env.NEXT_DOMAIN,
  withCredentials: true,
  timeout: 300000,
})

instance.interceptors.request.use(
  config => {
    const { headers } = config
    const accessToken = document.cookie

    console.log('headers:', headers)

    if (accessToken) {
      headers['Content-Type'] = 'application/json'
      headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    console.log('responseresponse:', response)

    if (!(response.status === 200 || response.status === 201 || response.status === 204)) {
      throw new Error()
    }

    return response
  },
  async err => {
    const error = err as AxiosError

    console.log('errorerrorerrorerror:', error)

    if (error.response?.status === 401) {
      if ('엑세스 토큰 만료') {
        const refreshToken = await axios.get('토큰 갱신')
        document.cookie = `token=${refreshToken}`

        if (error.config) {
          error.config.headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${document.cookie}`,
          } as HeaderType
        }

        const formatedResponse = await axios.request(error.config as AxiosRequestConfig)
        return formatedResponse
      }
    }
    return Promise.reject(error)
  }
)

export default instance
