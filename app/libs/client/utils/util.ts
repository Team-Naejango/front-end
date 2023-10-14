'use client'

// 클래스 인라인 스타일 커스텀
export const cls = (...classnames: string[]) => {
  return classnames.join(' ')
}

// 숫자 콤마 변환기
export const formatKoreanCurrency = (value: string | number | null) => {
  return Number(value).toLocaleString('ko-KR')
}

// 현재 날짜 변환
export const formatIsoDate = () => {
  const instanceDate = new Date()

  const customIsoDate = instanceDate.toISOString().replace(/:\d+\.\d+Z$/, '')
  return customIsoDate
}
