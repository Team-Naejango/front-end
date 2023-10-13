import { withAuth } from '@/app/apis/config/axios/instance/withAuth'
import { Common, Response } from '@/app/apis/types/response/response'
import { Chat, ChatId, ChatName, GroupChat, RecentMessage } from '@/app/apis/types/domain/chat/chat'

/* ************************************ 챗 엔터티 ************************************ */

/**
 * 채팅방 목록 조회
 *
 * @param page // 조회 페이지
 * @param size //조회 수
 */
export async function chat(page?: string, size?: string): Promise<Response<{ data: Chat }>> {
  return withAuth.get('/api/chat')
}

/**
 * 특정 채널의 내 채팅방 ID 조회
 *
 * @param channelId // 조회하고자 하는 채널 ID
 */
export async function getChatId(channelId: string): Promise<Response<{ data: ChatId }>> {
  return withAuth.get(`/api/chat/${channelId}`)
}

/**
 * 특정 채팅방의 최근 메시지 기록 조회
 *
 * @param params.chatId // 챗 ID
 * @param params.page // 페이징
 * @param params.size // 사이즈
 *
 * @param params
 */
export async function recentMessage(params: {
  chatId: string
  page?: string
  size?: string
}): Promise<Response<{ data: RecentMessage }>> {
  return withAuth.get(`/api/message/${params.chatId}`, { params })
}

/**
 * 채팅방 제목 변경
 *
 * @param params.chatId // 변경하고자 하는 채팅방 ID
 * @param params.title // 변경할 제목
 *
 * @param params
 */
export async function convertedName(params: { chatId: string; title: string }): Promise<Response<{ data: ChatName }>> {
  return withAuth.patch(`/api/chat/${params.chatId}`, params)
}

/**
 * 그룹 채팅 참여
 *
 * @param channelId // 그룹 채널 ID
 */
export async function joinGroupChat(channelId: string): Promise<Response<{ data: GroupChat }>> {
  return withAuth.post(`/api/chat/group/${channelId}`)
}

/**
 * 채팅방 종료
 *
 * @param channelId // 종료하고자 하는 채팅방 ID
 */
export async function closeChat(channelId: string): Promise<Response<Common>> {
  return withAuth.delete(`/api/chat/${channelId}`)
}
