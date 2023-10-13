import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { toast } from 'react-hot-toast'

// interface Profile {
//   myId: number | undefined
//   yourId: number | undefined
//   myNickname: string | undefined
//   myImgUrl: string | undefined
// }

// export const useSendNotification = ({ myId, yourId, myNickname, myImgUrl }: Profile) => {
//   const isMe = myId === yourId
//   const notificationPermission = typeof Notification === 'undefined' ? undefined : Notification.permission
//
//   if (isMe && notificationPermission === 'granted') {
//     const notification = new Notification('알림', {
//       body: `${myNickname}님이 채팅방에 입장하였습니다.`,
//       icon: `${
//         myImgUrl === ''
//           ? 'https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/assets/face2%402x.png'
//           : `https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/upload/profile/${encodeURIComponent(
//               myImgUrl as string
//             )}`
//       }`,
//     })
//
//     toast.success(`${myNickname}님이 채팅방에 입장하였습니다.`)
//     return notification
//   }
//
//   return null
// }

export const useSendNotification = () => {
  const accessToken = typeof localStorage === 'undefined' ? undefined : localStorage.getItem('accessToken')

  const generator = () => {
    const EventSource = EventSourcePolyfill || NativeEventSource
    const SSE = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    })

    SSE.addEventListener('sse', event => {
      console.log('SSE 이벤트 수신:', event)

      if (Notification.permission === 'granted') {
        const notification = new Notification('알림', {
          body: 'test',
        })

        toast.success('test.')
        return notification
      }
    })
  }

  return generator

  // const sendNotification = useSendNotification({
  //   myId: mineInfo?.result.userId,
  //   yourId: yourProfileInfo?.ownerId,
  //   myNickname: mineInfo?.result.nickname,
  //   myImgUrl: mineInfo?.result.imgUrl,
  // })
  //
  // return sendNotification
}
