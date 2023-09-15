/* ************************************ 챗 ************************************ */

export type ChatInfoList = {
  // 채널 ID
  channelId: number
  // 채팅 ID
  chatId: number
  // 채팅 타입(PRIVATE / GROUP)
  channelType: string
  // 제목
  title: string
  // 마지막 대화 내용
  lastMessage: string
  // 안읽은 메세지 수
  unreadCount: number
  // 마지막 대화 시각
  lastChatAt: string
}

/**
 * 채팅방 목록 정보
 */
export interface Chat {
  message: string
  result: ChatInfoList[]
}

/**
 * 채팅방 ID 정보
 */
export interface ChatId {
  message: string
  // 내 채팅방 ID
  result: number
}

/**
 * 채팅방 이름 정보
 */
export interface ChatName {
  // 제목이 변경된 채팅방 ID
  chatId: number
  // 변경된 제목
  changedTitle: string
}

/* ************************************ 채널 ************************************ */

export type GroupChatResult = {
  // 내 채팅방 ID
  chatId: number
  // 그룹 채널 ID
  channelId: number
}

/**
 * 그룹 채팅방 정보
 */
export interface GroupChat {
  message: string
  result: GroupChatResult
}

export type Participant = {
  // 참여자 ID
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
  message: string
  result: Participant[]
}

export type NearbyResult = {
  // 채널 ID
  channelId: number
  // 채널 주인(창고 주인)
  ownerId: number
  // 공동 구매 아이템 ID
  itemId: number
  // 채널 참여자 수
  participantsCount: number
  // 채널 제목
  defaultTitle: string
  // 채널 정원
  channelLimit: number
}

/**
 * 근처 그룹 채널 정보
 */
export interface NearbyGroupChat {
  message: string
  result: NearbyResult[]
}
