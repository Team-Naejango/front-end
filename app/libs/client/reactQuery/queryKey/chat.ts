'use client'

// 거래
export const DEAL = {
  조회: 'readDeal',
  상세: 'detailDeal',
} as const

// 채팅
export const CHAT = {
  조회: 'readDeal',
  참여자조회: 'readUserinfoInGroupChat',
  ID조회: 'readChatID',
  근처그룹조회: 'nearbyGroupChat',
  메세지조회: 'readRecentMessage',
} as const
