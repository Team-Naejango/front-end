import React from 'react'

import Layout from '@/app/components/template/main/layout/Layout'
import ItemCard from '@/app/components/organism/profile/LovedItemCard'

const Loved = () => {
  return (
    <Layout canGoBack title='관심상품'>
      <div className={'py-8'}>
        <div className='grid grid-cols-2 grid-rows-[minmax(0,1fr)] items-center justify-center'>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, i) => (
            <ItemCard key={_} id={i} title='iPhone 14' hearts={1} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Loved
