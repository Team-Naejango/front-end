'use client'

// 거래
export const DEAL = {
  조회: 'readDeal',
  상세: 'detailDeal',
  특정거래조회: 'searchDeal',
  미완료거래조회: 'incompleteDeal',
} as const

// 채팅
export const CHAT = {
  조회: 'readDeal',
  참여자조회: 'readUserinfoInGroupChat',
  ID조회: 'readChatID',
  근처그룹조회: 'nearbyGroupChat',
  메세지조회: 'readRecentMessage',
} as const
