import axios from 'axios'
import {
  requestConfigurator,
  requestErrorRejecter,
  responseApiErrorThrower,
  responseNormalizer,
} from '@/app/apis/config/axios/index'
import { getCookie } from '@/app/libs/client/utils/cookie'
import { AUTH_TOKEN } from '@/app/libs/client/constants/store/common'

// const accessToken = getCookie(AUTH_TOKEN.접근)

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 300000,
  // headers: {
  //   Authorization: `Bearer ${accessToken}`,
  // },
})

instance.interceptors.request.use(requestConfigurator, requestErrorRejecter)
instance.interceptors.response.use(responseApiErrorThrower, responseNormalizer)

export { instance }
