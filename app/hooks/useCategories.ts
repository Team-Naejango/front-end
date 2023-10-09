import { useQuery } from '@tanstack/react-query'

import { CATEGORY } from '@/app/libs/client/reactQuery/queryKey/common'

import { category } from '@/app/apis/domain/common/category'

export const useCategories = () => {
  const { data: { data: categories } = {} } = useQuery([CATEGORY.조회], category)

  const findCategoryList = (name: string) => {
    const category = categories?.result.find(v => v.categoryName === name) || { categoryId: null, categoryName: '' }
    return category
  }

  return { findCategoryList }
}
