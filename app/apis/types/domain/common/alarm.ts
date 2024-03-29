import { E_NOTIFICATION_TYPE } from '@/app/libs/client/constants/code'

/**
 * SSE 알림 정보
 */
export interface SSEType {
  // 알림 ID
  id: number
  // 알림 내용
  content: string
  // 알림 URL
  url: string
  // 알림 읽음 여부
  isRead: boolean
  // 알림 타입
  notificationType: E_NOTIFICATION_TYPE
}

/**
 * 알림 정보
 */
export interface Notification {
  message: string
  result: SSEType[]
}
