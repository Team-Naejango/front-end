/* ************************************ 챗 ************************************ */

export type ChatInfoList = {
  // 채널 ID
  channelId: number
  // 채팅 ID
  chatId: number
  // 아이템 ID
  itemId: number
  // 채팅 타입(PRIVATE / GROUP)
  channelType: string
  // 제목
  title: string
  // 채널 정원
  channelLimit: number
  // 현재 참여 인원
  participantsCount: number
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

export type MessageResult = {
  // 채널 ID
  channelId: number
  // 보내는 사람 ID
  senderId: number
  // 메세지 ID
  messageId: number
  // 메세지 타입
  messageType: string
  // 메세지 내용
  content: string
  // 보내는 시간
  sentAt: string
}

/**
 * 채팅방 최근 메세지 정보
 */
export interface RecentMessage {
  message: string
  result: MessageResult[]
}

/**
 * 채팅방 이름 정보
 */
export interface ChatName {
  message: string
  // 변경된 제목
  result: string
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
  // 아이템 이미지 URL
  imgUrl: string
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
