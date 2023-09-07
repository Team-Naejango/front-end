import { withAuth } from '@/app/apis/config/axios/instance/withAuth'
import { Response } from '@/app/apis/types/response/response'
import { Chat, GroupChat, GroupChatUserInfo } from '@/app/apis/types/domain/chat/chat'

/* ************************************ 채널 엔터티 ************************************ */

export interface GroupChatParam {
  // 채팅 채널 정원
  limit: number
  // 채팅 채널 디폴트 제목
  defaultTitle: string
  // 그룹 채팅이 할당될 창고 ID
  storageId: number
}

/**
 * 근처 그룹 채팅방 조회
 *
 */
export async function nearbyGroupChat(): Promise<Response<{ data: Chat }>> {
  return withAuth.get('/api/channel/group/nearby')
}

/**
 * 특정 채널 참가한 참여자 정보
 *
 * @param channelId // 참여자 조회를 하고자 하는 채널 ID
 */
export async function groupChatUserInfo(channelId: string): Promise<Response<{ data: GroupChatUserInfo }>> {
  return withAuth.get(`/api/channel/${channelId}/participants`)
}

/**
 * 그룹 채팅방 개설
 *
 * @param params.limit // 채팅 채널 정원
 * @param params.defaultTitle // 채팅 채널 디폴트 제목
 * @param params.storageId // 그룹 채팅이 할당될 창고 id
 *
 * @param params
 */
export async function openGroupChat(params: GroupChatParam): Promise<Response<{ data: GroupChat }>> {
  return withAuth.post('/api/channel/group', { params })
}

/**
 * 특정 회원과 1:1 채팅 개설
 *
 * @param receiverId // 상대방 ID
 */
export async function joinChat(receiverId: string): Promise<Response<{ data: GroupChat }>> {
  return withAuth.post(`/api/channel/private/${receiverId}`)
}
