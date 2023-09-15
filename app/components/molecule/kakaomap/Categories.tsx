'use client'

import React, { Dispatch, SetStateAction } from 'react'

const Categories = ({
  categoriesData,
  selectedCategory,
  setSelectedCategory,
}: {
  categoriesData: { name: string }[]
  selectedCategory: { name: string }
  setSelectedCategory: Dispatch<SetStateAction<{ name: string }>>
}) => {
  const onClickSelectCategory = (category: string) => {
    console.log('category:', category)
    setSelectedCategory({ name: category })
  }

  return (
    <div className={'mt-2'}>
      <ul className={'flex items-center justify-between'}>
        {categoriesData.map(category => {
          return (
            <li
              key={category.name}
              role='presentation'
              className={`cursor-pointer rounded border border-[#e5e7eb] px-2.5 py-1.5 text-xs hover:underline hover:underline-offset-2 ${
                category.name === selectedCategory.name ? '!border-[#32D7A0]' : ''
              }`}
              onClick={() => onClickSelectCategory(category.name)}>
              {category.name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Categories
