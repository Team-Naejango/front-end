import { withAuth } from '@/app/apis/config/axios/instance/withAuth'
import { Common, Response } from '@/app/apis/types/response/response'
import { Notification } from '@/app/apis/types/domain/common/alarm'

export interface SubscribeParam {
  // 컨텐츠 타입
  contentType: string
  // 마지막 event ID
  LastEventID?: string
}

/**
 * 알림 구독
 *
 * @param params.contentType // 컨텐츠 타입
 * @param params.storageId // 마지막 event ID
 */
export async function subscribe(params: SubscribeParam): Promise<Response<null>> {
  return withAuth.get('/api/subscribe', {
    headers: {
      'Content-Type': params.contentType,
    },
  })
}

/**
 * 알림 조회
 *
 */
export async function notification(): Promise<Response<{ data: Notification }>> {
  return withAuth.get('/api/notification')
}

/**
 * 특정 알림 확인
 *
 * @param notificationId // 알림 ID
 */
export async function searchNotification(notificationId: string): Promise<Response<{ data: Common }>> {
  return withAuth.get(`/api/notification/${notificationId}`)
}
