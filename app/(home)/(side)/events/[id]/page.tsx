'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

type PostPageProps = {
  post?: any
}

async function getData(ctx: any) {
  // const slug = ctx.params?.slug as string

  console.log('ctx:', ctx)
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

const PostPage = async ({ post }: any) => {
  const router = useRouter()
  const data = await getData(post)

  console.log('data:', data)
  console.log('post:', post)

  if (!post && typeof window !== 'undefined') {
    router.push('/404')
    return null
  }
  return <div>PostPage</div>
}

export default PostPage
