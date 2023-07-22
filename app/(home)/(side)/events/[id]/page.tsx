'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface IProps {
  params: {
    id: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

async function getData() {
  return {
    props: {
      id: 1,
    },
  }
}

const Events = async ({ params, searchParams }: IProps) => {
  const router = useRouter()
  const data = await getData()

  console.log('data:', data)

  console.log('params:', params)
  console.log('searchParams:', searchParams)

  return <div>PostPage</div>
}

export default Events
