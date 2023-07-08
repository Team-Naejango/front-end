type SearchProps = {
  map: any
  searchInputValue: string
  kakaoMapCallback: any
}

export const useSearchResult = ({ map, searchInputValue, kakaoMapCallback }: SearchProps) => {
  const getSearchResult = (type: 'CATEGORY' | 'SEARCH') => {
    if (!map) return
    const ps = new window.kakao.maps.services.Places()

    const options: any = {
      category_group_code: 'FD6', // 음식점만 검색한다
      location: new window.kakao.maps.LatLng(map.getCenter().getLat(), map.getCenter().getLng()),
      query: searchInputValue,
    }

    if (type === 'CATEGORY') {
      // isUseBounds = false
      const copyOptions = {
        ...options,
        sort: window.kakao.maps.services.SortBy.DISTANCE,
      }
      ps.categorySearch('FD6', kakaoMapCallback, copyOptions)
    } else if (type === 'SEARCH') {
      // isUseBounds = false
      ps.keywordSearch(searchInputValue, kakaoMapCallback, options)
    }
  }
  return { getSearchResult }
}
