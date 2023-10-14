import { Event, EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { toast } from 'react-hot-toast'
import { useRecoilValue } from 'recoil'

import { accessTokenState } from '@/app/store/auth'

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
    SSE.addEventListener('sse', (event: Event) => {
      console.log('홈 SSE:', event)

      // const isJson = (str: any) => {
      //   try {
      //     const json = JSON.parse(str)
      //     return json && typeof json === 'object'
      //   } catch (e) {
      //     return false
      //   }
      // }
      // if (isJson(event?.data)) {
      //   const obj = JSON.parse(event?.data)
      //   console.log('obj:', obj)

      if (Notification.permission === 'granted') {
        const notification = new Notification('알림', {
          body: 'test',
        })

        toast.success('test')
        return notification
      }
      // }
    })
  }

  return generator
}
