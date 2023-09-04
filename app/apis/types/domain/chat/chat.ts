/* ******************************** 챗 ******************************** */

export type ChatInfoList = {
  // 채널 id
  channelId: number
  // 채팅 id
  chatId: number
  // 채팅 타입(개인, 그룹)
  chatType: string
  // 제목
  title: string
  // 마지막 대화 내용
  lastMessage: string
  // 안읽은 메세지 수
  unreadCount: number
  // 마지막 대화 시각
  lastChatAt: Date
}

/**
 * 채팅방 목록 정보
 */
export interface Chat {
  page: number
  size: number
  // 조회할 결과물이 남았는지 여부
  hasNext: boolean
  // 채팅방 정보
  chatInfoList: ChatInfoList[]
}

/**
 * 채팅방 id 정보
 */
export interface ChatId {
  // 내 채팅방의 id(없으면 null)
  chatId: number | null
  // 조회 결과 메세지
  message: string
}

/**
 * 채팅방 이름 정보
 */
export interface ChatName {
  // 제목이 변경된 채팅방 id
  chatId: number
  // 변경된 제목
  changedTitle: string
}

/* ******************************** 채널 ******************************** */

/**
 * 그룹 채팅방 정보
 */
export interface GroupChat {
  // 내 채팅방 id
  chatId: number
  // 참여한 채널 id
  channelId: number
  // 그룹 채널 참여 결과 메세지
  message: string
}

export type Participant = {
  // 참여자 id
  participantId: number
  // 참여자 닉네임
  nickname: string
  // 참여자 사진 링크
  imgUrl: string
}

/**
 * 그룹 채팅방 참여자 정보
 */
export interface GroupChatUserInfo {
  // 채널에 속한 총원
  total: number
  // 채널 참여자 정보
  participants: Participant[]
}
