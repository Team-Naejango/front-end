import axios from 'axios'

import {
  requestConfigurator,
  requestErrorRejecter,
  responseApiErrorThrower,
  responseNormalizer,
} from '@/app/apis/config/axios'

const withAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 300000,
})

withAuth.interceptors.request.use(requestConfigurator, requestErrorRejecter)
withAuth.interceptors.response.use(responseApiErrorThrower, responseNormalizer)

export { withAuth }
