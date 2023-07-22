import axios from 'axios'
import {
  requestConfigurator,
  requestErrorRejecter,
  responseApiErrorThrower,
  responseNormalizer,
} from '@/app/apis/config/axios/index'
import { getCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store'

const accessToken = getCookie(AUTH_TOKEN.접근)

const withAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 300000,
  headers: {
    Authorization: accessToken,
  },
})

withAuth.interceptors.request.use(requestConfigurator, requestErrorRejecter)
withAuth.interceptors.response.use(responseApiErrorThrower, responseNormalizer)

export { withAuth }
