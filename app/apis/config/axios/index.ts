import { AxiosError, AxiosResponse, AxiosResponseHeaders, InternalAxiosRequestConfig } from 'axios'
import type { AxiosRequestConfig } from 'axios'

export interface HeaderType extends AxiosResponseHeaders {
  ['Content-Type']: string
  Authorization: string
}

export const requestConfigurator = (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
  return config
}

export const requestErrorRejecter = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error)
}

export const responseAxiosErrorThrower = (response: AxiosResponse) => {
  if (!(response.status === 200 || response.status === 201 || response.status === 204)) {
    throw new AxiosError(response.data.error, String(response.status))
  }
  return response
}

export const responseErrorRejecter = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error)
}
