import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { toast } from 'react-hot-toast'
import { useRecoilValue } from 'recoil'

import { accessTokenState } from '@/app/store/auth'

interface MessageEvent {
  data: any
  lastEventId: string
  target: any
  type: string
  error?: { message: string; stack: string }
}

export const useSendNotification = () => {
  const accessToken = useRecoilValue<string | undefined>(accessTokenState)

  const generator = () => {
    const EventSource = EventSourcePolyfill || NativeEventSource
    const SSE = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    })

    /* EVENTSOURCE ONMESSAGE ---------------------------------------------------- */
    SSE.addEventListener('sse', (event: MessageEvent) => {
      console.log('홈 SSE:', event)

      const isJson = (str: any) => {
        try {
          const json = JSON.parse(str)
          return json && typeof json === 'object'
        } catch (e) {
          return false
        }
      }
      if (isJson(event?.data as string)) {
        const obj = JSON.parse(event.data as string)
        console.log('obj:', obj)

        if (Notification.permission === 'granted') {
          const notification = new Notification('알림', {
            body: 'test',
          })

          toast.success('test')
          return notification
        }
      }
    })
  }

  return generator
}
