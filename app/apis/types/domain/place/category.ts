export type CategoryResult = {
  // 카테고리 ID
  categoryId: number
  // 카테고리 이름
  categoryName: string
}

/**
 * 카테고리 정보
 */
export interface Categories {
  message: string
  result: CategoryResult[]
}
