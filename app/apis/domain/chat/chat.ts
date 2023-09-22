import { withAuth } from '@/app/apis/config/axios/instance/withAuth'
import { Response } from '@/app/apis/types/response/response'
import { Chat, ChatId, ChatName, GroupChat } from '@/app/apis/types/domain/chat/chat'

/* ************************************ 챗 엔터티 ************************************ */

/**
 * 채팅방 목록 조회
 *
 */
export async function chat(): Promise<Response<{ data: Chat }>> {
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
