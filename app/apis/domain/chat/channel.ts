import { withAuth } from '@/app/apis/config/axios/instance/withAuth'
import { Response } from '@/app/apis/types/response/response'
import { GroupChat, GroupChatUserInfo, NearbyGroupChat } from '@/app/apis/types/domain/chat/chat'

/* ************************************ 채널 엔터티 ************************************ */

export interface GroupChatParam {
  // 그룹 채팅이 할당될 아이템 ID
  itemId: number
  // 채팅 채널 디폴트 제목
  defaultTitle: string
  // 채팅 채널 정원
  limit: number
}

export interface NearbyParam {
  // 조회 경도
  lon: string
  // 조회 위도
  lat: string
  // 조회 반경
  rad: string
}

/**
 * 근처 그룹 채팅방 조회
 *
 * @param params.lon // 조회 경도
 * @param params.lat // 조회 위도
 * @param params.rad // 조회 반경
 */
export async function nearbyGroupChat(params: NearbyParam): Promise<Response<{ data: NearbyGroupChat }>> {
  return withAuth.get('/api/channel/group/nearby', { params })
}

/**
 * 특정 채널 참가한 참여자 정보 조회
 *
 * @param channelId // 참여자 조회를 하고자 하는 채널 ID
 */
export async function groupChatUserInfo(channelId: string): Promise<Response<{ data: GroupChatUserInfo }>> {
  return withAuth.get(`/api/channel/${channelId}/participants`)
}

/**
 * 그룹 채팅방 개설
 *
 * @param params.itemId // 그룹 채팅이 할당될 아이템 ID
 * @param params.limit // 채팅 채널 정원
 * @param params.defaultTitle // 채팅 채널 디폴트 제목
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

/**
 * 채팅방 종료
 *
 * @param channelId // 종료하고자 하는 채팅방 ID
 */
export async function deleteChat(channelId: string): Promise<Response<null>> {
  return withAuth.delete(`/api/channel/${channelId}`)
}
