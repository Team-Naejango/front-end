'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

type PostPageProps = {
  post?: any
}

async function getData() {
  // const slug = ctx.params?.slug as string
  // console.log('slug:', slug)

  // if (!post) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {
      post: 1,
    },
  }
}

const PostPage = async () => {
  const router = useRouter()
  const data = await getData()

  console.log('data:', data)

  return <div>PostPage</div>
}

export default PostPage
