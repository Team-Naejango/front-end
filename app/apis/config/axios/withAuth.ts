import axios from 'axios'
// import { getCookie } from 'cookies-next'
import {
  requestConfigurator,
  requestErrorRejecter,
  responseApiErrorThrower,
  responseNormalizer,
} from '@/app/apis/config/axios/index'

import { getCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'

// const accessToken = getCookie(AUTH_TOKEN.접근)
// const refreshToken = getCookie(AUTH_TOKEN.갱신)

const withAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 300000,
  // headers: {
  //   Authorization: `Bearer ${accessToken}`,
  // },
})

withAuth.interceptors.request.use(requestConfigurator, requestErrorRejecter)
withAuth.interceptors.response.use(responseApiErrorThrower, responseNormalizer)

export { withAuth }
