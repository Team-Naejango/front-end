import { withAuth } from '@/app/apis/config/axios/instance/withAuth'
import { Response } from '@/app/apis/types/response/response'

export interface SubscribeParam {
  // 컨텐츠 타입
  contentType: string
  // 마지막 event ID
  LastEventID?: string
}

/**
 * 알림 구독
 *
 */
export async function subscribe(params: SubscribeParam): Promise<Response<null>> {
  return withAuth.get('/api/subscribe', {
    headers: {
      'Content-Type': params.contentType,
    },
  })
}
