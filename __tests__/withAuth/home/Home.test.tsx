import React from 'react'
import { render, screen } from '@testing-library/react'

import Home from '@/app/(routes)/(withAuth)/(domain)/home/home'

describe('홈 화면 기능 수행', () => {
  it('브라우저 알림이 정상적으로 나타날 경우', () => {
    render(<Home />)

    const getElement = screen.getByText('test')

    expect(getElement).toBe('test')
  })

  it('스와이퍼가 정상 작동하는 경우', () => {
    render(<Home />)

    const getElement = screen.getByText('test')

    expect(getElement).toBe('test')
  })

  it('그룹 채팅이 작동하는 경우', () => {
    render(<Home />)

    const getElement = screen.getByText('test')

    expect(getElement).toBe('test')
  })
})
