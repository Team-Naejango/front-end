'use client'

import React from 'react'
import { NextPage } from 'next'

import Login from '@/app/(auth)/login/page'

const Home: NextPage = () => {
  return (
    <main>
      <Login />
    </main>
  )
}

export default Home
