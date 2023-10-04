'use client'

// 카카오 로그인
export const OAUTH = {
  유저정보: 'userInfo',
  다른유저정보: 'anotherUserInfo',
} as const

// 게스트 로그인
export const AUTH = {
  게스트: 'nonUser',
} as const
