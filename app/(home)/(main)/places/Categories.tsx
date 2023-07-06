'use client'

import React, { Dispatch, SetStateAction } from 'react'

const Categories = ({
  categoriesData,
  selectedCategory,
  setSelectedCategory,
}: {
  categoriesData: string[]
  selectedCategory: string
  setSelectedCategory: Dispatch<SetStateAction<string>>
}) => {
  const onClickSelectCategory = (category: string) => {
    console.log('category:', category)
    setSelectedCategory(category)
  }

  return (
    <div className={'mt-8'}>
      <ul className={'flex items-center justify-between'}>
        {categoriesData.map(category => {
          return (
            <li
              key={category}
              role='presentation'
              className={`cursor-pointer rounded border border-[#e5e7eb] px-2.5 py-1.5 text-xs hover:underline hover:underline-offset-2 ${
                category === selectedCategory ? '!border-[#32D7A0]' : ''
              }`}
              onClick={() => onClickSelectCategory(category)}>
              {category}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Categories
