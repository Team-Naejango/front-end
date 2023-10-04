import { toast } from 'react-hot-toast'

interface Profile {
  myId: number | undefined
  yourId: number | undefined
  myNickname: string | undefined
  myImgUrl: string | undefined
}

export const useSendNotification = ({ myId, yourId, myNickname, myImgUrl }: Profile) => {
  const isMe = myId === yourId

  if (isMe && Notification.permission === 'granted') {
    const notification = new Notification('채팅 알림', {
      body: `${myNickname}님이 채팅방에 입장하였습니다.`,
      icon: `${
        myImgUrl === ''
          ? 'https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/assets/face2%402x.png'
          : `https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/upload/profile/${encodeURIComponent(
              myImgUrl as string
            )}`
      }`,
    })

    toast.success(`${myNickname}님이 채팅방에 입장하였습니다.`)
    return notification
  }

  return null
}
