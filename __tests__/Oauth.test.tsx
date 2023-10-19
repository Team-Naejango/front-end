import React from 'react'
import { render, screen } from '@testing-library/react'

import KakaoCallback from '@/app/(routes)/(auth)/(domain)/oauth/kakaoCallback/page'

describe('Oauth 로그인 수행', () => {
  it('토큰을 얻을 경우', () => {
    render(<KakaoCallback />)

    const accessToken = screen.getByRole('accessToken')

    expect(accessToken).not.toBe(undefined)
  })
})
