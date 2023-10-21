'use client'

// 클래스 인라인 스타일 커스텀
export const cls = (...classnames: string[]) => {
  return classnames.join(' ')
}

// 숫자 콤마 변환기
export const formatKoreanCurrency = (value: string | number | null) => {
  return Number(value).toLocaleString('ko-KR')
}

// 현재 날짜 ISO 변환
export const formatCurrentIsoDate = () => {
  const instanceDate = new Date()

  const formattedTime = instanceDate.toISOString().replace(/:\d+\.\d+Z$/, '')
  return formattedTime
}

// 현재 날짜 초 단위 삭제
export const formatRemoveSecondsTime = (value: string) => {
  const instanceDate = new Date(value)
  const hours = instanceDate.getHours()
  const minutes = instanceDate.getMinutes()
  const ampm = hours >= 12 ? '오후' : '오전'

  const formattedTime = `${ampm} ${hours % 12}:${minutes < 10 ? '0' : ''}${minutes}`

  return formattedTime
}
