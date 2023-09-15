'use client'

// 거래
export const DEAL = {
  조회: 'readDeal',
  // 등록: 'saveDeal',
  // 상세: 'detailDeal',
} as const

// 채팅
export const CHAT = {
  조회: 'readDeal',
  참여자조회: 'readUserinfoInGroupChat',
  ID조회: 'readChatID',
  근처그룹조회: 'nearbyGroupChat',
} as const
