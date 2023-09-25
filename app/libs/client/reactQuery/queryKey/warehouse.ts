'use client'

// 아이템
export const ITEM = {
  등록: 'createItem',
  조회: 'readItem',
  상세: 'detailItem',
  매칭: 'matchItem',
} as const

// 창고
export const WAREHOUSE = {
  등록: 'createWarehouse',
  조회: 'readWarehouse',
  상세: 'detailWarehouse',
  그룹채널조회: 'detailGroupChatWarehouse',
} as const
