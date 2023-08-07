import axios from 'axios'

import {
  requestConfigurator,
  requestErrorRejecter,
  responseApiErrorThrower,
  responseNormalizer,
} from '@/app/apis/config/axios/index'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 300000,
})

instance.interceptors.request.use(requestConfigurator, requestErrorRejecter)
instance.interceptors.response.use(responseApiErrorThrower, responseNormalizer)

export { instance }
